'use client';

import React, { useState } from 'react';
import { gratificacionPeruCalculator } from '@/calculators/nomina/gratificacion-peru';

export default function GratificacionClient() {
  const [sueldo, setSueldo] = useState<string>('3000');
  const [meses, setMeses] = useState<string>('6');
  const [salud, setSalud] = useState<'essalud' | 'eps'>('essalud');

  const res = gratificacionPeruCalculator.calculate({
    sueldo_bruto: parseFloat(sueldo) || 0,
    meses_completo: parseFloat(meses) || 6,
    afiliacion_salud: salud,
  });

  const base = res.results.find(r => r.label.includes('Gratificación Legal Base'))?.formatted;
  const bonif = res.results.find(r => r.label.includes('Bonificación Extraordinaria'))?.formatted;
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
              placeholder="3000"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-xl font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Seguro de Salud
              </label>
              <select
                value={salud}
                onChange={(e: any) => setSalud(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="essalud">EsSalud (+9%)</option>
                <option value="eps">EPS (+6.75%)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Desglose de Gratificación
            </span>

            <div className="mt-4">
              <div className="text-xs text-amber-200/80 font-bold uppercase tracking-wider">
                Monto Total Neto a Recibir:
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                {total}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white/10 text-xs space-y-2 backdrop-blur-sm">
              <div className="flex justify-between">
                <span>Gratificación Base ({meses} meses):</span>
                <strong>{base}</strong>
              </div>
              <div className="flex justify-between">
                <span>Bonificación ({salud === 'essalud' ? '9% EsSalud' : '6.75% EPS'}):</span>
                <strong className="text-amber-300">{bonif}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] text-amber-200/80 leading-relaxed pt-4 border-t border-indigo-800/60">
            Libre de descuentos de AFP/ONP conforme a la Ley N° 30334.
          </div>
        </div>
      </div>
    </div>
  );
}
