'use client';

import React, { useState } from 'react';
import { semanasCotizadasImssCalculator } from '@/calculators/nomina/semanas-cotizadas-imss';

export default function SemanasCotizadasClient() {
  const [anos, setAnos] = useState<string>('15');
  const [salario, setSalario] = useState<string>('600');
  const [edad, setEdad] = useState<string>('65');
  const [ley, setLey] = useState<'ley73' | 'ley97'>('ley73');

  const calcResult = semanasCotizadasImssCalculator.calculate({
    anos_trabajados: parseFloat(anos) || 0,
    salario_diario: parseFloat(salario) || 0,
    edad_retiro: parseFloat(edad) || 65,
    ley_imss: ley,
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Años de Trabajo Cotizando al IMSS
            </label>
            <input
              type="number"
              value={anos}
              onChange={(e) => setAnos(e.target.value)}
              placeholder="15"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-lg font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Salario Diario Promedio (MXN)
            </label>
            <input
              type="number"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              placeholder="600"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-lg font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Edad de Retiro
              </label>
              <select
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="60">60 años (75%)</option>
                <option value="61">61 años (80%)</option>
                <option value="62">62 años (85%)</option>
                <option value="63">63 años (90%)</option>
                <option value="64">64 años (95%)</option>
                <option value="65">65 años (100%)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Régimen IMSS
              </label>
              <select
                value={ley}
                onChange={(e: any) => setLey(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ley73">Ley 73 (Antes del 1 de julio de 1997)</option>
                <option value="ley97">Ley 97 (A partir del 1 de julio de 1997)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Proyección de Pensión Estimada
            </span>

            <div className="mt-4">
              <div className="text-sm text-indigo-200/80 font-medium">
                Pensión Mensual Estimada ({ley === 'ley73' ? 'Ley 73' : 'Ley 97'}):
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                {calcResult.results.find(r => r.isMain)?.formatted}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white/10 text-xs space-y-2 backdrop-blur-sm">
              <div className="flex justify-between">
                <span>Semanas Cotizadas:</span>
                <strong>{calcResult.results[0].formatted}</strong>
              </div>
              <div className="flex justify-between">
                <span>Requisito Mínimo:</span>
                <strong>{calcResult.results[1].formatted}</strong>
              </div>
              <div className="flex justify-between">
                <span>Porcentaje por Edad ({edad} años):</span>
                <strong>{edad === '60' ? '75%' : edad === '61' ? '80%' : edad === '62' ? '85%' : edad === '63' ? '90%' : edad === '64' ? '95%' : '100%'}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-indigo-200/80 leading-relaxed pt-4 border-t border-indigo-800/60">
            Nota: Este cálculo es una estimación referencial basada en el historial continuo. Para obtener tu informe oficial, ingresa al portal de Semanas Cotizadas del IMSS.
          </div>
        </div>
      </div>
    </div>
  );
}
