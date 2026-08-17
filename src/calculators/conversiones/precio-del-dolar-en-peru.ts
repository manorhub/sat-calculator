import { CalculatorConfig } from '../../types/calculator';

export const precioDelDolarEnPeruCalculator: CalculatorConfig = {
  id: 'precio-del-dolar-en-peru',
  title: 'Precio del Dólar en Perú Hoy',
  shortDescription: 'Consulta y analiza el precio del dólar en Perú hoy, cotización de compra y venta e indicadores macroeconómicos del sol peruano.',
  category: 'Tipo de Cambio',
  categorySlug: 'tipo-de-cambio',
  slug: 'precio-del-dolar-en-peru',
  seo: {
    metaTitle: 'Precio del Dólar en Perú Hoy: Cotización USD/PEN',
    metaDescription: 'Conoce el precio del dólar en Perú hoy, cotización de compra y venta, factores que influyen en el sol peruano y convertidor de divisas.',
    keywords: [
      'precio del dólar en Perú',
      'precio del dolar peru',
      'precio dólar Perú',
      'dólar en Perú',
      'precio del dólar hoy Perú',
      'cotización del dólar en Perú'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto_precio',
      label: 'Monto a Convertir (USD)',
      type: 'number',
      defaultValue: 100,
      placeholder: '100'
    }
  ],
  calculate: (inputs) => {
    const monto = parseFloat(inputs.monto_precio) || 0;
    const rate = 3.75;
    const total = monto * rate;

    return {
      results: [
        {
          label: 'Monto ingresado',
          value: monto,
          formatted: `US$ ${monto.toFixed(2)} USD`
        },
        {
          label: 'Monto estimado en Soles',
          value: total,
          formatted: `S/ ${total.toFixed(2)} PEN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Conversión estimada basada en la cotización referencial de S/ ${rate}.`,
          mathFormula: `Total = ${monto} \\times ${rate} = ${total.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    explanation: 'El precio del dólar en Perú está determinado por las exportaciones de minerales, las decisiones de tasas del BCRP y las condiciones macroeconómicas globales.',
    formula: 'PEN = USD × Cotización',
    example: '100 USD × 3.75 = 375 PEN',
    legislation: 'Ley Orgánica del Banco Central de Reserva del Perú (BCRP).',
    faqs: [
      {
        question: '¿Qué influye en el precio del dólar en Perú?',
        answer: 'El precio internacional del cobre, las tasas de la Fed en EE.UU. y las intervenciones cambiarias del BCRP.'
      }
    ],
    tips: ['Monitorea la tendencia diaria en nuestro gráfico de Dólar Hoy.'],
    errors: ['No tomar en cuenta el margen comercial entre compra y venta.']
  }
};
