import { CalculatorConfig } from '../../types/calculator';

export const comisionesTarjetaDolaresCalculator: CalculatorConfig = {
  id: 'comisiones-tarjeta-dolares',
  title: 'Calculadora de Comisiones por Compras en Dólares con Tarjeta',
  shortDescription: 'Calcula el costo real en Soles o Pesos de comprar en dólares con tu tarjeta bancaria incluyendo el margen cambiario (Spread) y la comisión por conversión Forex (3%-5%).',
  category: 'Finanzas Personales',
  categorySlug: 'finanzas-personales',
  slug: 'calculadora-comisiones-tarjeta-dolares',
  seo: {
    metaTitle: 'Calculadora de Compras en Dólares con Tarjeta | Comisiones Forex',
    metaDescription: 'Calcula cuánto te cuesta comprar en dólares con tu tarjeta de débito o crédito. Incluye comisiones bancarias por conversión de divisa y spread cambiario.',
    keywords: [
      'compras en dolares con tarjeta',
      'comision por cambio de divisa tarjeta',
      'dolar tarjeta peru',
      'comision forex tarjeta de credito',
      'cuanto cobra el banco por comprar en dolares'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto_usd',
      label: 'Monto de la Compra en Dólares (USD)',
      type: 'number',
      defaultValue: 100,
      placeholder: '100'
    },
    {
      id: 'tasa_cambio_base',
      label: 'Tipo de Cambio Base del Mercado (ej. 3.75)',
      type: 'number',
      defaultValue: 3.75,
      placeholder: '3.75'
    },
    {
      id: 'comision_porcentaje',
      label: 'Comisión del Banco por Cambio de Divisa (%)',
      type: 'number',
      defaultValue: 3.5,
      placeholder: '3.5'
    }
  ],
  calculate: (inputs) => {
    const usd = parseFloat(inputs.monto_usd) || 0;
    const tasaBase = parseFloat(inputs.tasa_cambio_base) || 3.75;
    const porcentajeComision = parseFloat(inputs.comision_porcentaje) || 0;

    const montoBaseLocal = usd * tasaBase;
    const comisionMonto = montoBaseLocal * (porcentajeComision / 100);
    const montoTotalConComision = montoBaseLocal + comisionMonto;
    const tasaEfectivaCobrada = usd > 0 ? montoTotalConComision / usd : tasaBase;

    return {
      results: [
        {
          label: 'Monto de Compra en USD',
          value: usd,
          formatted: `$ ${usd.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`
        },
        {
          label: 'Costo Base al Tipo de Cambio Nominal',
          value: montoBaseLocal,
          formatted: `S/ ${montoBaseLocal.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        },
        {
          label: `Comisión por Conversión Forex (${porcentajeComision}%)`,
          value: comisionMonto,
          formatted: `S/ ${comisionMonto.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        },
        {
          label: 'Tasa Efectiva Cobrada por Dólar',
          value: tasaEfectivaCobrada,
          formatted: `S/ ${tasaEfectivaCobrada.toFixed(4)}`
        },
        {
          label: 'Monto Total Facturado en tu Tarjeta',
          value: montoTotalConComision,
          formatted: `S/ ${montoTotalConComision.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Cálculo del costo total agregando la comisión del ${porcentajeComision}% sobre la tasa base de ${tasaBase.toFixed(3)}.`,
          mathFormula: `Total = (USD \\times Tasa) \\times (1 + \\frac{Comisión}{100}) = ($ ${usd.toFixed(2)} \\times ${tasaBase.toFixed(3)}) \\times (1 + ${porcentajeComision / 100}) = S/ ${montoTotalConComision.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    explanation: 'Cuando compras en tiendas extranjeras (Amazon, AliExpress, Netflix, Steam) con una tarjeta en moneda local, el banco aplica una tasa de venta propia con un recargo por conversión de divisas.',
    formula: 'Monto Total = (Monto USD × Tipo de Cambio Banco) + Comisión por Cambio de Divisa (3% a 5%)',
    example: 'Para una compra de $100 USD a tasa base 3.75 con comisión bancaria del 3.5%: Costo Base = S/ 375. Comisión = S/ 13.13. Total Facturado = S/ 388.13 PEN.',
    legislation: 'Transparencia de Tarifas y Comisiones Financieras de la Superintendencia de Banca, Seguros y AFP (SBS Perú).',
    faqs: [
      {
        question: '¿Por qué el banco me cobra más cuando compro en dólares?',
        answer: 'Los bancos aplican un tipo de cambio con margen propio (spread) más una comisión por conversión de divisa internacional que suele fluctuar entre el 2% y el 5% del valor de la compra.'
      },
      {
        question: '¿Cómo evitar pagar la comisión por cambio de divisa?',
        answer: 'Puedes utilizar una tarjeta de débito o crédito en dólares previamente fondeada con divisas cambiadas a tasa preferencial en casas de cambio digitales.'
      }
    ],
    tips: ['Paga siempre tus consumos en dólares seleccionando la moneda original (USD) en la pasarela de pago para evitar la Conversión Dinámica de Moneda (DCC).'],
    errors: ['Aceptar la conversión de moneda automática del comercio electrónico en ventanilla (DCC), lo que aplica una doble tarifa cambiaria.']
  }
};
