'use client';

import React, { useState } from 'react';
import { SunatRateData } from '@/lib/sunat-exchange-rate';

interface Props {
  initialRate: SunatRateData;
}

export default function SolventarObligacionesClient({ initialRate }: Props) {
  const [monto, setMonto] = useState<string>('1000');
  const [moneda, setMoneda] = useState<'USD' | 'PEN'>('USD');
  const [tipoOperacion, setTipoOperacion] = useState<'pago' | 'cobro'>('pago');
  const [tasaOverride, setTasaOverride] = useState<string>('');

  const activeRate = tipoOperacion === 'pago' ? initialRate.venta : initialRate.compra;
  const tasaAplicada = parseFloat(tasaOverride) || activeRate || 3.75;
  const numericMonto = parseFloat(monto) || 0;

  let resultado = 0;
  if (moneda === 'USD') {
    resultado = numericMonto * tasaAplicada;
  } else {
    resultado = tasaAplicada > 0 ? numericMonto / tasaAplicada : 0;
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Monto de la Obligación
            </label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Ej: 1000"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-lg font-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Moneda Original
              </label>
              <select
                value={moneda}
                onChange={(e: any) => setMoneda(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">Dólares (USD)</option>
                <option value="PEN">Soles (PEN)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Concepto Obligación
              </label>
              <select
                value={tipoOperacion}
                onChange={(e: any) => setTipoOperacion(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pago">Pago / Gastos (Venta SUNAT)</option>
                <option value="cobro">Cobro / Ingresos (Compra SUNAT)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Tipo de Cambio Utilizado (S/ por USD)
            </label>
            <input
              type="number"
              step="any"
              value={tasaOverride}
              onChange={(e) => setTasaOverride(e.target.value)}
              placeholder={`S/ ${activeRate.toFixed(3)} (Tasa SUNAT por defecto)`}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-slate-500 block mt-1">
              Dejar en blanco para usar automáticamente la cotización oficial SUNAT ({initialRate.fecha}).
            </span>
          </div>
        </div>

        {/* Result Column */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Liquidación de Obligación
            </span>
            <div className="mt-4">
              <div className="text-sm text-indigo-200/80 font-medium">
                Monto equivalente para solventar la obligación:
              </div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-1">
                {moneda === 'USD' ? 'S/' : 'US$'} {resultado.toLocaleString(moneda === 'USD' ? 'es-PE' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span className="text-lg font-bold text-indigo-300 ml-2">
                  {moneda === 'USD' ? 'PEN' : 'USD'}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white/10 text-xs space-y-1 backdrop-blur-sm">
              <div><strong>Fecha de referencia:</strong> {initialRate.fecha}</div>
              <div><strong>Tasa SUNAT ({tipoOperacion === 'pago' ? 'Venta' : 'Compra'}):</strong> S/ {tasaAplicada.toFixed(3)}</div>
              <div><strong>Fuente:</strong> SUNAT / Proveedor Oficial Perú</div>
            </div>
          </div>

          <div className="mt-6 text-xs text-indigo-200/80 leading-relaxed pt-4 border-t border-indigo-800/60">
            Fórmula: {moneda === 'USD' ? `USD ${numericMonto} × S/ ${tasaAplicada.toFixed(3)} = S/ ${resultado.toFixed(2)} PEN` : `PEN S/ ${numericMonto} ÷ S/ ${tasaAplicada.toFixed(3)} = US$ ${resultado.toFixed(2)} USD`}
          </div>
        </div>
      </div>
    </div>
  );
}
