'use client';

import React, { useState } from 'react';
import { SunatRateData } from '@/lib/sunat-exchange-rate';

interface Props {
  initialRate: SunatRateData;
}

export default function DolaresASolesClient({ initialRate }: Props) {
  const [monto, setMonto] = useState<string>('100');
  const [mode, setMode] = useState<'sunat_venta' | 'sunat_compra' | 'custom'>('sunat_venta');
  const [customRate, setCustomRate] = useState<string>('3.75');

  const sunatRateValue = mode === 'sunat_compra' ? initialRate.compra : initialRate.venta;
  const activeRate = mode === 'custom' ? (parseFloat(customRate) || 3.75) : (sunatRateValue || 3.75);

  const numericMonto = parseFloat(monto) || 0;
  const totalSoles = numericMonto * activeRate;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Monto en Dólares (USD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-slate-400">$</span>
              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="100"
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-lg font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Seleccionar Tipo de Cambio
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setMode('sunat_venta')}
                className={`py-3 px-2 rounded-xl border text-center transition ${
                  mode === 'sunat_venta'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>SUNAT Venta</div>
                <div className="text-[10px] font-normal">S/ {initialRate.venta.toFixed(3)}</div>
              </button>

              <button
                type="button"
                onClick={() => setMode('sunat_compra')}
                className={`py-3 px-2 rounded-xl border text-center transition ${
                  mode === 'sunat_compra'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>SUNAT Compra</div>
                <div className="text-[10px] font-normal">S/ {initialRate.compra.toFixed(3)}</div>
              </button>

              <button
                type="button"
                onClick={() => setMode('custom')}
                className={`py-3 px-2 rounded-xl border text-center transition ${
                  mode === 'custom'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>Personalizado</div>
                <div className="text-[10px] font-normal">Tasa Libre</div>
              </button>
            </div>
          </div>

          {mode === 'custom' && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Tasa Personalizada (S/ por USD)
              </label>
              <input
                type="number"
                step="any"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                placeholder="Ej: 3.75"
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-base font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
              Resultado en Soles Peruanos
            </span>
            <div className="mt-4">
              <div className="text-sm text-blue-200/80 font-medium">
                US$ {numericMonto.toFixed(2)} USD son:
              </div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-1">
                S/ {totalSoles.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span className="text-lg font-bold text-blue-300 ml-2">PEN</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white/10 text-xs space-y-1 backdrop-blur-sm">
              <div><strong>Modo:</strong> {mode === 'custom' ? 'Tasa Personalizada' : `SUNAT (${mode === 'sunat_venta' ? 'Venta' : 'Compra'})`}</div>
              <div><strong>Tasa aplicada:</strong> S/ {activeRate.toFixed(3)} por USD</div>
            </div>
          </div>

          <div className="mt-6 text-xs text-blue-200/80 leading-relaxed pt-4 border-t border-blue-800/60">
            Fórmula: US$ {numericMonto.toFixed(2)} × S/ {activeRate.toFixed(3)} = S/ {totalSoles.toFixed(2)} PEN
          </div>
        </div>
      </div>
    </div>
  );
}
