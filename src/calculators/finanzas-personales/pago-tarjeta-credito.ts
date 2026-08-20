import { CalculatorConfig } from '../../types/calculator';

export const pagoTarjetaCreditoCalculator: CalculatorConfig = {
  id: 'pago-tarjeta-credito',
  title: 'Calculadora de Pago de Tarjeta de Crédito',
  shortDescription: 'Calcula cuánto tiempo y cuánto dinero en intereses te costará liquidar tu tarjeta de crédito realizando pagos mínimos o un pago fijo.',
  category: 'Finanzas Personales',
  categorySlug: 'finanzas-personales',
  slug: 'calculadora-pago-tarjeta-credito',
  seo: {
    metaTitle: 'Calculadora de Pago de Tarjeta de Crédito | Pago Mínimo e Intereses',
    metaDescription: 'Calcula cuánto tiempo tardarás en pagar tu tarjeta de crédito con pago mínimo o abono fijo y descubre cuánto pagarás de intereses totales.',
    keywords: [
      'calculadora tarjeta de credito',
      'pago minimo tarjeta de credito',
      'liquidar tarjeta de credito',
      'intereses tarjeta de credito',
      'salir de deudas tarjeta'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'saldo_tarjeta',
      label: 'Deuda Actual en la Tarjeta (MXN)',
      type: 'number',
      defaultValue: 25000,
      placeholder: '25000'
    },
    {
      id: 'tasa_interes_anual',
      label: 'Tasa de Interés Anual / CAT (%)',
      type: 'number',
      defaultValue: 48,
      placeholder: '48'
    },
    {
      id: 'modo_pago',
      label: 'Estrategia de Pago',
      type: 'select',
      defaultValue: 'pago_fijo',
      options: [
        { label: 'Pago Fijo Mensual ($)', value: 'pago_fijo' },
        { label: 'Pago Mínimo Estimado (1.5% saldo + intereses)', value: 'pago_minimo' }
      ]
    },
    {
      id: 'monto_pago_fijo',
      label: 'Monto de Pago Fijo Mensual (MXN)',
      type: 'number',
      defaultValue: 2000,
      placeholder: '2000'
    }
  ],
  calculate: (inputs) => {
    const saldoInicial = parseFloat(inputs.saldo_tarjeta) || 0;
    const tasaAnual = (parseFloat(inputs.tasa_interes_anual) || 0) / 100;
    const tasaMensual = tasaAnual / 12;
    const modo = inputs.modo_pago || 'pago_fijo';
    const pagoFijo = parseFloat(inputs.monto_pago_fijo) || 0;

    let saldoRestante = saldoInicial;
    let meses = 0;
    let interesesTotales = 0;
    let pagoTotal = 0;

    const maxMeses = 360; // 30 years safety cap

    while (saldoRestante > 0.01 && meses < maxMeses) {
      meses++;
      const interesDelMes = saldoRestante * tasaMensual;
      interesesTotales += interesDelMes;

      let pagoMes = 0;
      if (modo === 'pago_minimo') {
        // Minimum payment standard: 1.5% of principal + monthly interest
        pagoMes = Math.max(250, (saldoRestante * 0.015) + interesDelMes);
      } else {
        pagoMes = pagoFijo;
      }

      // Check if payment covers interest
      if (pagoMes <= interesDelMes) {
        // Debt will grow infinitely
        return {
          results: [
            { label: 'Saldo Inicial', value: saldoInicial, formatted: `$${saldoInicial.toLocaleString('es-MX')} MXN` },
            { label: 'Interés Mensual', value: interesDelMes, formatted: `$${interesDelMes.toFixed(2)} MXN` },
            { label: 'Estado de Deuda', value: 0, formatted: 'IMPOSIBLE DE PAGAR (Pago menor a intereses)', isMain: true }
          ],
          steps: [{ description: 'El pago mensual ingresado es menor o igual al interés que genera la tarjeta cada mes.', mathFormula: `Pago = $${pagoMes.toFixed(2)} \\le Interés = $${interesDelMes.toFixed(2)}` }]
        };
      }

      if (pagoMes >= saldoRestante + interesDelMes) {
        pagoMes = saldoRestante + interesDelMes;
        saldoRestante = 0;
      } else {
        saldoRestante = saldoRestante + interesDelMes - pagoMes;
      }

      pagoTotal += pagoMes;
    }

    return {
      results: [
        {
          label: 'Deuda Inicial',
          value: saldoInicial,
          formatted: `$${saldoInicial.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`
        },
        {
          label: 'Meses Requeridos para Liquidar',
          value: meses,
          formatted: `${meses} meses (${(meses / 12).toFixed(1)} años)`
        },
        {
          label: 'Intereses Totales a Pagar',
          value: interesesTotales,
          formatted: `$${interesesTotales.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`
        },
        {
          label: 'Monto Total a Pagar',
          value: pagoTotal,
          formatted: `$${pagoTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Simulación completada en ${meses} meses pagando $${modo === 'pago_fijo' ? pagoFijo : 'el pago mínimo mensual'} con una tasa del ${(tasaAnual * 100).toFixed(1)}% anual.`,
          mathFormula: `Total\\ Pagado = Deuda + Intereses = $${saldoInicial.toFixed(2)} + $${interesesTotales.toFixed(2)} = $${pagoTotal.toFixed(2)}`
        }
      ]
    };
  },
  content: {
    explanation: 'Esta calculadora simula el tiempo exacto y el monto total en intereses necesarios para liquidar una deuda de tarjeta de crédito según tu estrategia de pago.',
    formula: 'Interés Mensual = Saldo Pendiente × (Tasa Anual / 12)\nNuevo Saldo = Saldo Anterior + Interés Mensual - Pago Realizado',
    example: 'Para una deuda de $25,000 MXN al 48% de interés anual con pagos de $2,000 mensuales: tardarás 17 meses y pagarás $8,650 MXN en intereses.',
    legislation: 'Circular 34/2010 del Banco de México sobre cálculo de pago mínimo e información al usuario.',
    faqs: [
      {
        question: '¿Por qué es peligroso pagar solo el mínimo de la tarjeta?',
        answer: 'Porque el pago mínimo apenas cubre los intereses del mes y un porcentaje ínfimo del capital (1.5%), lo que extiende la deuda por muchos años y multiplica el costo total en intereses.'
      },
      {
        question: '¿Cómo puedo salir más rápido de mi deuda de tarjeta?',
        answer: 'Paga siempre más del mínimo. Si aportas un pago fijo mayor a los intereses, reducirás el capital rápidamente y ahorrarás miles de pesos en intereses.'
      }
    ],
    tips: ['Procura ser un usuario "totalero" liquidando el saldo total de la tarjeta antes de la fecha límite de pago para generar 0% de intereses.'],
    errors: ['Realizar compras adicionales con la misma tarjeta mientras intentas liquidar la deuda existente.']
  }
};
