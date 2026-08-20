'use client';

import React, { useState } from 'react';
import { ctsPeruCalculator } from '@/calculators/nomina/cts-peru';

export default function CtsClient() {
  const [sueldo, setSueldo] = useState<string>('3600');
  const [grats, setGrats] = useState<string>('3600');
  const [meses, setMeses] = useState<string>('6');

  const res = ctsPeruCalculator.calculate({
    sueldo_bruto: parseFloat(sueldo) || 0,
    gratificacion_recibida: parseFloat(grats) || 0,
    meses_semestre: parseFloat(meses) || 6,
  });

  const sexto = res.results.find(r => r.label.includes('1/6 de la Gratificación'))?.formatted;
  const computable = res.results.find(r => r.label.includes('Remuneración Computable'))?.formatted;
  const total = res.results.find(r => r.isMain)?.formatted;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Sueldo Bruto Mensual (PEN)
            </label>
            <input
              type="number"
              value={sueldo}
              onChange={(e) => setSueldo(e.target.value)}
              placeholder="3600"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-xl font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Gratificación Recibida
              </label>
              <input
                type="number"
                value={grats}
                onChange={(e) => setGrats(e.target.value)}
                placeholder="3600"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Meses Laborados (1-6)
              </label>
              <input
                type="number"
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                placeholder="6"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Cálculo del Depósito de CTS
            </span>

            <div className="mt-4">
              <div className="text-xs text-blue-200/80 font-bold uppercase tracking-wider">
                Monto a Depositar en Banco:
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                {total}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white/10 text-xs space-y-2 backdrop-blur-sm">
              <div className="flex justify-between">
                <span>1/6 Gratificación Computable:</span>
                <strong>{sexto}</strong>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span>Remuneración Computable:</span>
                <strong className="text-blue-300 font-bold">{computable}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] text-blue-200/80 leading-relaxed pt-4 border-t border-indigo-800/60">
            Fechas límite legales: 15 de mayo y 15 de noviembre.
          </div>
        </div>
      </div>
    </div>
  );
}
