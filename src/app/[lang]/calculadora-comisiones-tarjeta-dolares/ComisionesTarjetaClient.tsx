'use client';

import React, { useState } from 'react';
import { comisionesTarjetaDolaresCalculator } from '@/calculators/finanzas-personales/comisiones-tarjeta-dolares';

interface ClientProps {
  defaultRate: number;
}

export default function ComisionesTarjetaClient({ defaultRate }: ClientProps) {
  const [usd, setUsd] = useState<string>('100');
  const [tasa, setTasa] = useState<string>(defaultRate > 0 ? defaultRate.toFixed(3) : '3.780');
  const [comision, setComision] = useState<string>('3.5');

  const res = comisionesTarjetaDolaresCalculator.calculate({
    monto_usd: parseFloat(usd) || 0,
    tasa_cambio_base: parseFloat(tasa) || defaultRate,
    comision_porcentaje: parseFloat(comision) || 0,
  });

  const baseLocal = res.results.find(r => r.label.includes('Costo Base'))?.formatted;
  const comisionMonto = res.results.find(r => r.label.includes('Comisión por Conversión'))?.formatted;
  const tasaEfectiva = res.results.find(r => r.label.includes('Tasa Efectiva'))?.formatted;
  const total = res.results.find(r => r.isMain)?.formatted;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Monto de Compra en Dólares (USD)
            </label>
            <input
              type="number"
              value={usd}
              onChange={(e) => setUsd(e.target.value)}
              placeholder="100"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-2xl font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Tipo de Cambio Venta Banco
              </label>
              <input
                type="number"
                step="0.001"
                value={tasa}
                onChange={(e) => setTasa(e.target.value)}
                placeholder="3.780"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Comisión por Conversión (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={comision}
                onChange={(e) => setComision(e.target.value)}
                placeholder="3.5"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
              Desglose Real Facturado en Tarjeta
            </span>

            <div className="mt-4">
              <div className="text-xs text-violet-200/80 font-bold uppercase tracking-wider">
                Monto Total Facturado en tu Moneda:
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                {total}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white/10 text-xs space-y-2 backdrop-blur-sm">
              <div className="flex justify-between">
                <span>Costo Nominal Base:</span>
                <strong>{baseLocal}</strong>
              </div>
              <div className="flex justify-between">
                <span>Comisión Forex ({comision}%):</span>
                <strong className="text-violet-300">{comisionMonto}</strong>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span>Tasa Efectiva por Dólar:</span>
                <strong className="text-emerald-300 font-bold">{tasaEfectiva}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] text-violet-200/80 leading-relaxed pt-4 border-t border-indigo-800/60">
            Tasa efectiva incluye el recargo porcentual por cambio de divisa extranjera.
          </div>
        </div>
      </div>
    </div>
  );
}
