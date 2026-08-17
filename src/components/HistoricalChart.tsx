'use client';

import React, { useState } from 'react';
import { getHistoricalRatesSeries, TimeframeOption, RateSourceType } from '@/lib/exchange-rates/historical-rates';

interface Props {
  initialSource?: RateSourceType;
  baseCompra?: number;
  baseVenta?: number;
}

export default function HistoricalChart({ initialSource = 'market', baseCompra = 3.745, baseVenta = 3.755 }: Props) {
  const [source, setSource] = useState<RateSourceType>(initialSource);
  const [timeframe, setTimeframe] = useState<TimeframeOption>('30d');

  const series = getHistoricalRatesSeries(source, timeframe, baseCompra, baseVenta);

  if (!series || series.length === 0) return null;

  // Calculate SVG bounds
  const values = series.map(s => s.midRate);
  const minVal = Math.min(...values) - 0.01;
  const maxVal = Math.max(...values) + 0.01;
  const range = maxVal - minVal || 1;

  const width = 700;
  const height = 240;
  const padding = 40;

  const pointsSvg = series.map((pt, idx) => {
    const x = padding + (idx / (series.length - 1 || 1)) * (width - padding * 2);
    const y = height - padding - ((pt.midRate - minVal) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const firstPoint = series[0];
  const lastPoint = series[series.length - 1];
  const diff = lastPoint.midRate - firstPoint.midRate;
  const isUp = diff >= 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            📈 Tendencia Histórica del Tipo de Cambio
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Evolución del tipo de cambio {source === 'sunat' ? 'SUNAT Oficial' : 'del Mercado Interbancario'} (USD/PEN)
          </p>
        </div>

        {/* Dataset Switcher: Mercado vs SUNAT */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setSource('market')}
            className={`px-3 py-1.5 rounded-xl transition ${
              source === 'market'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Dólar Mercado
          </button>

          <button
            type="button"
            onClick={() => setSource('sunat')}
            className={`px-3 py-1.5 rounded-xl transition ${
              source === 'sunat'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            SUNAT Oficial
          </button>
        </div>
      </div>

      {/* Timeframe selector */}
      <div className="flex items-center gap-2 mb-6 text-xs font-bold">
        <span className="text-slate-400 uppercase tracking-wider mr-2">Periodo:</span>
        {(['7d', '30d', '90d', '1yr'] as TimeframeOption[]).map((tf) => (
          <button
            key={tf}
            type="button"
            onClick={() => setTimeframe(tf)}
            className={`px-3 py-1.5 rounded-xl border transition ${
              timeframe === tf
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white shadow-sm'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
            }`}
          >
            {tf === '7d' ? '7 Días' : tf === '30d' ? '30 Días' : tf === '90d' ? '90 Días' : '1 Año'}
          </button>
        ))}
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 text-center">
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase">Mínimo</div>
          <div className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-200">S/ {minVal.toFixed(3)}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase">Máximo</div>
          <div className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-200">S/ {maxVal.toFixed(3)}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase">Variación Periodo</div>
          <div className={`text-sm sm:text-base font-black ${isUp ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
            {isUp ? '+' : ''}{diff.toFixed(3)} PEN
          </div>
        </div>
      </div>

      {/* Dynamic Rendered SVG Chart */}
      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Background grid lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />

          {/* Polylines for trend */}
          <polyline
            fill="none"
            stroke={source === 'sunat' ? '#d97706' : '#2563eb'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pointsSvg}
          />
        </svg>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div>Inicio del periodo: {firstPoint.date} (S/ {firstPoint.midRate.toFixed(3)})</div>
        <div>Última cotización: {lastPoint.date} (S/ {lastPoint.midRate.toFixed(3)})</div>
      </div>
    </div>
  );
}
