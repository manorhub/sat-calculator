'use client';

import React, { useState, useEffect } from 'react';
import { SunatRateData, HistoricalSunatRate } from '@/lib/sunat-exchange-rate';

interface Props {
  initialRate: SunatRateData;
  initialHistory: HistoricalSunatRate[];
  lang: string;
}

export default function SunatCalculatorClient({ initialRate, initialHistory, lang }: Props) {
  // Rate state
  const [rateData, setRateData] = useState<SunatRateData>(initialRate);
  const [history, setHistory] = useState<HistoricalSunatRate[]>(initialHistory);
  const [loadingRate, setLoadingRate] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(
    initialRate.status === 'error' ? initialRate.errorMessage || 'No se pudo actualizar el tipo de cambio SUNAT en este momento. Inténtalo nuevamente más tarde.' : null
  );

  // Calculator inputs
  const [monto, setMonto] = useState<string>('100');
  const [currency, setCurrency] = useState<'USD' | 'PEN'>('USD');
  const [type, setType] = useState<'venta' | 'compra'>('venta');

  // Historical date selector state
  const [selectedDateMode, setSelectedDateMode] = useState<'today' | 'yesterday' | 'custom'>('today');
  const [customDate, setCustomDate] = useState<string>('');

  // Fetch updated or historical rate from API route
  const fetchRateForDate = async (dateStr?: string) => {
    setLoadingRate(true);
    setFetchError(null);
    try {
      const url = dateStr ? `/api/sunat-exchange-rate?date=${dateStr}` : '/api/sunat-exchange-rate';
      const res = await fetch(url);
      const json = await res.json();

      if (json.success && json.data) {
        setRateData(json.data);
        if (json.history) setHistory(json.history);
      } else {
        if (json.data && json.data.compra > 0) {
          setRateData(json.data);
        }
        setFetchError(json.error || json.data?.errorMessage || 'No se pudo actualizar el tipo de cambio SUNAT en este momento. Inténtalo nuevamente más tarde.');
      }
    } catch (err: any) {
      setFetchError('No se pudo actualizar el tipo de cambio SUNAT en este momento. Inténtalo nuevamente más tarde.');
    } finally {
      setLoadingRate(false);
    }
  };

  const handleDateModeChange = (mode: 'today' | 'yesterday' | 'custom') => {
    setSelectedDateMode(mode);
    if (mode === 'today') {
      fetchRateForDate(undefined);
    } else if (mode === 'yesterday') {
      const yesterday = new Date(Date.now() - 86400000);
      const yyyymmdd = yesterday.toISOString().split('T')[0];
      fetchRateForDate(yyyymmdd);
    }
  };

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomDate(val);
    if (val) {
      fetchRateForDate(val);
    }
  };

  // Calculations
  const numericMonto = parseFloat(monto) || 0;
  const currentRateValue = type === 'compra' ? rateData.compra : rateData.venta;
  
  let convertedValue = 0;
  if (currency === 'USD') {
    // USD -> PEN: Multiply
    convertedValue = numericMonto * (currentRateValue || 0);
  } else {
    // PEN -> USD: Divide
    convertedValue = currentRateValue > 0 ? numericMonto / currentRateValue : 0;
  }

  // Quick unit reference rates
  const unit1UsdInPen = (1 * (currentRateValue || 0)).toFixed(2);
  const unit100PenInUsd = (currentRateValue > 0 ? 100 / currentRateValue : 0).toFixed(2);

  // Format timestamps
  const formattedLastUpdated = rateData.lastUpdated
    ? new Date(rateData.lastUpdated).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' hrs'
    : '---';

  return (
    <div className="space-y-8">
      {/* 1. Dedicated SUNAT Rate Summary Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                Tipo de Cambio SUNAT de Hoy
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Cotización oficial para la conversión tributaria y contable entre USD y PEN en Perú.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Fuente: SUNAT
            </span>
            <button
              onClick={() => fetchRateForDate(selectedDateMode === 'custom' ? customDate : undefined)}
              disabled={loadingRate}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-xs font-bold flex items-center gap-1"
              title="Actualizar tipo de cambio"
            >
              <span className={`inline-block ${loadingRate ? 'animate-spin' : ''}`}>🔄</span>
              <span className="hidden sm:inline">Actualizar</span>
            </button>
          </div>
        </div>

        {/* Status Error / Cache Warning Banners */}
        {fetchError && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-sm font-semibold flex items-center gap-2">
            <span>⚠️</span>
            <div>
              <p>{fetchError}</p>
              {rateData.lastAvailableDate && (
                <span className="text-xs font-bold mt-1 block">
                  Último dato disponible: {rateData.lastAvailableDate}
                </span>
              )}
            </div>
          </div>
        )}

        {!fetchError && rateData.isCached && rateData.lastAvailableDate && (
          <div className="mb-6 p-3 px-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 text-blue-800 dark:text-blue-300 text-xs font-semibold">
            ℹ️ Último dato disponible: <strong>{rateData.lastAvailableDate}</strong>
          </div>
        )}

        {/* Rate Summary Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Compra SUNAT */}
          <div className={`p-5 rounded-2xl border transition-all ${
            type === 'compra' 
              ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 dark:border-blue-600 shadow-sm' 
              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850'
          }`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Compra SUNAT
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Ingresos / Cobranzas
              </span>
            </div>
            <div className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              S/ {rateData.compra > 0 ? rateData.compra.toFixed(3) : '---'}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Para facturas de venta y cobros en USD
            </p>
          </div>

          {/* Venta SUNAT */}
          <div className={`p-5 rounded-2xl border transition-all ${
            type === 'venta' 
              ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-400 dark:border-indigo-600 shadow-sm' 
              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850'
          }`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Venta SUNAT
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                Gastos / Compras
              </span>
            </div>
            <div className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              S/ {rateData.venta > 0 ? rateData.venta.toFixed(3) : '---'}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Para facturas de compras y gastos en USD
            </p>
          </div>

          {/* Fecha y Timestamp */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Fecha del Tipo de Cambio
              </span>
              <div className="text-2xl font-black text-slate-950 dark:text-white">
                📅 {rateData.fecha || '---'}
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-2">
              <span>Última actualización: <strong>{formattedLastUpdated}</strong></span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Interactive Calculator Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6 flex items-center gap-2">
          🧮 Calculadora de Conversión SUNAT
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Form Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Amount input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Monto a Convertir
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-slate-400">
                  {currency === 'USD' ? '$' : 'S/'}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  placeholder="Ej: 100"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-lg font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Currency direction selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Moneda de Origen → Destino
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`py-3 px-4 rounded-xl text-sm font-bold border transition flex items-center justify-center gap-2 ${
                    currency === 'USD'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>🇺🇸 USD → 🇵🇪 PEN</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('PEN')}
                  className={`py-3 px-4 rounded-xl text-sm font-bold border transition flex items-center justify-center gap-2 ${
                    currency === 'PEN'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>🇵🇪 PEN → 🇺🇸 USD</span>
                </button>
              </div>
            </div>

            {/* Compra / Venta selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Tipo de Operación SUNAT
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType('compra')}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition text-center ${
                    type === 'compra'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div>Compra SUNAT</div>
                  <div className="text-[11px] font-normal opacity-90">S/ {rateData.compra > 0 ? rateData.compra.toFixed(3) : '---'} (Ingresos)</div>
                </button>
                <button
                  type="button"
                  onClick={() => setType('venta')}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition text-center ${
                    type === 'venta'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div>Venta SUNAT</div>
                  <div className="text-[11px] font-normal opacity-90">S/ {rateData.venta > 0 ? rateData.venta.toFixed(3) : '---'} (Gastos)</div>
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {type === 'compra' 
                  ? '💡 La tasa de Compra SUNAT se aplica legalmente para registrar ingresos, cobranzas o facturas emitidas en dólares.'
                  : '💡 La tasa de Venta SUNAT se aplica legalmente para registrar facturas de gastos, compras o importaciones en dólares.'}
              </p>
            </div>

          </div>

          {/* Result Column */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                Resultado de Conversión
              </span>

              {/* Prominent main conversion result */}
              <div className="mt-4">
                <div className="text-sm text-indigo-200/80 font-medium">
                  {numericMonto.toLocaleString('es-PE', { minimumFractionDigits: 2 })} {currency} equivalen a:
                </div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-1">
                  {currency === 'USD' ? 'S/' : 'US$'} {convertedValue.toLocaleString(currency === 'USD' ? 'es-PE' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-lg font-bold text-indigo-300 ml-2">
                    {currency === 'USD' ? 'PEN' : 'USD'}
                  </span>
                </div>
              </div>

              {/* Quick unit reference callouts */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-indigo-800/60 text-xs">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <span className="text-indigo-200/70 block text-[11px]">Valor de 1 Dólar:</span>
                  <strong className="text-sm text-white font-black block mt-0.5">
                    1 USD = S/ {unit1UsdInPen}
                  </strong>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <span className="text-indigo-200/70 block text-[11px]">Valor de 100 Soles:</span>
                  <strong className="text-sm text-white font-black block mt-0.5">
                    S/ 100 = US$ {unit100PenInUsd}
                  </strong>
                </div>
              </div>
            </div>

            {/* Calculation step breakdown */}
            <div className="mt-6 pt-4 border-t border-indigo-800/60 text-xs text-indigo-200/90 leading-relaxed">
              <span className="font-bold text-white block mb-1">
                Fórmula aplicada:
              </span>
              {currency === 'USD' ? (
                <span>
                  USD {numericMonto.toFixed(2)} × Tasa SUNAT ({type === 'compra' ? 'Compra' : 'Venta'}) S/ {currentRateValue.toFixed(3)} = S/ {convertedValue.toFixed(2)} PEN
                </span>
              ) : (
                <span>
                  PEN S/ {numericMonto.toFixed(2)} ÷ Tasa SUNAT ({type === 'compra' ? 'Compra' : 'Venta'}) S/ {currentRateValue.toFixed(3)} = US$ {convertedValue.toFixed(2)} USD
                </span>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* 3. Historical Rates Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
              📜 Histórico del Tipo de Cambio SUNAT
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Selecciona una fecha para consultar el tipo de cambio oficial publicado por la SUNAT.
            </p>
          </div>

          {/* Date Selector Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800">
            <button
              onClick={() => handleDateModeChange('today')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                selectedDateMode === 'today'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Hoy
            </button>
            <button
              onClick={() => handleDateModeChange('yesterday')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                selectedDateMode === 'yesterday'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Ayer
            </button>
            <button
              onClick={() => setSelectedDateMode('custom')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                selectedDateMode === 'custom'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Fecha Específica
            </button>
          </div>
        </div>

        {/* Custom date picker input if custom selected */}
        {selectedDateMode === 'custom' && (
          <div className="mb-6 max-w-xs">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Selecciona la fecha a consultar:
            </label>
            <input
              type="date"
              value={customDate}
              onChange={handleCustomDateChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Historical rates table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-6">Fecha (DD/MM/YYYY)</th>
                <th className="py-3.5 px-6 text-right">Compra SUNAT (S/)</th>
                <th className="py-3.5 px-6 text-right">Venta SUNAT (S/)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-sm font-medium">
              {history.length > 0 ? (
                history.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-slate-900 dark:text-white">
                      📅 {item.fecha}
                    </td>
                    <td className="py-3.5 px-6 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                      S/ {item.compra.toFixed(3)}
                    </td>
                    <td className="py-3.5 px-6 text-right font-semibold text-indigo-600 dark:text-indigo-400">
                      S/ {item.venta.toFixed(3)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-slate-400 text-xs">
                    Cargando histórico de tipos de cambio SUNAT...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Trust & Transparency Box */}
      <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-3xl p-6 shadow-sm">
        <h3 className="font-extrabold text-amber-900 dark:text-amber-300 text-base mb-2 flex items-center gap-2">
          ℹ️ Información importante y Descargo de Responsabilidad
        </h3>
        <p className="text-xs sm:text-sm text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
          Los valores mostrados corresponden al tipo de cambio disponible para la fecha indicada. Verifica siempre la fuente oficial antes de utilizar estos valores para declaraciones, operaciones tributarias o decisiones financieras.
        </p>
        <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-2 font-medium">
          Note: <code>calculadorasat.org</code> es una plataforma educativa e informativa independiente y no tiene afiliación oficial con la SUNAT (Superintendencia Nacional de Aduanas y de Administración Tributaria de Perú).
        </p>
      </div>

    </div>
  );
}
