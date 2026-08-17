import { CalculatorConfig } from '../../types/calculator';

/**
 * Checks RUC 11-digit structure and Modulo 11 Checksum for Peru RUC numbers.
 * Valid prefixes in Peru:
 * - 10: Persona Natural con DNI
 * - 15/17: Persona Natural (Carnet Extranjería / Pasaporte)
 * - 20: Persona Jurídica / Empresa
 */
export function validateRucChecksum(ruc: string): { isValid: boolean; message: string; type?: string } {
  const cleanRuc = ruc.trim();
  if (!/^\d{11}$/.test(cleanRuc)) {
    return { isValid: false, message: 'El RUC debe ser un número de exactamente 11 dígitos.' };
  }

  const prefix = cleanRuc.substring(0, 2);
  const validPrefixes = ['10', '15', '16', '17', '20'];
  if (!validPrefixes.includes(prefix)) {
    return { isValid: false, message: 'Prefijo no reconocido en Perú (debe iniciar con 10, 15, 17 o 20).' };
  }

  let typeLabel = 'Persona Natural';
  if (prefix === '20') typeLabel = 'Persona Jurídica (Empresa / Sociedad)';
  if (prefix === '10') typeLabel = 'Persona Natural con Negocio / DNI';

  // Modulo 11 checksum verification
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanRuc[i], 10) * weights[i];
  }

  const remainder = sum % 11;
  let checkDigit = 11 - remainder;
  if (checkDigit === 10) checkDigit = 0;
  if (checkDigit === 11) checkDigit = 1;

  const actualCheckDigit = parseInt(cleanRuc[10], 10);
  const isValid = checkDigit === actualCheckDigit;

  return {
    isValid,
    message: isValid 
      ? `Estructura y dígito verificador del RUC válidos. Categoría: ${typeLabel}.` 
      : 'El dígito de verificación del RUC no coincide con el algoritmo oficial de SUNAT.',
    type: typeLabel
  };
}

export const consultaRucSunatCalculator: CalculatorConfig = {
  id: 'consulta-ruc-sunat',
  title: 'Consulta RUC SUNAT',
  shortDescription: 'Verifica la validez y estructura matemática de un número de RUC en Perú y aprende cómo consultar el padrón oficial de la SUNAT.',
  category: 'Tipo de Cambio',
  categorySlug: 'tipo-de-cambio',
  slug: 'consulta-ruc-sunat',
  seo: {
    metaTitle: 'Consulta RUC SUNAT: Cómo Consultar un RUC',
    metaDescription: 'Aprende cómo consultar un RUC en SUNAT, qué información puedes verificar y dónde realizar la consulta oficial.',
    keywords: [
      'consulta ruc sunat',
      'sunat ruc',
      'ruc sunat',
      'consultar ruc',
      'validar ruc Perú'
    ],
    schemaType: 'Calculator'
  },
  inputs: [
    {
      id: 'ruc_input',
      label: 'Número de RUC (11 dígitos)',
      type: 'number',
      defaultValue: 20100047218,
      placeholder: 'Ej: 20100047218'
    }
  ],
  calculate: (inputs) => {
    const rucStr = String(inputs.ruc_input || '').trim();
    const val = validateRucChecksum(rucStr);

    return {
      results: [
        {
          label: 'Número de RUC Ingresado',
          value: parseFloat(rucStr) || 0,
          formatted: rucStr || '---'
        },
        {
          label: 'Estructura RUC',
          value: val.isValid ? 1 : 0,
          formatted: val.isValid ? 'VÁLIDA' : 'INVÁLIDA'
        },
        {
          label: 'Tipo de Contribuyente Estimado',
          value: val.isValid ? 1 : 0,
          formatted: val.type || 'No identificado',
          isMain: true
        }
      ],
      steps: [
        {
          description: val.message,
          mathFormula: `RUC = ${rucStr} \\rightarrow Modulo\\ 11 = ${val.isValid ? 'VÁLIDO' : 'ERROR'}`
        }
      ]
    };
  },
  content: {
    explanation: 'El Registro Único de Contribuyentes (RUC) es el número de identificación de 11 dígitos asignado por la SUNAT a todas las personas físicas y jurídicas que realizan actividades económicas en Perú. Esta herramienta permite verificar la validez de la estructura numérica según el algoritmo oficial.',
    formula: 'Algoritmo de Validación RUC (Módulo 11):\nPonderación de dígitos = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]\nDígito verificador = 11 - (Suma % 11)',
    example: 'Para un RUC que inicia con 20 (Empresa): 20100047218. Se aplican los pesos de ponderación y se valida que el 11.° dígito coincida exactamente con el residuo del cálculo.',
    legislation: 'Decreto Legislativo N.º 943 (Ley del Registro Único de Contribuyentes de Perú) y resoluciones de la SUNAT.',
    faqs: [
      {
        question: '¿Qué es el RUC?',
        answer: 'Es el código de 11 dígitos que identifica a un contribuyente ante la SUNAT en Perú para efectos de emisión de facturas, pago de tributos y trámites administrativos.'
      },
      {
        question: '¿Cómo consultar el estado oficial de un RUC en SUNAT?',
        answer: 'Puedes realizar la consulta gratuita en el portal oficial de la SUNAT (e-consulta RUC en sunat.gob.pe) ingresando el número de RUC, DNI o la razón social.'
      },
      {
        question: '¿Qué información pública se verifica al consultar un RUC?',
        answer: 'Se puede verificar la razón social, condición del contribuyente (Habido / No Habido), estado (Activo / En baja), régimen tributario y domicilio fiscal.'
      },
      {
        question: '¿Cuáles son los prefijos de RUC en Perú?',
        answer: 'Prefijo 10: Persona Natural con DNI. Prefijos 15/17: Persona Natural extranjera. Prefijo 20: Personas Jurídicas (Empresas y Sociedades).'
      }
    ],
    tips: [
      'Antes de realizar compras o emitir pagos a un proveedor en Perú, verifica que su RUC figure en estado ACTIVO y condición HABIDO en el portal oficial de la SUNAT.',
      'Nota: Esta plataforma es una guía informativa y validador de estructura. Para obtener la constancia oficial emitida por SUNAT, ingresa directamente a su sistema e-consulta.'
    ],
    errors: [
      'Aceptar comprobantes de pago de contribuyentes que se encuentren en condición de NO HABIDO o RUC Dado de Baja.'
    ]
  }
};
