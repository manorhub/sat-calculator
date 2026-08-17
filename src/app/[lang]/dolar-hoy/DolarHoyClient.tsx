'use client';

import React, { useState } from 'react';
import { MarketRateData } from '@/lib/exchange-rates/market-rate';
import { SunatRateData } from '@/lib/sunat-exchange-rate';
import { convertCurrency } from '@/lib/exchange-rates/currency-converter';
import HistoricalChart from '@/components/HistoricalChart';

interface Props {
  marketRate: MarketRateData;
  sunatRate: SunatRateData;
}

export default function DolarHoyClient({ marketRate, sunatRate }: Props) {
  // Converter state
  const [monto, setMonto] = useState<string>('100');
  const [direction, setDirection] = useState<'usd_to_pen' | 'pen_to_usd'>('usd_to_pen');
  const [rateMode, setRateMode] = useState<'market' | 'sunat' | 'custom'>('market');
  const [customRate, setCustomRate] = useState<string>('3.75');
  const [operationType, setOperationType] = useState<'compra' | 'venta'>('venta');

  const numMonto = parseFloat(monto) || 0;
  const numCustomRate = parseFloat(customRate) || 3.75;

  const conversion = convertCurrency({
    amount: numMonto,
    direction,
    rateMode,
    customRate: numCustomRate,
    marketRateBuy: marketRate.buyRate,
    marketRateSell: marketRate.sellRate,
    sunatRateBuy: sunatRate.compra,
    sunatRateSell: sunatRate.venta,
    operationType,
  });

  return (
    <div className="space-y-8">
      {/* Top Rates Display: Market Rate + SUNAT Rate Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Card 1: Dólar del Mercado Interbancario (LIVE) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-blue-800/40 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-widest">
                Tipo de cambio del mercado
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {marketRate.isLive ? 'EN VIVO' : 'ÚLTIMO DATO'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">Dólar en Perú Ahora</h2>
            <p className="text-xs text-blue-200/80 mt-1">Cotización del mercado cambiario e interbancario</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="text-xs font-bold uppercase text-blue-200/80">Compra</div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                  S/ {marketRate.buyRate.toFixed(3)}
                </div>
                <span className="text-[10px] text-blue-200/60 block mt-1">El banco te paga esto</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="text-xs font-bold uppercase text-blue-200/80">Venta</div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                  S/ {marketRate.sellRate.toFixed(3)}
                </div>
                <span className="text-[10px] text-blue-200/60 block mt-1">El banco te cobra esto</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-blue-200/70 gap-2">
            <div><strong>Fecha:</strong> {marketRate.rateDate}</div>
            <div><strong>Fuente:</strong> {marketRate.source}</div>
          </div>
        </div>

        {/* Card 2: Tipo de Cambio SUNAT (Separate Card) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 uppercase tracking-widest">
                SUNAT Oficial
              </span>
              <span className="text-xs text-slate-400 font-medium">Referencial</span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">Tipo de Cambio SUNAT</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tasa legal para facturación e impuestos</p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase">Compra SUNAT</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  S/ {sunatRate.compra > 0 ? sunatRate.compra.toFixed(3) : '---'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase">Venta SUNAT</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  S/ {sunatRate.venta > 0 ? sunatRate.venta.toFixed(3) : '---'}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex justify-between items-center">
            <div>Fecha: <strong>{sunatRate.fecha}</strong></div>
            <a href="/tipo-de-cambio-sunat" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Ver detalle SUNAT →
            </a>
          </div>
        </div>

      </div>

      {/* Main Interactive Converter directly below rates */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-black text-slate-950 dark:text-white mb-6 flex items-center gap-2">
          💱 Convertidor Dólares ↔ Soles en Tiempo Real
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Monto a Convertir
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-slate-400">
                  {direction === 'usd_to_pen' ? '$' : 'S/'}
                </span>
                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  placeholder="100"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-lg font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Dirección
                </label>
                <select
                  value={direction}
                  onChange={(e: any) => setDirection(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="usd_to_pen">Dólares a Soles (USD → PEN)</option>
                  <option value="pen_to_usd">Soles a Dólares (PEN → USD)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Operación
                </label>
                <select
                  value={operationType}
                  onChange={(e: any) => setOperationType(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="venta">Venta (Comprar USD)</option>
                  <option value="compra">Compra (Vender USD)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Seleccionar Tasa de Cambio
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setRateMode('market')}
                  className={`py-3 px-2 rounded-xl border text-center transition ${
                    rateMode === 'market'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div>Mercado Live</div>
                  <div className="text-[10px] font-normal">S/ {operationType === 'venta' ? marketRate.sellRate.toFixed(3) : marketRate.buyRate.toFixed(3)}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRateMode('sunat')}
                  className={`py-3 px-2 rounded-xl border text-center transition ${
                    rateMode === 'sunat'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div>SUNAT Oficial</div>
                  <div className="text-[10px] font-normal">S/ {operationType === 'venta' ? sunatRate.venta.toFixed(3) : sunatRate.compra.toFixed(3)}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRateMode('custom')}
                  className={`py-3 px-2 rounded-xl border text-center transition ${
                    rateMode === 'custom'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div>Personalizado</div>
                  <div className="text-[10px] font-normal">Tasa Libre</div>
                </button>
              </div>
            </div>

            {rateMode === 'custom' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Tasa Personalizada (S/ por USD)
                </label>
                <input
                  type="number"
                  step="any"
                  value={customRate}
                  onChange={(e) => setCustomRate(e.target.value)}
                  placeholder="3.75"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                Resultado de Conversión
              </span>
              <div className="mt-4">
                <div className="text-sm text-indigo-200/80 font-medium">
                  {conversion.sourceCurrency} {conversion.sourceAmount.toFixed(2)} equivalen a:
                </div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-1">
                  {conversion.targetCurrency === 'PEN' ? 'S/' : 'US$'} {conversion.targetAmount.toLocaleString(conversion.targetCurrency === 'PEN' ? 'es-PE' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-lg font-bold text-indigo-300 ml-2">{conversion.targetCurrency}</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-white/10 text-xs space-y-1 backdrop-blur-sm">
                <div><strong>Tipo de tasa:</strong> {conversion.rateMode}</div>
                <div><strong>Cotización aplicada:</strong> S/ {conversion.appliedRate.toFixed(3)}</div>
              </div>
            </div>

            <div className="mt-6 text-xs text-indigo-200/80 leading-relaxed pt-4 border-t border-indigo-800/60">
              Fórmula: {conversion.formula}
            </div>
          </div>
        </div>
      </div>

      {/* Historical Chart Component */}
      <HistoricalChart initialSource="market" baseCompra={marketRate.buyRate} baseVenta={marketRate.sellRate} />
    </div>
  );
}
