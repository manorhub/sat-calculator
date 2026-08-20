import { CalculatorConfig } from '../../types/calculator';

export const semanasCotizadasImssCalculator: CalculatorConfig = {
  id: 'semanas-cotizadas-imss',
  title: 'Calculadora de Semanas Cotizadas y Pensión IMSS',
  shortDescription: 'Estima tus semanas cotizadas en el IMSS, Salario Diario Integrado (SDI) y pensión estimada bajo la Ley 73 o Ley 97.',
  category: 'Nómina',
  categorySlug: 'nomina',
  slug: 'calculadora-semanas-cotizadas-imss',
  seo: {
    metaTitle: 'Semanas Cotizadas IMSS y Pensión Ley 73 | Calculadora 2026',
    metaDescription: 'Calcula tus semanas cotizadas en el IMSS, Salario Diario Integrado (SDI) y simula tu pensión estimada por vejez o cesantía.',
    keywords: [
      'semanas cotizadas imss',
      'semanas cotizadas',
      'pensión imss ley 73',
      'calcular semanas imss',
      'salario diario integrado imss'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'anos_trabajados',
      label: 'Años Trabajados Cotizando al IMSS',
      type: 'number',
      defaultValue: 15,
      placeholder: '15'
    },
    {
      id: 'salario_diario',
      label: 'Salario Diario Promedio (MXN)',
      type: 'number',
      defaultValue: 600,
      placeholder: '600'
    },
    {
      id: 'edad_retiro',
      label: 'Edad de Retiro Planeada',
      type: 'number',
      defaultValue: 65,
      placeholder: '60 a 65'
    },
    {
      id: 'ley_imss',
      label: 'Régimen de Ley IMSS',
      type: 'select',
      defaultValue: 'ley73',
      options: [
        { label: 'Ley 73 (Cotizó antes del 1 de julio de 1997)', value: 'ley73' },
        { label: 'Ley 97 (Cotizó a partir del 1 de julio de 1997)', value: 'ley97' }
      ]
    }
  ],
  calculate: (inputs) => {
    const anos = parseFloat(inputs.anos_trabajados) || 0;
    const salarioDiario = parseFloat(inputs.salario_diario) || 0;
    const edad = parseFloat(inputs.edad_retiro) || 65;
    const ley = inputs.ley_imss || 'ley73';

    // 1 year = 52 weeks
    const semanasEstimadas = Math.round(anos * 52);

    // Percentage of pension based on retirement age (Cesantía/Vejez)
    let porcentajeEdad = 1.0;
    if (edad <= 60) porcentajeEdad = 0.75;
    else if (edad === 61) porcentajeEdad = 0.80;
    else if (edad === 62) porcentajeEdad = 0.85;
    else if (edad === 63) porcentajeEdad = 0.90;
    else if (edad === 64) porcentajeEdad = 0.95;
    else porcentajeEdad = 1.0;

    let pensionMensual = 0;
    if (ley === 'ley73') {
      // Ley 73 formula estimate based on average daily wage and years of service
      const salarioMensualPromedio = salarioDiario * 30.4;
      const factorSemanas = Math.min(1.5, 0.4 + (semanasEstimadas / 1250));
      pensionMensual = salarioMensualPromedio * factorSemanas * porcentajeEdad;
    } else {
      // Ley 97 AFORE estimate based on accumulated capital
      const salarioMensualPromedio = salarioDiario * 30.4;
      pensionMensual = salarioMensualPromedio * 0.35 * porcentajeEdad;
    }

    const minSemanasReq = ley === 'ley73' ? 500 : 825; // 825 weeks required for 2026 under Ley 97

    return {
      results: [
        {
          label: 'Semanas Cotizadas Estimadas',
          value: semanasEstimadas,
          formatted: `${semanasEstimadas} semanas`
        },
        {
          label: 'Semanas Mínimas Requeridas',
          value: minSemanasReq,
          formatted: `${minSemanasReq} semanas (${ley === 'ley73' ? 'Ley 73' : 'Ley 97'})`
        },
        {
          label: 'Pensión Mensual Estimada',
          value: pensionMensual,
          formatted: `$${pensionMensual.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`,
          isMain: true
        }
      ],
      steps: [
        {
          description: `Cálculo estimado para ${anos} años de cotización (${semanasEstimadas} semanas) a la edad de ${edad} años bajo el régimen ${ley.toUpperCase()}.`,
          mathFormula: `Semanas = ${anos} \\times 52 = ${semanasEstimadas}\\ semanas`
        }
      ]
    };
  },
  content: {
    explanation: 'Las semanas cotizadas ante el IMSS representan el tiempo total que un trabajador con empleo formal ha estado registrado ante el Seguro Social.',
    formula: 'Semanas Cotizadas = Años Trabajados × 52 semanas',
    example: 'Si trabajaste 10 años en empleos formales registrados ante el IMSS: 10 × 52 = 520 semanas cotizadas.',
    legislation: 'Ley del Seguro Social (Régimen 1973 y Régimen 1997).',
    faqs: [
      {
        question: '¿Cuántas semanas necesito para pensionarme por la Ley 73?',
        answer: 'Bajo la Ley de 1973 (trabajadores que comenzaron a cotizar antes del 1 de julio de 1997), se requieren al menos 500 semanas cotizadas y tener mínimo 60 años de edad.'
      },
      {
        question: '¿Cuántas semanas necesito para pensionarme por la Ley 97?',
        answer: 'Bajo la Ley de 1997, para el año 2026 se requieren 825 semanas cotizadas (el requisito incrementa 25 semanas cada año hasta llegar a 1,000 semanas en 2031).'
      }
    ],
    tips: ['Solicita tu Constancia de Semanas Cotizadas en el portal oficial del IMSS (imss.gob.pe) con tu CURP y NSS.'],
    errors: ['Confundir semanas cotizadas con años de trabajo sin registro formal ante el IMSS.']
  }
};
