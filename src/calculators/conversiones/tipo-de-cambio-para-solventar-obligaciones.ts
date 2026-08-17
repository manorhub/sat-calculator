import { CalculatorConfig } from '../../types/calculator';

export const tipoCambioSolventarObligacionesCalculator: CalculatorConfig = {
  id: 'calculo-tipo-cambio-solventar-obligaciones',
  title: 'Tipo de Cambio para Solventar Obligaciones',
  shortDescription: 'Calcula el tipo de cambio oficial para la conversión de deudas y obligaciones en moneda extranjera en Perú.',
  category: 'Tipo de Cambio',
  categorySlug: 'tipo-de-cambio',
  slug: 'tipo-de-cambio-para-solventar-obligaciones',
  seo: {
    metaTitle: 'Tipo de Cambio para Solventar Obligaciones | SUNAT',
    metaDescription: 'Calcula y consulta el tipo de cambio utilizado para convertir montos relacionados con obligaciones en Perú.',
    keywords: [
      'tipo de cambio para solventar obligaciones',
      'tipo de cambio para pagos',
      'tipo de cambio SUNAT para obligaciones',
      'tipo de cambio para obligaciones',
      'tipo de cambio dólar para pagos',
      'tipo de cambio Perú'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto',
      label: 'Monto de la Obligación',
      type: 'number',
      defaultValue: 1000,
      placeholder: 'Ingresa el monto'
    },
    {
      id: 'moneda_origen',
      label: 'Moneda de la Obligación',
      type: 'select',
      defaultValue: 'USD',
      options: [
        { label: 'Dólares Estadounidenses (USD)', value: 'USD' },
        { label: 'Soles Peruanos (PEN)', value: 'PEN' }
      ]
    },
    {
      id: 'tipo_operacion',
      label: 'Naturaleza de la Obligación',
      type: 'select',
      defaultValue: 'pago',
      options: [
        { label: 'Pago de Compras / Gastos (Tasa Venta SUNAT)', value: 'pago' },
        { label: 'Cobro de Ventas / Ingresos (Tasa Compra SUNAT)', value: 'cobro' }
      ]
    },
    {
      id: 'tipo_cambio',
      label: 'Tipo de Cambio Aplicable (S/ por USD)',
      type: 'number',
      defaultValue: 3.75,
      placeholder: 'Ej: 3.758'
    }
  ],
  calculate: (inputs) => {
    const monto = parseFloat(inputs.monto) || 0;
    const monedaOrigen = inputs.moneda_origen || 'USD';
    const tipoOperacion = inputs.tipo_operacion || 'pago';
    const tipoCambio = parseFloat(inputs.tipo_cambio) || 3.75;

    let resultado = 0;
    const steps = [];

    const tasaLabel = tipoOperacion === 'pago' ? 'Venta SUNAT' : 'Compra SUNAT';

    if (monedaOrigen === 'USD') {
      resultado = monto * tipoCambio;
      steps.push({
        description: `Se multiplica el monto en dólares ($USD) por el tipo de cambio oficial de ${tasaLabel} para solventar la obligación en soles (S/ PEN).`,
        mathFormula: `Monto\\ en\\ Soles = $${monto.toFixed(2)}\\ USD \\times S/\\ ${tipoCambio.toFixed(3)} = S/\\ ${resultado.toFixed(2)}\\ PEN`
      });
    } else {
      resultado = monto / (tipoCambio || 1);
      steps.push({
        description: `Se divide el monto en soles (S/ PEN) entre el tipo de cambio oficial de ${tasaLabel} para determinar la obligación equivalente en dólares ($USD).`,
        mathFormula: `Monto\\ en\\ Dólares = \\frac{S/\\ ${monto.toFixed(2)}\\ PEN}{S/\\ ${tipoCambio.toFixed(3)}} = US$\\ ${resultado.toFixed(2)}\\ USD`
      });
    }

    return {
      results: [
        {
          label: 'Monto Original de la Obligación',
          value: monto,
          formatted: monedaOrigen === 'USD' ? `US$ ${monto.toFixed(2)} USD` : `S/ ${monto.toFixed(2)} PEN`
        },
        {
          label: `Tipo de Cambio Aplicado (${tasaLabel})`,
          value: tipoCambio,
          formatted: `S/ ${tipoCambio.toFixed(3)} por USD`
        },
        {
          label: 'Monto Equivalente para Solventar Obligación',
          value: resultado,
          formatted: monedaOrigen === 'USD' ? `S/ ${resultado.toFixed(2)} PEN` : `US$ ${resultado.toFixed(2)} USD`,
          isMain: true
        }
      ],
      steps
    };
  },
  content: {
    explanation: 'El tipo de cambio para solventar obligaciones fijadas en moneda extranjera en Perú corresponde al valor oficial de conversión publicado por la SUNAT o fijado por las normas legales financieras. Permite determinar el importe exacto en Soles (PEN) necesario para liquidar obligaciones tributarias, comerciales o deudas pactadas en dólares (USD).',
    formula: 'Para liquidar obligación en USD a PEN:\nImporte en Soles = Monto USD * Tipo de Cambio SUNAT (Compra o Venta)\n\nPara liquidar obligación en PEN a USD:\nImporte en Dólares = Monto Soles / Tipo de Cambio SUNAT',
    example: 'Si mantienes una deuda comercial de $2,500 USD pactada a liquidarse en soles en la fecha actual y la cotización de Venta SUNAT es S/ 3.755:\nObligación en Soles = 2,500 * 3.755 = S/ 9,387.50 PEN.',
    legislation: 'Código Civil del Perú (Art. 1237 sobre obligaciones en moneda extranjera) y Código Tributario de Perú.',
    faqs: [
      {
        question: '¿Qué significa solventar obligaciones en moneda extranjera?',
        answer: 'Significa cancelar o liquidar deudas, compras, tributos o compromisos financieros pactados originalmente en dólares u otra divisa mediante el pago equivalente en soles o viceversa.'
      },
      {
        question: '¿Qué tipo de cambio se usa para pagar tributos en Perú?',
        answer: 'Para el pago de impuestos ante la SUNAT se utiliza el tipo de cambio oficial publicado en la fecha en que se cause o efectúe el pago.'
      },
      {
        question: '¿Cuál es la diferencia entre tasa de compra y venta para obligaciones?',
        answer: 'La tasa de venta se aplica cuando la obligación representa una compra, gasto o pago a realizar. La tasa de compra se aplica a cobranzas e ingresos registrados.'
      }
    ],
    tips: [
      'Verifica la fecha exacta de exigibilidad de la obligación para utilizar la cotización publicada por la SUNAT correspondiente a ese día hábil.',
      'Guarda la constancia del tipo de cambio aplicado en la fecha del pago para respaldar tus registros ante una auditoría tributaria.'
    ],
    errors: [
      'Aplicar la cotización comercial del mercado paralelo para la declaración contable u oficial ante la SUNAT.',
      'Confundir la fecha de emisión de la obligación con la fecha de pago o vencimiento al calcular intereses moratorios.'
    ]
  }
};
