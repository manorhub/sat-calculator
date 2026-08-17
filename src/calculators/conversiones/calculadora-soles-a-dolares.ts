import { CalculatorConfig } from '../../types/calculator';

export const calculadoraSolesADolaresCalculator: CalculatorConfig = {
  id: 'calculo-soles-a-dolares',
  title: 'Calculadora Soles a Dólares',
  shortDescription: 'Convierte soles peruanos (PEN) a dólares estadounidenses (USD) usando el tipo de cambio SUNAT o una tasa personalizada.',
  category: 'Tipo de Cambio',
  categorySlug: 'tipo-de-cambio',
  slug: 'calculadora-soles-a-dolares',
  seo: {
    metaTitle: 'Calculadora Soles a Dólares: PEN a USD',
    metaDescription: 'Convierte soles peruanos a dólares estadounidenses usando el tipo de cambio que elijas.',
    keywords: [
      'soles a dólares',
      'convertir soles a dólares',
      'calculadora soles a dólares',
      'PEN a USD',
      'sol peruano a dólar'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto',
      label: 'Monto en Soles (PEN)',
      type: 'number',
      defaultValue: 500,
      placeholder: 'Ingresa la cantidad en PEN'
    },
    {
      id: 'modo_tasa',
      label: 'Modalidad de Tasa de Cambio',
      type: 'select',
      defaultValue: 'sunat_venta',
      options: [
        { label: 'Tipo de Cambio SUNAT (Venta)', value: 'sunat_venta' },
        { label: 'Tipo de Cambio SUNAT (Compra)', value: 'sunat_compra' },
        { label: 'Tipo de Cambio Personalizado', value: 'personalizado' }
      ]
    },
    {
      id: 'tasa_custom',
      label: 'Tasa Personalizada (S/ por USD)',
      type: 'number',
      defaultValue: 3.75,
      placeholder: 'Ej: 3.75'
    }
  ],
  calculate: (inputs) => {
    const monto = parseFloat(inputs.monto) || 0;
    const modoTasa = inputs.modo_tasa || 'sunat_venta';
    const tasaCustom = parseFloat(inputs.tasa_custom) || 3.75;

    const tasaUtilizada = tasaCustom;
    const resultado = tasaUtilizada > 0 ? monto / tasaUtilizada : 0;

    const modoLabel = modoTasa === 'sunat_venta'
      ? 'SUNAT Venta'
      : modoTasa === 'sunat_compra'
      ? 'SUNAT Compra'
      : 'Personalizado';

    return {
      results: [
        {
          label: 'Monto Ingresado (PEN)',
          value: monto,
          formatted: `S/ ${monto.toFixed(2)} PEN`
        },
        {
          label: `Tasa de Cambio Aplicada (${modoLabel})`,
          value: tasaUtilizada,
          formatted: `S/ ${tasaUtilizada.toFixed(3)} por USD`
        },
        {
          label: 'Resultado en Dólares Estadounidenses (USD)',
          value: resultado,
          formatted: `US$ ${resultado.toFixed(2)} USD`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Se divide la cantidad en soles peruanos (S/ ${monto.toFixed(2)}) entre la tasa de cambio seleccionada (${modoLabel}: S/ ${tasaUtilizada.toFixed(3)}) para calcular el equivalente en dólares estadounidenses.`,
          mathFormula: `USD = \\frac{PEN}{Tasa} = \\frac{S/\\ ${monto.toFixed(2)}}{S/\\ ${tasaUtilizada.toFixed(3)}} = US$\\ ${resultado.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    explanation: 'Esta herramienta permite convertir montos en soles peruanos (PEN) a dólares estadounidenses (USD). Puedes calcular utilizando la cotización SUNAT oficial o especificar una cotización bancaria/comercial personalizada.',
    formula: 'Fórmula de Conversión PEN a USD:\nDólares (USD) = Soles (PEN) / Tipo de Cambio (S/ por USD)',
    example: 'Para convertir S/ 1,000 PEN a dólares con una cotización de S/ 3.75 por dólar:\nUSD = 1,000 / 3.75 = $266.67 dólares estadounidenses.',
    legislation: 'Ley del Sistema Financiero y normativa cambiaria de Perú.',
    faqs: [
      {
        question: '¿Cuántos dólares me dan por 1,000 soles?',
        answer: 'Con una cotización de S/ 3.75 por dólar, 1,000 soles equivalen aproximadamente a $266.67 USD.'
      },
      {
        question: '¿Por qué se divide el monto en soles entre el tipo de cambio?',
        answer: 'Porque el tipo de cambio expresa cuántos soles cuesta 1 dólar. Para saber cuántos dólares contiene un monto en soles, se requiere dividir la cantidad total de soles entre dicho precio unitario.'
      }
    ],
    tips: [
      'Al ahorrar o invertir en dólares en Perú, toma en cuenta la comisión de cambio de divisas que cobran las plataformas financieras.',
      'Consulta las variaciones diarias de la SUNAT antes de consolidar la contabilidad de tu empresa.'
    ],
    errors: [
      'Multiplicar los soles por el tipo de cambio en lugar de dividir.'
    ]
  }
};
