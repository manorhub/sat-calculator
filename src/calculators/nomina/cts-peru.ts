import { CalculatorConfig } from '../../types/calculator';

export const ctsPeruCalculator: CalculatorConfig = {
  id: 'cts-peru',
  title: 'Calculadora de CTS en Perú (Compensación por Tiempo de Servicios)',
  shortDescription: 'Calcula el monto del depósito semestral de CTS (Mayo y Noviembre) incluyendo el sexto de la gratificación recibida.',
  category: 'Nómina',
  categorySlug: 'nomina',
  slug: 'calculadora-cts-peru',
  seo: {
    metaTitle: 'Calculadora de CTS Perú 2026 | Mayo y Noviembre',
    metaDescription: 'Calcula el depósito semestral de Compensación por Tiempo de Servicios (CTS) en Perú incluyendo 1/6 de la gratificación.',
    keywords: [
      'calculadora cts peru',
      'calcular cts mayo noviembre',
      'compensacion por tiempo de servicios',
      'deposito cts peru 2026',
      'sexto de gratificacion cts'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'sueldo_bruto',
      label: 'Sueldo Bruto Mensual (PEN)',
      type: 'number',
      defaultValue: 3600,
      placeholder: '3600'
    },
    {
      id: 'gratificacion_recibida',
      label: 'Gratificación Recibida en el Semestre (PEN)',
      type: 'number',
      defaultValue: 3600,
      placeholder: '3600'
    },
    {
      id: 'meses_semestre',
      label: 'Meses Laborados en el Semestre (1 a 6)',
      type: 'number',
      defaultValue: 6,
      placeholder: '6'
    }
  ],
  calculate: (inputs) => {
    const sueldo = parseFloat(inputs.sueldo_bruto) || 0;
    const gratificacion = parseFloat(inputs.gratificacion_recibida) || sueldo;
    const meses = Math.min(6, Math.max(1, parseFloat(inputs.meses_semestre) || 6));

    // Remuneración computable = Sueldo + (1/6 de Gratificación)
    const sextoGratificacion = gratificacion / 6;
    const remuneracionComputable = sueldo + sextoGratificacion;

    // CTS semestral = (Remuneración Computable / 12) * meses
    const depositoCts = (remuneracionComputable / 12) * meses;

    return {
      results: [
        {
          label: 'Sueldo Bruto Mensual',
          value: sueldo,
          formatted: `S/ ${sueldo.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`
        },
        {
          label: '1/6 de la Gratificación',
          value: sextoGratificacion,
          formatted: `S/ ${sextoGratificacion.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`
        },
        {
          label: 'Remuneración Computable Total',
          value: remuneracionComputable,
          formatted: `S/ ${remuneracionComputable.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`
        },
        {
          label: 'Monto del Depósito Semestral de CTS',
          value: depositoCts,
          formatted: `S/ ${depositoCts.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Cálculo de CTS para ${meses} meses laborados en el semestre.`,
          mathFormula: `CTS = \\frac{Sueldo + \\frac{Gratificación}{6}}{12} \\times ${meses} = \\frac{S/ ${sueldo.toFixed(2)} + S/ ${sextoGratificacion.toFixed(2)}}{12} \\times ${meses} = S/ ${depositoCts.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    explanation: 'La Compensación por Tiempo de Servicios (CTS) en Perú es un beneficio social de prevención ante el desempleo acumulado por semestres (noviembre-abril y mayo-octubre).',
    formula: 'Remuneración Computable = Sueldo Bruto + (1/6 de Gratificación)\nDepósito CTS Semestral = (Remuneración Computable / 12) × Meses Laborados',
    example: 'Para un sueldo de S/ 3,600 y gratificación de S/ 3,600: Sexto de gratificación = S/ 600. Remuneración Computable = S/ 4,200. Depósito por 6 meses = S/ 2,100 PEN.',
    legislation: 'Texto Único Ordenado de la Ley de Compensación por Tiempo de Servicios (Decreto Supremo N° 001-97-TR).',
    faqs: [
      {
        question: '¿Cuándo se deposita la CTS en Perú?',
        answer: 'Los empleadores deben efectuar los depósitos semestrales de la CTS hasta el 15 de mayo (periodo noviembre-abril) y hasta el 15 de noviembre (periodo mayo-octubre).'
      },
      {
        question: '¿Se incluye la gratificación en el cálculo de la CTS?',
        answer: 'Sí. Se suma un sexto (1/6) de la última gratificación ordinaria percibida a la remuneración básica mensual para obtener la remuneración computable de la CTS.'
      }
    ],
    tips: ['Revisa periódicamente el estado de tu cuenta de CTS en tu entidad bancaria elegida.'],
    errors: ['Olvidar sumar el sexto de la gratificación a la remuneración mensual antes de aplicar la división semestral.']
  }
};
