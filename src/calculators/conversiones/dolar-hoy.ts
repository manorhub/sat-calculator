import { CalculatorConfig } from '../../types/calculator';

export const dolarHoyCalculator: CalculatorConfig = {
  id: 'dolar-hoy-peru',
  title: 'Dólar Hoy en Perú',
  shortDescription: 'Cotización en tiempo real del precio del dólar de compra y venta en el mercado interbancario de Perú y tipo de cambio SUNAT.',
  category: 'Tipo de Cambio',
  categorySlug: 'tipo-de-cambio',
  slug: 'dolar-hoy',
  seo: {
    metaTitle: 'Dólar Hoy en Perú: Precio del Dólar y Tipo de Cambio',
    metaDescription: 'Consulta el dólar hoy en Perú. Precio del dólar de compra y venta en el mercado e información del tipo de cambio SUNAT oficial en tiempo real.',
    keywords: [
      'dolar hoy',
      'dólar hoy',
      'precio del dólar hoy',
      'precio del dolar',
      'precio del dólar',
      'precio dolar',
      'tipo de cambio hoy',
      'cuanto esta el dolar',
      'dólar hoy perú',
      'cotización del dólar'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto_dolar',
      label: 'Monto en Dólares (USD)',
      type: 'number',
      defaultValue: 100,
      placeholder: 'Ej: 100'
    },
    {
      id: 'tasa_mercado',
      label: 'Tasa del Mercado (S/ por USD)',
      type: 'number',
      defaultValue: 3.75,
      placeholder: '3.75'
    }
  ],
  calculate: (inputs) => {
    const monto = parseFloat(inputs.monto_dolar) || 0;
    const tasa = parseFloat(inputs.tasa_mercado) || 3.75;
    const totalSoles = monto * tasa;

    return {
      results: [
        {
          label: 'Monto en Dólares',
          value: monto,
          formatted: `US$ ${monto.toFixed(2)} USD`
        },
        {
          label: 'Tasa de Cambio Aplicada',
          value: tasa,
          formatted: `S/ ${tasa.toFixed(3)} PEN`
        },
        {
          label: 'Resultado en Soles',
          value: totalSoles,
          formatted: `S/ ${totalSoles.toLocaleString('es-PE', { minimumFractionDigits: 2 })} PEN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Se multiplica el importe en dólares ($${monto}) por la cotización vigente ($${tasa}).`,
          mathFormula: `Total\\ Soles = ${monto}\\ USD \\times S/\\ ${tasa} = S/\\ ${totalSoles.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    explanation: 'El precio del dólar hoy en Perú es el valor al que cotiza la moneda estadounidense en el mercado cambiario frente al sol peruano (PEN).',
    formula: 'Conversión: Soles (PEN) = Dólares (USD) × Tipo de Cambio',
    example: 'Para convertir $100 USD con una tasa de S/ 3.75 soles: 100 × 3.75 = S/ 375.00 soles.',
    legislation: 'Operaciones del Mercado Cambiario e Interbancario reguladas por el BCRP y la SBS en Perú.',
    faqs: [
      {
        question: '¿Cuánto está el dólar hoy en Perú?',
        answer: 'La cotización varía a lo largo del día bursátil. Consulta el cuadro en tiempo real en la parte superior.'
      },
      {
        question: '¿Cuál es la diferencia entre el dólar del mercado y el dólar SUNAT?',
        answer: 'El dólar del mercado cambia constantemente en bancos y casas de cambio. El dólar SUNAT es un valor de referencia oficial fijado una vez al día para libros contables y tributos.'
      }
    ],
    tips: [
      'Si vas a realizar compras o pagos en moneda extranjera, revisa siempre la cotización de venta. Si vas a cambiar dólares a soles, revisa la cotización de compra.'
    ],
    errors: [
      'Confundir la tasa de compra con la de venta al realizar cambios de divisas.'
    ]
  }
};
