import { CalculatorConfig } from '../../types/calculator';

export interface UitRecord {
  year: number;
  value: number;
  norma: string;
  fechaPublicacion: string;
}

export const OFFICIAL_UIT_HISTORY: UitRecord[] = [
  { year: 2026, value: 5350, norma: 'Decreto Supremo N.° 298-2025-EF', fechaPublicacion: '28/12/2025' },
  { year: 2025, value: 5300, norma: 'Decreto Supremo N.° 260-2024-EF', fechaPublicacion: '24/12/2024' },
  { year: 2024, value: 5155, norma: 'Decreto Supremo N.° 309-2023-EF', fechaPublicacion: '28/12/2023' },
  { year: 2023, value: 4950, norma: 'Decreto Supremo N.° 309-2022-EF', fechaPublicacion: '24/12/2022' },
  { year: 2022, value: 4600, norma: 'Decreto Supremo N.° 398-2021-EF', fechaPublicacion: '30/12/2021' },
];

export const tablasEIndicadoresSunatCalculator: CalculatorConfig = {
  id: 'tablas-e-indicadores-sunat',
  title: 'Tablas e Indicadores SUNAT',
  shortDescription: 'Consulta los valores tributarios oficiales de Perú, histórico de la UIT, escalas del Impuesto a la Renta y parámetros de referencia de la SUNAT.',
  category: 'Tipo de Cambio',
  categorySlug: 'tipo-de-cambio',
  slug: 'tablas-e-indicadores-sunat',
  seo: {
    metaTitle: 'Tablas e Indicadores SUNAT: UIT y Valores Tributarios Perú',
    metaDescription: 'Consulta el valor de la UIT en Perú, tablas tributarias del Impuesto a la Renta, tasas e indicadores oficiales fijados por SUNAT y el MEF.',
    keywords: [
      'tablas e indicadores sunat',
      'indicadores sunat',
      'tablas sunat',
      'indicadores tributarios Perú',
      'valores tributarios SUNAT',
      'UIT Perú 2026',
      'UIT hoy'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'cantidad_uit',
      label: 'Cantidad de UIT a Calcular',
      type: 'number',
      defaultValue: 1,
      placeholder: 'Ej: 1 o 7'
    },
    {
      id: 'ano_uit',
      label: 'Ejercicio Fiscal (Año)',
      type: 'select',
      defaultValue: '2026',
      options: [
        { label: '2026 (UIT S/ 5,350)', value: '2026' },
        { label: '2025 (UIT S/ 5,300)', value: '2025' },
        { label: '2024 (UIT S/ 5,155)', value: '2024' },
        { label: '2023 (UIT S/ 4,950)', value: '2023' }
      ]
    }
  ],
  calculate: (inputs) => {
    const cantidad = parseFloat(inputs.cantidad_uit) || 0;
    const yearSelect = parseInt(inputs.ano_uit, 10) || 2026;

    const record = OFFICIAL_UIT_HISTORY.find(u => u.year === yearSelect) || OFFICIAL_UIT_HISTORY[0];
    const totalSoles = cantidad * record.value;

    return {
      results: [
        {
          label: 'Cantidad de UIT',
          value: cantidad,
          formatted: `${cantidad} UIT`
        },
        {
          label: `Valor de 1 UIT (${record.year})`,
          value: record.value,
          formatted: `S/ ${record.value.toLocaleString('es-PE')} PEN`
        },
        {
          label: `Monto Equivalente en Soles (${record.year})`,
          value: totalSoles,
          formatted: `S/ ${totalSoles.toLocaleString('es-PE', { minimumFractionDigits: 2 })} PEN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Se multiplica el número de Unidades Impositivas Tributarias (${cantidad} UIT) por el valor oficial vigente fijado por el Ministerio de Economía y Finanzas para el año ${record.year} (${record.norma}: S/ ${record.value}).`,
          mathFormula: `Total\\ Soles = ${cantidad}\\ UIT \\times S/\\ ${record.value} = S/\\ ${totalSoles.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    explanation: 'La Unidad Impositiva Tributaria (UIT) es el valor de referencia utilizado en Perú para determinar impuestos, infracciones, sanciones, deducciones del Impuesto a la Renta y límites de regímenes tributarios ante la SUNAT.',
    formula: 'Cálculo de Equivalencia UIT:\nImporte en Soles = Cantidad de UIT × Valor de la UIT del Ejercicio',
    example: 'Para calcular las 7 UIT de deducción a la renta de trabajo en el ejercicio 2026 (UIT S/ 5,350):\n7 UIT × S/ 5,350 = S/ 37,450 soles.',
    legislation: 'Decreto Supremo del Ministerio de Economía y Finanzas (MEF) publicado anualmente en el Diario Oficial El Peruano.',
    faqs: [
      {
        question: '¿Cuál es el valor de la UIT en Perú para el 2026?',
        answer: 'El valor de la Unidad Impositiva Tributaria (UIT) para el ejercicio 2026 está fijado en S/ 5,350 soles.'
      },
      {
        question: '¿Quién determina el valor de la UIT en Perú?',
        answer: 'El Poder Ejecutivo, a través del Ministerio de Economía y Finanzas (MEF), fija anualmente el valor de la UIT considerando los supuestos macroeconómicos.'
      },
      {
        question: '¿Para qué sirve la UIT?',
        answer: 'Sirve de referencia legal para calcular tramos del Impuesto a la Renta de 4ta y 5ta categoría, multas de la SUNAT, escalas de licencias y topes para regímenes de MYPES.'
      }
    ],
    tips: [
      'Al presentar la Declaración Jurada Anual del Impuesto a la Renta, asegúrate de utilizar el valor de la UIT del año que se está declarando.',
      'Revisa las 7 UIT de deducción sin sustento para rentas de 4ta y 5ta categoría antes de estimar tus retenciones de quinta.'
    ],
    errors: [
      'Aplicar la UIT del año en curso para regularizar una declaración rectificatoria de un ejercicio fiscal anterior.'
    ]
  }
};
