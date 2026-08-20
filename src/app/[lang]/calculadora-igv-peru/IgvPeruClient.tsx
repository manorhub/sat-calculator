'use client';

import React, { useState } from 'react';
import { igvPeruCalculator } from '@/calculators/conversiones/igv-peru';

export default function IgvPeruClient() {
  const [monto, setMonto] = useState<string>('1000');
  const [modo, setModo] = useState<'agregar' | 'desglosar'>('agregar');

  const res = igvPeruCalculator.calculate({
    monto: parseFloat(monto) || 0,
    modo: modo,
  });

  const subtotal = res.results.find(r => r.label.includes('Base Imponible'))?.formatted;
  const igv = res.results.find(r => r.label.includes('IGV'))?.formatted;
  const total = res.results.find(r => r.isMain)?.formatted;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Modo de Operación IGV
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setModo('agregar')}
                className={`py-3 px-4 rounded-2xl text-xs font-bold transition border ${
                  modo === 'agregar'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                ➕ Agregar IGV (+18%)
              </button>

              <button
                type="button"
                onClick={() => setModo('desglosar')}
                className={`py-3 px-4 rounded-2xl text-xs font-bold transition border ${
                  modo === 'desglosar'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                ✂️ Desglosar IGV (/1.18)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {modo === 'agregar' ? 'Monto Base Imponible (Sin IGV en PEN)' : 'Monto Total Facturado (Con IGV en PEN)'}
            </label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="1000"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-2xl font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Desglose Oficial del Comprobante
            </span>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Base Imponible (Subtotal):</span>
                <strong className="text-lg text-white font-mono">{subtotal}</strong>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">IGV (18% SUNAT):</span>
                <strong className="text-lg text-emerald-400 font-mono">{igv}</strong>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-base font-extrabold text-white">Importe Total:</span>
                <strong className="text-2xl text-emerald-300 font-black font-mono">{total}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] text-slate-400 leading-relaxed pt-4 border-t border-slate-800/80">
            Fórmula utilizada: {modo === 'agregar' ? 'Base Imponible × 1.18 = Total' : 'Total / 1.18 = Base Imponible'}. Tasa vigente SUNAT 18%.
          </div>
        </div>
      </div>
    </div>
  );
}
