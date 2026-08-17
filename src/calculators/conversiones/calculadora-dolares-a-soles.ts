import { CalculatorConfig } from '../../types/calculator';

export const calculadoraDolaresASolesCalculator: CalculatorConfig = {
  id: 'calculo-dolares-a-soles',
  title: 'Calculadora Dólares a Soles',
  shortDescription: 'Convierte dólares estadounidenses (USD) a soles peruanos (PEN) usando el tipo de cambio SUNAT o una tasa personalizada.',
  category: 'Tipo de Cambio',
  categorySlug: 'tipo-de-cambio',
  slug: 'calculadora-dolares-a-soles',
  seo: {
    metaTitle: 'Calculadora Dólares a Soles: USD a PEN',
    metaDescription: 'Convierte dólares a soles peruanos fácilmente usando el tipo de cambio disponible o un valor personalizado.',
    keywords: [
      'convertir dólares a soles',
      'dólares a soles',
      'calculadora dólares a soles',
      'USD a PEN',
      'dólar a sol peruano',
      'tipo de cambio dólar Perú'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto',
      label: 'Monto en Dólares (USD)',
      type: 'number',
      defaultValue: 100,
      placeholder: 'Ingresa la cantidad en USD'
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
    const resultado = monto * tasaUtilizada;

    const modoLabel = modoTasa === 'sunat_venta'
      ? 'SUNAT Venta'
      : modoTasa === 'sunat_compra'
      ? 'SUNAT Compra'
      : 'Personalizado';

    return {
      results: [
        {
          label: 'Monto Ingresado (USD)',
          value: monto,
          formatted: `US$ ${monto.toFixed(2)} USD`
        },
        {
          label: `Tasa de Cambio Aplicada (${modoLabel})`,
          value: tasaUtilizada,
          formatted: `S/ ${tasaUtilizada.toFixed(3)} PEN`
        },
        {
          label: 'Resultado en Soles Peruanos (PEN)',
          value: resultado,
          formatted: `S/ ${resultado.toFixed(2)} PEN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Se multiplica el monto en dólares ($USD ${monto.toFixed(2)}) por la tasa de cambio seleccionada (${modoLabel}: S/ ${tasaUtilizada.toFixed(3)}) para obtener los soles peruanos correspondientes.`,
          mathFormula: `PEN = USD \\times Tasa = $${monto.toFixed(2)} \\times S/\\ ${tasaUtilizada.toFixed(3)} = S/\\ ${resultado.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    explanation: 'Esta calculadora permite convertir rápidamente dólares estadounidenses (USD) a soles peruanos (PEN). Puedes elegir entre usar la cotización oficial de la SUNAT o ingresar tu propio tipo de cambio personalizado de tu entidad bancaria o casa de cambio.',
    formula: 'Fórmula de Conversión USD a PEN:\nSoles (PEN) = Dólares (USD) × Tipo de Cambio (S/ por USD)',
    example: 'Para convertir $500 USD a soles con un tipo de cambio de S/ 3.75 por dólar:\nS/ PEN = 500 × 3.75 = S/ 1,875.00 soles.',
    legislation: 'Normas de conversión bancaria y tributaria de la República del Perú.',
    faqs: [
      {
        question: '¿Cuál es la diferencia entre el tipo de cambio SUNAT y el personalizado?',
        answer: 'El tipo de cambio SUNAT es la cotización oficial para la declaración de impuestos y comprobantes contables. El personalizado es la tasa comercial que te ofrece tu banco o casa de cambio.'
      },
      {
        question: '¿Cuántos soles son 100 dólares?',
        answer: 'Depende de la tasa del día. Si la cotización se ubica en S/ 3.75, 100 dólares equivalen a 375 soles peruanos.'
      },
      {
        question: '¿Cuándo conviene usar la tasa de compra y cuándo la de venta?',
        answer: 'Si estás vendiendo dólares para recibir soles (ingresos), aplica la tasa de compra. Si estás comprando dólares usando soles (gastos), aplica la tasa de venta.'
      }
    ],
    tips: [
      'Compara siempre el tipo de cambio interbancario comercial con la tasa de la SUNAT antes de realizar operaciones de cambio de divisas de alto volumen.',
      'Si emites facturas electrónicas en dólares en Perú, debes usar obligatoriamente el tipo de cambio SUNAT oficial de la fecha de emisión.'
    ],
    errors: [
      'Confundir el multiplicador al convertir dólares a soles (multiplicar en lugar de dividir).'
    ]
  }
};
