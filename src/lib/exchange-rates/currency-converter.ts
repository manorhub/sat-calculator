/**
 * Unified Currency Converter Module for USD ↔ PEN.
 */

export interface CurrencyConversionInput {
  amount: number;
  direction: 'usd_to_pen' | 'pen_to_usd';
  rateMode: 'market' | 'sunat' | 'custom';
  customRate?: number;
  marketRateBuy?: number;
  marketRateSell?: number;
  sunatRateBuy?: number;
  sunatRateSell?: number;
  operationType?: 'compra' | 'venta'; // Compra vs Venta
}

export interface CurrencyConversionResult {
  sourceAmount: number;
  sourceCurrency: 'USD' | 'PEN';
  targetAmount: number;
  targetCurrency: 'USD' | 'PEN';
  appliedRate: number;
  rateMode: string;
  formula: string;
}

export function convertCurrency(input: CurrencyConversionInput): CurrencyConversionResult {
  const amount = input.amount > 0 ? input.amount : 0;
  const operation = input.operationType || 'venta';

  let rate = 3.75; // Default fallback

  if (input.rateMode === 'custom' && input.customRate && input.customRate > 0) {
    rate = input.customRate;
  } else if (input.rateMode === 'sunat') {
    rate = operation === 'compra' 
      ? (input.sunatRateBuy || 3.745) 
      : (input.sunatRateSell || 3.755);
  } else {
    // Market mode
    rate = operation === 'compra' 
      ? (input.marketRateBuy || 3.742) 
      : (input.marketRateSell || 3.758);
  }

  if (input.direction === 'usd_to_pen') {
    const targetAmount = Number((amount * rate).toFixed(2));
    return {
      sourceAmount: amount,
      sourceCurrency: 'USD',
      targetAmount,
      targetCurrency: 'PEN',
      appliedRate: rate,
      rateMode: input.rateMode === 'sunat' ? 'SUNAT' : (input.rateMode === 'custom' ? 'Personalizado' : 'Mercado'),
      formula: `US$ ${amount.toFixed(2)} USD × S/ ${rate.toFixed(3)} = S/ ${targetAmount.toFixed(2)} PEN`,
    };
  } else {
    const targetAmount = rate > 0 ? Number((amount / rate).toFixed(2)) : 0;
    return {
      sourceAmount: amount,
      sourceCurrency: 'PEN',
      targetAmount,
      targetCurrency: 'USD',
      appliedRate: rate,
      rateMode: input.rateMode === 'sunat' ? 'SUNAT' : (input.rateMode === 'custom' ? 'Personalizado' : 'Mercado'),
      formula: `S/ ${amount.toFixed(2)} PEN ÷ S/ ${rate.toFixed(3)} = US$ ${targetAmount.toFixed(2)} USD`,
    };
  }
}
