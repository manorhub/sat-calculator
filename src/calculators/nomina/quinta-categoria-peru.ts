import { CalculatorConfig } from '../../types/calculator';

export const quintaCategoriaPeruCalculator: CalculatorConfig = {
  id: 'quinta-categoria-peru',
  title: 'Calculadora de Impuesto a la Renta de 5ta Categoría (Perú 2026)',
  shortDescription: 'Calcula la retención mensual del Impuesto a la Renta de Quinta Categoría para trabajadores en planilla deduciendo las 7 UIT vigentes.',
  category: 'Nómina',
  categorySlug: 'nomina',
  slug: 'calculadora-quinta-categoria-peru',
  seo: {
    metaTitle: 'Calculadora Renta de 5ta Categoría 2026 Perú | SUNAT',
    metaDescription: 'Calcula tu retención de Impuesto a la Renta de 5ta Categoría en Perú deduciendo 7 UIT (S/ 37,450 en 2026) y aplicando la escala de la SUNAT.',
    keywords: [
      'calculadora 5ta categoria peru',
      'renta de quinta categoria 2026',
      'impuesto a la renta 5ta categoria',
      'retencion quinta categoria sunat',
      'deduccion 7 uit 2026'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'sueldo_mensual',
      label: 'Sueldo Bruto Mensual (PEN)',
      type: 'number',
      defaultValue: 4500,
      placeholder: '4500'
    },
    {
      id: 'meses_trabajados',
      label: 'Meses a Laborar en el Año (Normalmente 12)',
      type: 'number',
      defaultValue: 12,
      placeholder: '12'
    },
    {
      id: 'gratificaciones',
      label: 'Gratificaciones Anuales (Julio + Diciembre en PEN)',
      type: 'number',
      defaultValue: 9000,
      placeholder: '9000'
    }
  ],
  calculate: (inputs) => {
    const sueldo = parseFloat(inputs.sueldo_mensual) || 0;
    const meses = parseFloat(inputs.meses_trabajados) || 12;
    const grats = parseFloat(inputs.gratificaciones) || (sueldo * 2);

    const uit2026 = 5350; // UIT 2026 in Peru = S/ 5,350
    const deduccion7Uit = 7 * uit2026; // S/ 37,450

    // Gross annual income projection
    const ingresoAnualBruto = (sueldo * meses) + grats;

    // Renta Neta Imponible
    const rentaNetaImponible = Math.max(0, ingresoAnualBruto - deduccion7Uit);

    // Progressive scale calculation in Peru
    let impuestoAnual = 0;
    let rem = rentaNetaImponible;

    // Tramo 1: Hasta 5 UIT (8%)
    const t1Cap = 5 * uit2026;
    if (rem > 0) {
      const base1 = Math.min(rem, t1Cap);
      impuestoAnual += base1 * 0.08;
      rem -= base1;
    }

    // Tramo 2: Mas de 5 UIT hasta 20 UIT (14%)
    const t2Cap = 15 * uit2026;
    if (rem > 0) {
      const base2 = Math.min(rem, t2Cap);
      impuestoAnual += base2 * 0.14;
      rem -= base2;
    }

    // Tramo 3: Mas de 20 UIT hasta 35 UIT (17%)
    const t3Cap = 15 * uit2026;
    if (rem > 0) {
      const base3 = Math.min(rem, t3Cap);
      impuestoAnual += base3 * 0.17;
      rem -= base3;
    }

    // Tramo 4: Mas de 35 UIT hasta 45 UIT (20%)
    const t4Cap = 10 * uit2026;
    if (rem > 0) {
      const base4 = Math.min(rem, t4Cap);
      impuestoAnual += base4 * 0.20;
      rem -= base4;
    }

    // Tramo 5: Mas de 45 UIT (30%)
    if (rem > 0) {
      impuestoAnual += rem * 0.30;
    }

    const retencionMensualProyectada = impuestoAnual / 12;

    return {
      results: [
        {
          label: 'Ingreso Anual Proyectado',
          value: ingresoAnualBruto,
          formatted: `S/ ${ingresoAnualBruto.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`
        },
        {
          label: 'Deducción Legal de 7 UIT (2026)',
          value: deduccion7Uit,
          formatted: `S/ ${deduccion7Uit.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN (7 × S/ ${uit2026})`
        },
        {
          label: 'Renta Neta Imponible',
          value: rentaNetaImponible,
          formatted: `S/ ${rentaNetaImponible.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`
        },
        {
          label: 'Impuesto Anual Total 5ta Categoría',
          value: impuestoAnual,
          formatted: `S/ ${impuestoAnual.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`
        },
        {
          label: 'Retención Mensual Estimada',
          value: retencionMensualProyectada,
          formatted: `S/ ${retencionMensualProyectada.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Cálculo deduciendo 7 UIT (S/ ${deduccion7Uit}) sobre el ingreso proyectado anual de S/ ${ingresoAnualBruto.toFixed(2)}.`,
          mathFormula: `Renta\\ Neta = Ingreso\\ Anual - 7\\ UIT = S/ ${ingresoAnualBruto.toFixed(2)} - S/ ${deduccion7Uit} = S/ ${rentaNetaImponible.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    explanation: 'El Impuesto a la Renta de Quinta Categoría gravan los ingresos obtenidos por el trabajo en relación de dependencia (planilla) en el Perú.',
    formula: 'Renta Neta Imponible = Ingreso Anual Bruto - 7 UIT (S/ 37,450)\nSe aplican tramos del 8%, 14%, 17%, 20% y 30%.',
    example: 'Para un sueldo mensual de S/ 4,500 con gratificaciones de S/ 9,000: Ingreso Anual = S/ 63,000. Renta Neta = S/ 63,000 - S/ 37,450 = S/ 25,550. Impuesto Anual ≈ S/ 2,044. Retención Mensual ≈ S/ 170 PEN.',
    legislation: 'Texto Único Ordenado de la Ley del Impuesto a la Renta de Perú (Decreto Supremo N° 179-2004-EF).',
    faqs: [
      {
        question: '¿A partir de qué sueldo mensual se paga Renta de 5ta Categoría en 2026?',
        answer: 'En 2026, si ganas más de S/ 2,675 brutos al mes (considerando 14 sueldos al año) superas las 7 UIT (S/ 37,450) y comienzas a proyectar retenciones de 5ta Categoría.'
      },
      {
        question: '¿Puedo deducir gastos adicionales además de las 7 UIT?',
        answer: 'Sí, los trabajadores pueden deducir hasta 3 UIT adicionales por gastos en restaurantes, hoteles, servicios profesionales, alquiler de inmuebles y aportes a EsSalud de trabajadores del hogar.'
      }
    ],
    tips: ['Solicita tus facturas electrónicas con tu DNI para sustentar deducciones adicionales de hasta 3 UIT ante la SUNAT.'],
    errors: ['Olvidar incluir las gratificaciones legales de julio y diciembre en el cálculo del ingreso bruto anual.']
  }
};
