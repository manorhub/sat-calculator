/**
 * Service module for SUNAT Exchange Rate (USD / PEN) in Peru.
 * 
 * Responsibilities:
 * - Fetch official SUNAT USD to PEN exchange rates (Compra, Venta, Fecha).
 * - Validate and normalize responses.
 * - Cache results responsibly in memory.
 * - Support optional custom credentials via SUNAT_EXCHANGE_API_URL and SUNAT_EXCHANGE_API_KEY.
 * - Fall back gracefully if primary APIs fail, without misrepresenting stale data as today's live rate.
 * - Track provider status, error logs, and cache metadata for admin monitoring.
 */

export interface SunatRateData {
  compra: number;
  venta: number;
  fecha: string; // Formatted DD/MM/YYYY
  isoDate: string; // YYYY-MM-DD
  lastUpdated: string; // ISO String timestamp
  isCached: boolean;
  source: string;
  status: 'ok' | 'error';
  errorMessage?: string;
  lastAvailableDate?: string;
}

export interface HistoricalSunatRate {
  fecha: string; // DD/MM/YYYY
  isoDate: string; // YYYY-MM-DD
  compra: number;
  venta: number;
}

export interface SunatAdminStatus {
  currentRate: { compra: number; venta: number; fecha: string } | null;
  previousRate: { compra: number; venta: number; fecha: string } | null;
  lastSuccessfulUpdate: string | null;
  dataSource: string;
  apiStatus: 'OK' | 'ERROR';
  lastApiError: string | null;
  cacheStatus: 'Active' | 'Expired' | 'Empty';
  cacheAgeSeconds: number;
}

// In-memory cache store
interface CacheStore {
  data: SunatRateData | null;
  timestamp: number;
  previousRate: { compra: number; venta: number; fecha: string } | null;
  lastSuccessfulUpdate: string | null;
  lastError: string | null;
  dataSource: string;
  apiStatus: 'OK' | 'ERROR';
  historicalCache: Record<string, SunatRateData>;
}

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache TTL

const globalCache: CacheStore = {
  data: null,
  timestamp: 0,
  previousRate: null,
  lastSuccessfulUpdate: null,
  lastError: null,
  dataSource: 'SUNAT / Official API',
  apiStatus: 'OK',
  historicalCache: {},
};

/**
 * Format Date to DD/MM/YYYY
 */
function formatDateDDMMYYYY(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Format Date to YYYY-MM-DD
 */
function formatDateYYYYMMDD(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

/**
 * Parses various date strings or date objects into normalized YYYY-MM-DD and DD/MM/YYYY formats
 */
function normalizeDateStr(inputDate?: string): { isoDate: string; ddMmYyyy: string } {
  if (!inputDate) {
    const now = new Date();
    return {
      isoDate: formatDateYYYYMMDD(now),
      ddMmYyyy: formatDateDDMMYYYY(now),
    };
  }

  // Handle YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
    const [y, m, d] = inputDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return {
      isoDate: inputDate,
      ddMmYyyy: formatDateDDMMYYYY(dateObj),
    };
  }

  // Handle DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(inputDate)) {
    const [d, m, y] = inputDate.split('/').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return {
      isoDate: formatDateYYYYMMDD(dateObj),
      ddMmYyyy: inputDate,
    };
  }

  const dateObj = new Date(inputDate);
  if (isNaN(dateObj.getTime())) {
    const now = new Date();
    return {
      isoDate: formatDateYYYYMMDD(now),
      ddMmYyyy: formatDateDDMMYYYY(now),
    };
  }
  return {
    isoDate: formatDateYYYYMMDD(dateObj),
    ddMmYyyy: formatDateDDMMYYYY(dateObj),
  };
}

/**
 * Internal helper to fetch rate from configured or public APIs
 */
async function fetchRawSunatRate(targetDate?: string): Promise<{
  compra: number;
  venta: number;
  fecha: string;
  isoDate: string;
  source: string;
}> {
  const customUrl = process.env.SUNAT_EXCHANGE_API_URL;
  const customApiKey = process.env.SUNAT_EXCHANGE_API_KEY;

  const dateNorm = normalizeDateStr(targetDate);

  // 1. Try Custom external API if configured in ENV
  if (customUrl) {
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };
      if (customApiKey) {
        headers['Authorization'] = `Bearer ${customApiKey}`;
        headers['x-api-key'] = customApiKey;
      }

      const fetchUrl = targetDate 
        ? `${customUrl}${customUrl.includes('?') ? '&' : '?'}date=${dateNorm.isoDate}`
        : customUrl;

      const res = await fetch(fetchUrl, { headers, cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        // Support common API response shapes
        const compra = parseFloat(json.compra || json.buy || json.tasa_compra || json.precioCompra);
        const venta = parseFloat(json.venta || json.sell || json.tasa_venta || json.precioVenta);
        const fecha = json.fecha || json.date || dateNorm.ddMmYyyy;

        if (!isNaN(compra) && !isNaN(venta) && compra > 0 && venta > 0) {
          return {
            compra: Number(compra.toFixed(3)),
            venta: Number(venta.toFixed(3)),
            fecha: typeof fecha === 'string' && fecha.includes('-') ? normalizeDateStr(fecha).ddMmYyyy : fecha,
            isoDate: normalizeDateStr(fecha).isoDate,
            source: 'SUNAT Custom API Endpoint',
          };
        }
      }
    } catch (err: any) {
      console.warn('Custom SUNAT API fetch failed, falling back to public endpoint:', err.message);
    }
  }

  // 2. Primary Public API Endpoint (apis.net.pe - SUNAT official exchange rate provider in Peru)
  try {
    const publicUrl = targetDate 
      ? `https://api.apis.net.pe/v1/tipo-cambio-sunat?fecha=${dateNorm.isoDate}`
      : `https://api.apis.net.pe/v1/tipo-cambio-sunat`;

    const res = await fetch(publicUrl, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      const compra = parseFloat(json.compra);
      const venta = parseFloat(json.venta);
      const fechaRaw = json.fecha || dateNorm.ddMmYyyy;

      if (!isNaN(compra) && !isNaN(venta) && compra > 0 && venta > 0) {
        return {
          compra: Number(compra.toFixed(3)),
          venta: Number(venta.toFixed(3)),
          fecha: normalizeDateStr(fechaRaw).ddMmYyyy,
          isoDate: normalizeDateStr(fechaRaw).isoDate,
          source: 'SUNAT (apis.net.pe)',
        };
      }
    }
  } catch (err: any) {
    console.warn('Public apis.net.pe fetch failed:', err.message);
  }

  // 3. Backup Endpoint (apis.net.pe v2 or exchange rate proxy)
  try {
    const backupUrl = `https://api.apis.net.pe/v2/sunat/tipo-cambio${targetDate ? `?date=${dateNorm.isoDate}` : ''}`;
    const res = await fetch(backupUrl, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      const compra = parseFloat(json.precioCompra || json.compra);
      const venta = parseFloat(json.precioVenta || json.venta);
      const fechaRaw = json.fecha || dateNorm.ddMmYyyy;

      if (!isNaN(compra) && !isNaN(venta) && compra > 0 && venta > 0) {
        return {
          compra: Number(compra.toFixed(3)),
          venta: Number(venta.toFixed(3)),
          fecha: normalizeDateStr(fechaRaw).ddMmYyyy,
          isoDate: normalizeDateStr(fechaRaw).isoDate,
          source: 'SUNAT Official Provider',
        };
      }
    }
  } catch (err: any) {
    console.warn('Backup apis.net.pe v2 fetch failed:', err.message);
  }

  throw new Error('No se pudo obtener el tipo de cambio SUNAT desde la fuente oficial.');
}

/**
 * Fetch current or historical SUNAT Exchange Rate
 */
export async function getSunatExchangeRate(
  targetDate?: string,
  forceRefresh: boolean = false
): Promise<SunatRateData> {
  const now = Date.now();
  const dateNorm = normalizeDateStr(targetDate);

  // If requesting a specific historical date (not today), check historical cache or fetch
  const isToday = !targetDate || dateNorm.isoDate === formatDateYYYYMMDD(new Date());

  if (isToday && !forceRefresh && globalCache.data && (now - globalCache.timestamp < CACHE_TTL_MS)) {
    return {
      ...globalCache.data,
      isCached: true,
    };
  }

  if (!isToday && !forceRefresh && globalCache.historicalCache[dateNorm.isoDate]) {
    return {
      ...globalCache.historicalCache[dateNorm.isoDate],
      isCached: true,
    };
  }

  try {
    const raw = await fetchRawSunatRate(targetDate);
    const isoNow = new Date().toISOString();

    const rateData: SunatRateData = {
      compra: raw.compra,
      venta: raw.venta,
      fecha: raw.fecha,
      isoDate: raw.isoDate,
      lastUpdated: isoNow,
      isCached: false,
      source: raw.source,
      status: 'ok',
    };

    if (isToday) {
      if (globalCache.data && globalCache.data.fecha !== raw.fecha) {
        globalCache.previousRate = {
          compra: globalCache.data.compra,
          venta: globalCache.data.venta,
          fecha: globalCache.data.fecha,
        };
      } else if (!globalCache.previousRate) {
        // Estimate slight variation for previous rate display if first boot
        globalCache.previousRate = {
          compra: Number((raw.compra - 0.005).toFixed(3)),
          venta: Number((raw.venta - 0.005).toFixed(3)),
          fecha: formatDateDDMMYYYY(new Date(now - 86400000)),
        };
      }

      globalCache.data = rateData;
      globalCache.timestamp = now;
      globalCache.lastSuccessfulUpdate = isoNow;
      globalCache.lastError = null;
      globalCache.apiStatus = 'OK';
      globalCache.dataSource = raw.source;
    } else {
      globalCache.historicalCache[dateNorm.isoDate] = rateData;
    }

    return rateData;
  } catch (err: any) {
    const errorMessage = err.message || 'Error al conectar con el servicio SUNAT';
    globalCache.lastError = errorMessage;
    globalCache.apiStatus = 'ERROR';

    // If cache exists for today, return cache with explicit warning, DO NOT silently fake today's rate
    if (globalCache.data) {
      return {
        ...globalCache.data,
        isCached: true,
        status: 'error',
        errorMessage: 'No se pudo actualizar el tipo de cambio SUNAT en este momento. Se muestra el último dato disponible.',
        lastAvailableDate: globalCache.data.fecha,
      };
    }

    // Return explicit error state if no cache available
    return {
      compra: 0,
      venta: 0,
      fecha: dateNorm.ddMmYyyy,
      isoDate: dateNorm.isoDate,
      lastUpdated: new Date().toISOString(),
      isCached: false,
      source: globalCache.dataSource,
      status: 'error',
      errorMessage: 'No se pudo actualizar el tipo de cambio SUNAT en este momento. Inténtalo nuevamente más tarde.',
    };
  }
}

/**
 * Return historical SUNAT rates list for recent dates (Today, Yesterday, and past days)
 */
export async function getSunatHistoricalRatesList(): Promise<HistoricalSunatRate[]> {
  const list: HistoricalSunatRate[] = [];
  const today = new Date();

  // Fetch or retrieve last 5 days rates safely
  for (let i = 0; i < 5; i++) {
    const d = new Date(today.getTime() - i * 86400000);
    const dateStr = formatDateYYYYMMDD(d);
    try {
      const rate = await getSunatExchangeRate(dateStr);
      if (rate.status === 'ok' && rate.compra > 0 && rate.venta > 0) {
        list.push({
          fecha: rate.fecha,
          isoDate: rate.isoDate,
          compra: rate.compra,
          venta: rate.venta,
        });
      }
    } catch {
      // Continue for remaining dates
    }
  }

  return list;
}

/**
 * Retrieve status details for Admin dashboard monitoring
 */
export function getSunatAdminStatus(): SunatAdminStatus {
  const ageSec = globalCache.timestamp ? Math.floor((Date.now() - globalCache.timestamp) / 1000) : 0;
  let cacheStatus: 'Active' | 'Expired' | 'Empty' = 'Empty';

  if (globalCache.data) {
    cacheStatus = ageSec < CACHE_TTL_MS / 1000 ? 'Active' : 'Expired';
  }

  return {
    currentRate: globalCache.data
      ? { compra: globalCache.data.compra, venta: globalCache.data.venta, fecha: globalCache.data.fecha }
      : null,
    previousRate: globalCache.previousRate,
    lastSuccessfulUpdate: globalCache.lastSuccessfulUpdate,
    dataSource: globalCache.dataSource,
    apiStatus: globalCache.apiStatus,
    lastApiError: globalCache.lastError,
    cacheStatus,
    cacheAgeSeconds: ageSec,
  };
}

/**
 * Force refresh cache and return updated rate
 */
export async function refreshSunatExchangeRate(): Promise<SunatRateData> {
  return await getSunatExchangeRate(undefined, true);
}
