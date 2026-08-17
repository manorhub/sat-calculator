'use client';

import React, { useState } from 'react';
import { OFFICIAL_UIT_HISTORY } from '@/calculators/conversiones/tablas-e-indicadores-sunat';
import { SunatRateData } from '@/lib/sunat-exchange-rate';

interface Props {
  initialRate: SunatRateData;
}

export default function TablasIndicadoresClient({ initialRate }: Props) {
  const [cantidadUit, setCantidadUit] = useState<string>('1');
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  const activeUit = OFFICIAL_UIT_HISTORY.find(u => u.year === selectedYear) || OFFICIAL_UIT_HISTORY[0];
  const numUit = parseFloat(cantidadUit) || 0;
  const equivalenciaSoles = numUit * activeUit.value;

  return (
    <div className="space-y-8">
      {/* Interactive UIT Calculator Widget */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
          🧮 Calculadora de Equivalencia de UIT (Unidad Impositiva Tributaria)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Cantidad de UIT
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={cantidadUit}
                onChange={(e) => setCantidadUit(e.target.value)}
                placeholder="Ej: 1 o 7"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-base font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Año / Ejercicio Fiscal
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {OFFICIAL_UIT_HISTORY.map(u => (
                  <option key={u.year} value={u.year}>
                    Año {u.year} (1 UIT = S/ {u.value.toLocaleString('es-PE')})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:col-span-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-md">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Resultado en Soles
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-2">
              S/ {equivalenciaSoles.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-base font-bold text-indigo-300 ml-2">PEN</span>
            </div>
            <div className="text-xs text-indigo-200/80 mt-4 pt-3 border-t border-indigo-800/60">
              Dispositivo: {activeUit.norma} (Publicado: {activeUit.fechaPublicacion})
            </div>
          </div>
        </div>
      </div>

      {/* Official UIT Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-4">
          📜 Histórico del Valor de la UIT en Perú
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Año</th>
                <th className="py-3.5 px-6 text-right">Valor de 1 UIT (S/)</th>
                <th className="py-3.5 px-6">Base Legal / Dispositivo</th>
                <th className="py-3.5 px-6">Publicación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-sm font-medium">
              {OFFICIAL_UIT_HISTORY.map((u) => (
                <tr key={u.year} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-900 dark:text-white">
                    {u.year}
                  </td>
                  <td className="py-3.5 px-6 text-right font-black text-blue-600 dark:text-blue-400">
                    S/ {u.value.toLocaleString('es-PE')}
                  </td>
                  <td className="py-3.5 px-6 text-xs text-slate-600 dark:text-slate-400">
                    {u.norma}
                  </td>
                  <td className="py-3.5 px-6 text-xs text-slate-500">
                    {u.fechaPublicacion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Brackets IR Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-4">
          🏛️ Tramos del Impuesto a la Renta de Trabajo (4ta y 5ta Categoría)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Tramo de Renta Neta Imponible</th>
                <th className="py-3.5 px-6 text-right">Tasa Marginal (%)</th>
                <th className="py-3.5 px-6 text-right">Monto Máximo Soles 2026</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-sm font-medium">
              <tr>
                <td className="py-3 px-6">Hasta 5 UIT</td>
                <td className="py-3 px-6 text-right font-bold text-emerald-600">8%</td>
                <td className="py-3 px-6 text-right font-semibold">S/ 26,750</td>
              </tr>
              <tr>
                <td className="py-3 px-6">Más de 5 UIT hasta 20 UIT</td>
                <td className="py-3 px-6 text-right font-bold text-emerald-600">14%</td>
                <td className="py-3 px-6 text-right font-semibold">S/ 107,000</td>
              </tr>
              <tr>
                <td className="py-3 px-6">Más de 20 UIT hasta 35 UIT</td>
                <td className="py-3 px-6 text-right font-bold text-amber-600">17%</td>
                <td className="py-3 px-6 text-right font-semibold">S/ 187,250</td>
              </tr>
              <tr>
                <td className="py-3 px-6">Más de 35 UIT hasta 45 UIT</td>
                <td className="py-3 px-6 text-right font-bold text-amber-600">20%</td>
                <td className="py-3 px-6 text-right font-semibold">S/ 240,750</td>
              </tr>
              <tr>
                <td className="py-3 px-6">Más de 45 UIT</td>
                <td className="py-3 px-6 text-right font-bold text-rose-600">30%</td>
                <td className="py-3 px-6 text-right font-semibold">Excedente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
