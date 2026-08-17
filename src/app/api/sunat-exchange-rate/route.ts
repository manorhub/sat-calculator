import { NextResponse } from 'next/server';
import {
  getSunatExchangeRate,
  getSunatHistoricalRatesList,
  getSunatAdminStatus,
  refreshSunatExchangeRate,
} from '@/lib/sunat-exchange-rate';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date') || undefined;
  const forceRefresh = searchParams.get('refresh') === 'true';

  try {
    const rateData = await getSunatExchangeRate(dateParam, forceRefresh);
    const history = await getSunatHistoricalRatesList();
    const adminStatus = getSunatAdminStatus();

    return NextResponse.json({
      success: rateData.status === 'ok',
      data: rateData,
      history,
      adminStatus,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error fetching SUNAT exchange rate',
        data: {
          compra: 0,
          venta: 0,
          fecha: new Date().toLocaleDateString('es-PE'),
          isoDate: new Date().toISOString().split('T')[0],
          lastUpdated: new Date().toISOString(),
          isCached: false,
          source: 'SUNAT',
          status: 'error',
          errorMessage: 'No se pudo actualizar el tipo de cambio SUNAT en este momento. Inténtalo nuevamente más tarde.',
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const updatedRate = await refreshSunatExchangeRate();
    const adminStatus = getSunatAdminStatus();

    return NextResponse.json({
      success: updatedRate.status === 'ok',
      message: 'Tipo de cambio SUNAT actualizado correctamente.',
      data: updatedRate,
      adminStatus,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Falló la actualización del tipo de cambio SUNAT.',
        adminStatus: getSunatAdminStatus(),
      },
      { status: 500 }
    );
  }
}
