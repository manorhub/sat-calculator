import { CalculatorConfig } from '../../types/calculator';

export const tipoCambioSunatCalculator: CalculatorConfig = {
  id: 'calculo-tipo-de-cambio-sunat',
  title: 'Tipo de Cambio SUNAT',
  shortDescription: 'Consulta el tipo de cambio SUNAT de hoy y convierte dólares estadounidenses (USD) a soles peruanos (PEN) fácilmente.',
  category: 'Tipo de Cambio',
  categorySlug: 'tipo-de-cambio',
  slug: 'tipo-de-cambio-sunat',
  seo: {
    metaTitle: '🇵🇪 Tipo de Cambio SUNAT Hoy — Cotización Dólar a Soles al Instante',
    metaDescription: 'Consulta el tipo de cambio oficial SUNAT de hoy en Perú. Convierte dólares USD a soles PEN con el precio de compra y venta oficial en tiempo real.',
    keywords: [
      'tipo de cambio SUNAT',
      'tipo de cambio SUNAT hoy',
      'tipo de cambio SUNAT dólar',
      'dólar SUNAT',
      'tipo de cambio dólar sol peruano',
      'tipo de cambio USD PEN',
      'tipo de cambio compra venta SUNAT',
      'tipo de cambio Perú',
      'convertir dólares a soles',
      'convertir soles a dólares'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'monto',
      label: 'Monto a Convertir',
      type: 'number',
      defaultValue: 100,
      placeholder: 'Ingresa la cantidad'
    },
    {
      id: 'direccion',
      label: 'Dirección de Conversión',
      type: 'select',
      defaultValue: 'usd_to_pen',
      options: [
        { label: 'Dólares (USD) a Soles (PEN)', value: 'usd_to_pen' },
        { label: 'Soles (PEN) a Dólares (USD)', value: 'pen_to_usd' }
      ]
    },
    {
      id: 'operacion',
      label: 'Tipo de Operación SUNAT',
      type: 'select',
      defaultValue: 'venta',
      options: [
        { label: 'Venta SUNAT (para gastos o compras en USD)', value: 'venta' },
        { label: 'Compra SUNAT (para ingresos o cobranzas en USD)', value: 'compra' }
      ]
    },
    {
      id: 'tipo_cambio',
      label: 'Tipo de Cambio SUNAT (S/ por USD)',
      type: 'number',
      defaultValue: 3.75,
      placeholder: 'Ej: 3.758'
    }
  ],
  calculate: (inputs) => {
    const monto = parseFloat(inputs.monto) || 0;
    const direccion = inputs.direccion || 'usd_to_pen';
    const operacion = inputs.operacion || 'venta';
    const tipoCambio = parseFloat(inputs.tipo_cambio) || 3.75;

    let resultado = 0;
    const steps = [];

    const tipoNombre = operacion === 'compra' ? 'Compra SUNAT' : 'Venta SUNAT';

    if (direccion === 'usd_to_pen') {
      resultado = monto * tipoCambio;
      steps.push({
        description: `Se multiplica la cantidad en dólares estadounidenses ($USD) por el tipo de cambio oficial ${tipoNombre} para obtener el equivalente en soles peruanos (S/ PEN).`,
        mathFormula: `PEN = USD \\times Tasa\\ ${tipoNombre} = $${monto.toFixed(2)} \\times S/\\ ${tipoCambio.toFixed(3)} = S/\\ ${resultado.toFixed(2)}`
      });
    } else {
      resultado = monto / (tipoCambio || 1);
      steps.push({
        description: `Se divide la cantidad en soles peruanos (S/ PEN) entre el tipo de cambio oficial ${tipoNombre} para obtener el equivalente en dólares estadounidenses ($USD).`,
        mathFormula: `USD = \\frac{PEN}{Tasa\\ ${tipoNombre}} = \\frac{S/\\ ${monto.toFixed(2)}}{S/\\ ${tipoCambio.toFixed(3)}} = US$\\ ${resultado.toFixed(2)}`
      });
    }

    return {
      results: [
        {
          label: direccion === 'usd_to_pen' ? 'Monto en Dólares (USD)' : 'Monto en Soles (PEN)',
          value: monto,
          formatted: direccion === 'usd_to_pen' 
            ? `US$ ${monto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
            : `S/ ${monto.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        },
        {
          label: `Tasa SUNAT Utilizada (${tipoNombre})`,
          value: tipoCambio,
          formatted: `S/ ${tipoCambio.toLocaleString('es-PE', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} por USD`
        },
        {
          label: direccion === 'usd_to_pen' ? 'Resultado Neto en Soles (PEN)' : 'Resultado Neto en Dólares (USD)',
          value: resultado,
          formatted: direccion === 'usd_to_pen' 
            ? `S/ ${resultado.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PEN` 
            : `US$ ${resultado.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
          isMain: true
        }
      ],
      steps
    };
  },
  content: {
    explanation: 'El tipo de cambio SUNAT es el valor oficial de compra y venta del dólar estadounidense (USD) con respecto al sol peruano (PEN) publicado por la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) de Perú. Se utiliza de forma obligatoria para la contabilidad, cálculo de impuestos, facturación electrónica y declaraciones tributarias en territorio peruano.',
    formula: 'Conversión USD a PEN:\nSoles (PEN) = Dólares (USD) * Tipo de Cambio SUNAT (Compra o Venta)\n\nConversión PEN a USD:\nDólares (USD) = Soles (PEN) / Tipo de Cambio SUNAT (Compra o Venta)',
    example: 'Si recibes una factura de exportación o pago por $1,000 USD y el tipo de cambio SUNAT de Compra del día es S/ 3.750:\nS/ PEN = 1,000 * 3.750 = S/ 3,750.00 soles.',
    legislation: 'Normativa de la SUNAT y Código Tributario de la República del Perú (Resolución de Superintendencia sobre libros contables y Registro de Compras/Ventas en moneda extranjera).',
    faqs: [
      {
        question: '¿Qué es el tipo de cambio SUNAT?',
        answer: 'Es la cotización oficial del dólar estadounidense fijada por la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) en Perú para la conversión de comprobantes y pagos tributarios en moneda extranjera.'
      },
      {
        question: '¿Cuál es el tipo de cambio SUNAT de hoy?',
        answer: 'El tipo de cambio SUNAT varía diariamente de acuerdo a las publicaciones oficiales. Puedes consultar la cotización actualizada de compra y venta en tiempo real arriba en esta calculadora.'
      },
      {
        question: '¿Cuál es el precio de compra y venta del dólar según SUNAT?',
        answer: 'El valor de Compra SUNAT se aplica a la conversión de ingresos o facturas emitidas en dólares, mientras que el valor de Venta SUNAT se aplica al registro de compras, gastos y facturas recibidas en dólares.'
      },
      {
        question: '¿Cómo convertir dólares a soles usando el tipo de cambio SUNAT?',
        answer: 'Multiplica la cantidad de dólares por el tipo de cambio SUNAT del día. Si la operación es un ingreso, usa el tipo de cambio de compra; si es un gasto, usa el de venta.'
      },
      {
        question: '¿Dónde consultar el tipo de cambio oficial en Perú?',
        answer: 'Puedes consultarlo directamente en la página web oficial de la SUNAT o a través de nuestra herramienta actualizada automáticamente.'
      },
      {
        question: '¿El tipo de cambio SUNAT cambia todos los días?',
        answer: 'Sí. De lunes a viernes la SUNAT actualiza diariamente la cotización. Durante los fines de semana y feriados se utiliza la tasa publicada el último día hábil anterior.'
      }
    ],
    tips: [
      'Al emitir comprobantes de pago en dólares en Perú, asegúrate de registrar el tipo de cambio publicado por la SUNAT en la fecha de emisión del comprobante.',
      'Recuerda registrar las variaciones por diferencia de cambio en la contabilidad anual para el cálculo del Impuesto a la Renta de Tercera Categoría.'
    ],
    errors: [
      'Utilizar el tipo de cambio bancario comercial o el paralelo para la declaración de impuestos ante la SUNAT.',
      'Confundir la tasa de compra con la de venta en el Registro de Ventas e Ingresos.'
    ]
  }
};
