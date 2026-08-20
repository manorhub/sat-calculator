'use client';

import React, { useState } from 'react';
import { quintaCategoriaPeruCalculator } from '@/calculators/nomina/quinta-categoria-peru';

export default function QuintaCategoriaClient() {
  const [sueldo, setSueldo] = useState<string>('4500');
  const [meses, setMeses] = useState<string>('12');
  const [grats, setGrats] = useState<string>('9000');

  const res = quintaCategoriaPeruCalculator.calculate({
    sueldo_mensual: parseFloat(sueldo) || 0,
    meses_trabajados: parseFloat(meses) || 12,
    gratificaciones: parseFloat(grats) || 0,
  });

  const ingresoAnual = res.results.find(r => r.label.includes('Ingreso Anual Proyectado'))?.formatted;
  const deduccion = res.results.find(r => r.label.includes('Deducción Legal'))?.formatted;
  const rentaNeta = res.results.find(r => r.label.includes('Renta Neta Imponible'))?.formatted;
  const impuestoAnual = res.results.find(r => r.label.includes('Impuesto Anual Total'))?.formatted;
  const retencionMensual = res.results.find(r => r.isMain)?.formatted;

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
              placeholder="4500"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-xl font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Meses Laborados
              </label>
              <input
                type="number"
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                placeholder="12"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Gratificaciones (Jul+Dic)
              </label>
              <input
                type="number"
                value={grats}
                onChange={(e) => setGrats(e.target.value)}
                placeholder="9000"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Proyección de Retención SUNAT
            </span>

            <div className="mt-4">
              <div className="text-xs text-indigo-200/80 font-bold uppercase tracking-wider">
                Retención Mensual Estimada:
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                {retencionMensual}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white/10 text-xs space-y-2 backdrop-blur-sm">
              <div className="flex justify-between">
                <span>Ingreso Anual Proyectado:</span>
                <strong>{ingresoAnual}</strong>
              </div>
              <div className="flex justify-between">
                <span>Deducción 7 UIT (2026):</span>
                <strong>{deduccion}</strong>
              </div>
              <div className="flex justify-between">
                <span>Renta Neta Imponible:</span>
                <strong>{rentaNeta}</strong>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span>Impuesto Anual Total:</span>
                <strong className="text-emerald-300 font-bold">{impuestoAnual}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] text-indigo-200/80 leading-relaxed pt-4 border-t border-indigo-800/60">
            UIT 2026: S/ 5,350 PEN. Deducción 7 UIT: S/ 37,450 PEN. Tramos impositivos acumulativos del 8%, 14%, 17%, 20% y 30%.
          </div>
        </div>
      </div>
    </div>
  );
}
