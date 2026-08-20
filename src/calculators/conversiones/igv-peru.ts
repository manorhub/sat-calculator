import { CalculatorConfig } from '../../types/calculator';

export const igvPeruCalculator: CalculatorConfig = {
  id: 'igv-peru',
  title: 'Calculadora de IGV Perú (18%)',
  shortDescription: 'Calcula, agrega o desglosa el 18% del Impuesto General a las Ventas (IGV) en Perú para facturas electrónicas y declaraciones SUNAT.',
  category: 'Conversiones',
  categorySlug: 'conversiones',
  slug: 'calculadora-igv-peru',
  seo: {
    metaTitle: 'Calculadora de IGV Perú 18% | Desglosar y Agregar IGV SUNAT',
    metaDescription: 'Calcula el 18% de IGV en Perú. Desglosa el impuesto de un total o agrégalo a la base imponible según las normas de la SUNAT.',
    keywords: [
      'calculadora igv peru',
      'igv peru 18',
      'desglosar igv',
      'calcular igv',
      'igv sunat',
      'sacar el igv de un monto'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto',
      label: 'Monto (PEN)',
      type: 'number',
      defaultValue: 1000,
      placeholder: '1000'
    },
    {
      id: 'modo',
      label: 'Operación IGV',
      type: 'select',
      defaultValue: 'agregar',
      options: [
        { label: 'Agregar IGV (+18% sobre la Base Imponible)', value: 'agregar' },
        { label: 'Desglosar IGV (Extraer IGV de un Total Incluido)', value: 'desglosar' }
      ]
    }
  ],
  calculate: (inputs) => {
    const monto = parseFloat(inputs.monto) || 0;
    const modo = inputs.modo || 'agregar';
    const tasaIgv = 0.18;

    let subtotal = 0;
    let igv = 0;
    let total = 0;

    if (modo === 'agregar') {
      subtotal = monto;
      igv = monto * tasaIgv;
      total = monto + igv;
    } else {
      total = monto;
      subtotal = monto / 1.18;
      igv = total - subtotal;
    }

    return {
      results: [
        {
          label: 'Base Imponible (Subtotal)',
          value: subtotal,
          formatted: `S/ ${subtotal.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`
        },
        {
          label: 'IGV (18%)',
          value: igv,
          formatted: `S/ ${igv.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`
        },
        {
          label: 'Monto Total Facturado',
          value: total,
          formatted: `S/ ${total.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: modo === 'agregar' 
            ? `Cálculo agregando el 18% de IGV sobre la base imponible de S/ ${subtotal.toFixed(2)}.`
            : `Desglose dividiendo el total S/ ${total.toFixed(2)} entre 1.18 para obtener la base imponible.`,
          mathFormula: modo === 'agregar'
            ? `IGV = Subtotal \\times 0.18 = S/ ${subtotal.toFixed(2)} \\times 0.18 = S/ ${igv.toFixed(2)}`
            : `Subtotal = \\frac{Total}{1.18} = \\frac{S/ ${total.toFixed(2)}}{1.18} = S/ ${subtotal.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    explanation: 'El Impuesto General a las Ventas (IGV) en Perú es un tributo del 18% (16% de IGV propiamente dicho + 2% del Impuesto de Promoción Municipal IPM) que grava las operaciones comerciales.',
    formula: 'Para agregar IGV: Total = Base Imponible × 1.18\nPara desglosar IGV: Base Imponible = Total / 1.18',
    example: 'Para desglosar un total de S/ 118: Base Imponible = S/ 118 / 1.18 = S/ 100. IGV (18%) = S/ 18.',
    legislation: 'Texto Único Ordenado de la Ley del Impuesto General a las Ventas e Impuesto Selectivo al Consumo (Decreto Supremo N° 055-99-EF).',
    faqs: [
      {
        question: '¿Cuál es la tasa vigente del IGV en Perú?',
        answer: 'La tasa oficial del IGV en el Perú es del 18%, compuesta por un 16% correspondiente al IGV y un 2% asignado al Impuesto de Promoción Municipal (IPM).'
      },
      {
        question: '¿Cómo desglosar el IGV de una factura en soles?',
        answer: 'Para obtener la base imponible dividiendo el monto total entre 1.18. Restando la base imponible del total obtienes el valor exacto del IGV.'
      }
    ],
    tips: ['Conserva tus comprobantes de pago electrónicos de compras para utilizarlos como crédito fiscal en tu declaración mensual de IGV ante la SUNAT.'],
    errors: ['Calcular el IGV multiplicando el monto total por 0.18 en lugar de dividir entre 1.18.']
  }
};
