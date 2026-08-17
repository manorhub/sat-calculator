'use client';

import React from 'react';
import { MarketRateData } from '@/lib/exchange-rates/market-rate';
import { SunatRateData } from '@/lib/sunat-exchange-rate';
import HistoricalChart from '@/components/HistoricalChart';

interface Props {
  marketRate: MarketRateData;
  sunatRate: SunatRateData;
}

export default function PrecioDolarPeruClient({ marketRate, sunatRate }: Props) {
  return (
    <div className="space-y-8">
      {/* Rate Comparison Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-4">
          Resumen de Cotizaciones del Dólar en Perú
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50/50 dark:bg-slate-950/20">
                <th className="py-3.5 px-6">Mercado / Ámbito</th>
                <th className="py-3.5 px-6 text-right">Compra (S/)</th>
                <th className="py-3.5 px-6 text-right">Venta (S/)</th>
                <th className="py-3.5 px-6">Fecha / Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm font-semibold">
              <tr>
                <td className="py-4 px-6 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <div>
                    <div className="text-slate-900 dark:text-white font-bold">Mercado Interbancario</div>
                    <div className="text-xs text-slate-500 font-normal">Bancos y casas de cambio</div>
                  </div>
                </td>
                <td className="py-4 px-6 text-right text-blue-600 dark:text-blue-400 font-black text-lg">
                  S/ {marketRate.buyRate.toFixed(3)}
                </td>
                <td className="py-4 px-6 text-right text-blue-600 dark:text-blue-400 font-black text-lg">
                  S/ {marketRate.sellRate.toFixed(3)}
                </td>
                <td className="py-4 px-6 text-xs text-slate-500">
                  {marketRate.rateDate} • <span className="text-emerald-600 dark:text-emerald-400 font-bold">EN VIVO</span>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <div>
                    <div className="text-slate-900 dark:text-white font-bold">SUNAT Oficial</div>
                    <div className="text-xs text-slate-500 font-normal">Facturación e impuestos</div>
                  </div>
                </td>
                <td className="py-4 px-6 text-right text-amber-600 dark:text-amber-400 font-black text-lg">
                  S/ {sunatRate.compra.toFixed(3)}
                </td>
                <td className="py-4 px-6 text-right text-amber-600 dark:text-amber-400 font-black text-lg">
                  S/ {sunatRate.venta.toFixed(3)}
                </td>
                <td className="py-4 px-6 text-xs text-slate-500">
                  {sunatRate.fecha} • Referencial
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Trend Chart */}
      <HistoricalChart initialSource="market" baseCompra={marketRate.buyRate} baseVenta={marketRate.sellRate} />
    </div>
  );
}
