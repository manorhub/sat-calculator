import { CalculatorConfig } from '../../types/calculator';

export const gratificacionPeruCalculator: CalculatorConfig = {
  id: 'gratificacion-peru',
  title: 'Calculadora de Gratificación en Perú (Julio y Diciembre)',
  shortDescription: 'Calcula el monto de la gratificación legal de Fiestas Patrias (Julio) o Navidad (Diciembre) más la Bonificación Extraordinaria del 9% (EsSalud) o 6.75% (EPS).',
  category: 'Nómina',
  categorySlug: 'nomina',
  slug: 'calculadora-gratificacion-peru',
  seo: {
    metaTitle: 'Calculadora de Gratificación Perú 2026 | Julio y Diciembre',
    metaDescription: 'Calcula tu gratificación legal de Fiestas Patrias y Navidad en Perú. Incluye la Bonificación Extraordinaria del 9% de EsSalud o 6.75% de EPS.',
    keywords: [
      'calculadora gratificacion peru',
      'calcular gratificacion julio diciembre',
      'gratificacion fiestas patrias',
      'gratificacion navidad peru',
      'bonificacion extraordinaria essalud 9'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'sueldo_bruto',
      label: 'Sueldo Bruto Mensual (PEN)',
      type: 'number',
      defaultValue: 3000,
      placeholder: '3000'
    },
    {
      id: 'meses_completo',
      label: 'Meses Completos Laborados en el Semestre (1 a 6)',
      type: 'number',
      defaultValue: 6,
      placeholder: '6'
    },
    {
      id: 'afiliacion_salud',
      label: 'Afiliación de Salud para Bonificación',
      type: 'select',
      defaultValue: 'essalud',
      options: [
        { label: 'EsSalud (Bonificación Extraordinaria 9%)', value: 'essalud' },
        { label: 'EPS (Bonificación Extraordinaria 6.75%)', value: 'eps' }
      ]
    }
  ],
  calculate: (inputs) => {
    const sueldo = parseFloat(inputs.sueldo_bruto) || 0;
    const meses = Math.min(6, Math.max(1, parseFloat(inputs.meses_completo) || 6));
    const salud = inputs.afiliacion_salud || 'essalud';

    // Base gratificacion = (Sueldo / 6) * meses
    const gratificacionBase = (sueldo / 6) * meses;

    // Bonificacion extraordinaria (9% for EsSalud, 6.75% for EPS)
    const porcentajeBonif = salud === 'essalud' ? 0.09 : 0.0675;
    const bonificacionExtra = gratificacionBase * porcentajeBonif;

    const totalGratificacion = gratificacionBase + bonificacionExtra;

    return {
      results: [
        {
          label: 'Gratificación Legal Base',
          value: gratificacionBase,
          formatted: `S/ ${gratificacionBase.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`
        },
        {
          label: `Bonificación Extraordinaria (${salud === 'essalud' ? '9% EsSalud' : '6.75% EPS'})`,
          value: bonificacionExtra,
          formatted: `S/ ${bonificacionExtra.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`
        },
        {
          label: 'Monto Total a Recibir en Cuenta',
          value: totalGratificacion,
          formatted: `S/ ${totalGratificacion.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Cálculo de gratificación para ${meses} meses con bonificación de ${salud === 'essalud' ? '9% EsSalud' : '6.75% EPS'}.`,
          mathFormula: `Total = Gratificación + Bonificación = S/ ${gratificacionBase.toFixed(2)} + S/ ${bonificacionExtra.toFixed(2)} = S/ ${totalGratificacion.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    explanation: 'La gratificación legal en Perú se otorga dos veces al año (julio y diciembre) a trabajadores de la actividad privada bajo el régimen laboral general (Ley N° 27735).',
    formula: 'Gratificación Base = (Sueldo Bruto / 6) × Meses Completos\nBonificación Extraordinaria = Gratificación Base × (9% EsSalud o 6.75% EPS)',
    example: 'Para un sueldo de S/ 3,000 con 6 meses laborados y EsSalud: Gratificación Base = S/ 3,000. Bonificación (9%) = S/ 270. Total a cobrar = S/ 3,270 PEN libre de descuentos de AFP/ONP.',
    legislation: 'Ley que Regula la Concesión de las Gratificaciones para los Trabajadores del Régimen de la Actividad Privada por Fiestas Patrias y Navidad (Ley N° 27735 y Ley N° 30334).',
    faqs: [
      {
        question: '¿Cuándo se paga la gratificación en Perú?',
        answer: 'La gratificación de Fiestas Patrias se debe abonar hasta el 15 de julio. La gratificación de Navidad se debe abonar hasta el 15 de diciembre.'
      },
      {
        question: '¿La gratificación está sujeta a descuentos de AFP u ONP?',
        answer: 'No. En virtud de la Ley N° 30334, las gratificaciones están inafectas de descuentos para pensiones (AFP/ONP) y EsSalud. El empleador abona el 9% de EsSalud directamente al trabajador como Bonificación Extraordinaria.'
      }
    ],
    tips: ['Solo cuentan los meses calendarios completos trabajados durante el semestre (Enero-Junio para Julio / Julio-Diciembre para Diciembre).'],
    errors: ['Calcular la gratificación considerando meses incompletos o descontando aportes de AFP/ONP.']
  }
};
