'use client';

import React from 'react';
import { MarketRateData } from '@/lib/exchange-rates/market-rate';
import { SunatRateData } from '@/lib/sunat-exchange-rate';
import HistoricalChart from '@/components/HistoricalChart';

interface Props {
  marketRate: MarketRateData;
  sunatRate: SunatRateData;
}

export default function TipoCambioGeneralClient({ marketRate, sunatRate }: Props) {
  return (
    <div className="space-y-8">
      {/* Live Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-blue-900 text-white shadow-sm border border-blue-800">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-200">Tipo de Cambio del Mercado</div>
          <div className="text-3xl font-black mt-2">S/ {marketRate.sellRate.toFixed(3)} PEN</div>
          <div className="text-xs text-blue-200/80 mt-1">Compra: S/ {marketRate.buyRate.toFixed(3)} • Fuente: Mercado Interbancario</div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-sm border border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-300">Tipo de Cambio SUNAT</div>
          <div className="text-3xl font-black mt-2">S/ {sunatRate.venta.toFixed(3)} PEN</div>
          <div className="text-xs text-slate-300 mt-1">Compra: S/ {sunatRate.compra.toFixed(3)} • Fecha: {sunatRate.fecha}</div>
        </div>
      </div>

      <HistoricalChart initialSource="market" baseCompra={marketRate.buyRate} baseVenta={marketRate.sellRate} />
    </div>
  );
}
