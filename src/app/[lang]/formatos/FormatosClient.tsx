'use client';

import React, { useState } from 'react';

interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  content: string;
}

const templates: Template[] = [
  {
    id: 'renuncia-voluntaria',
    title: 'Carta de Renuncia Voluntaria',
    category: 'Empleado / Trabajador',
    description: 'Plantilla formal de renuncia libre de responsabilidad patronal según la Ley Federal del Trabajo.',
    icon: '📝',
    content: `CARTA DE RENUNCIA VOLUNTARIA

[Lugar y Fecha]

[Nombre de la Empresa o Patrón]
[Dirección de la Empresa]
Atn: Departamento de Recursos Humanos / Dirección General

Por medio de la presente, me dirijo a ustedes para hacer de su conocimiento mi decisión personal y voluntaria de RESINAR de manera irrevocable al puesto de [Nombre del Cargo] que he venido desempeñando en esta empresa desde el día [Fecha de Inicio].

Hago constar expresamente que durante el tiempo que presté mis servicios para esta empresa, se me pagaron puntualmente todos y cada uno de mis salarios, horas extras, aguinaldos, vacaciones, prima vacacional y demás prestaciones a las que tuve derecho conforme a la ley y a mi contrato de trabajo, sin que se me deba cantidad alguna por ningún concepto.

Agradezco de antemano las atenciones brindadas durante mi estancia laboral en la organización.

Atentamente,

____________________________________
[Nombre Completo del Trabajador]
RFC: [RFC del Trabajador]
NSS: [Número de Seguro Social]
Firma y Huella Digital`
  },
  {
    id: 'recibo-finiquito',
    title: 'Recibo de Finiquito y Liquidación',
    category: 'Empresa / RH / Patrón',
    description: 'Documento comprobatorio del desglose y pago de conceptos de finiquito o indemnización laboral.',
    icon: '💰',
    content: `RECIBO DE FINIQUITO Y LIQUIDACIÓN

Monto Total: $ [Monto Neto Total] MXN
Fecha: [Fecha de Emisión]

RECIBÍ de la empresa [Nombre o Razón Social de la Empresa], la cantidad de $ [Monto Neto Total] ([Monto en Letras] PESOS 00/100 M.N.), por concepto de FINIQUITO Y LIQUIDACIÓN TOTAL de la relación de trabajo que nos unía, desglosado de la siguiente manera:

- Partes proporcionales de Aguinaldo: $ [Monto Aguinaldo]
- Vacaciones no disfrutadas: $ [Monto Vacaciones]
- Prima Vacacional (25%): $ [Monto Prima Vacacional]
- Prima de Antigüedad (si aplica): $ [Monto Prima Antigüedad]
- Menos Retención ISR: - $ [Monto ISR]
------------------------------------------------------
TOTAL NETO RECIBIDO: $ [Monto Neto Total]

Con la firma del presente documento, otorgo el más amplio finiquito que en derecho proceda, manifestando que no se me adeuda salario ni prestación alguna.

Recibí de Conformidad:

____________________________________
[Nombre y Firma del Trabajador]
NSS: [NSS del Trabajador]`
  },
  {
    id: 'convenio-terminacion',
    title: 'Convenio de Terminación Laboral por Mutuo Acuerdo',
    category: 'Empresa / RH / Patrón',
    description: 'Acuerdo de terminación laboral bilateral de conformidad con el Art. 53 Fracc. I de la LFT.',
    icon: '🤝',
    content: `CONVENIO DE TERMINACIÓN LABORAL POR MUTUO ACUERDO

En la ciudad de [Ciudad], a los [Día] días del mes de [Mes] de [Año], comparecen por una parte el trabajador [Nombre del Trabajador] y por la otra el patrón [Nombre de la Empresa], celebrando el presente convenio de conformidad con los artículos 33 y 53 fracción I de la Ley Federal del Trabajo.

DECLARACIONES:
I. Las partes convienen en dar por terminada la relación laboral de mutuo acuerdo.
II. El patrón entrega en este acto la cantidad neta de $ [Monto Pago] mediante el cheque o transferencia No. [Número de Referencia].
III. El trabajador acepta la cantidad y declara estar pagado de todas sus prestaciones legales.

Firmado para constancia:

___________________________          ___________________________
Patrón / Representante Legal             Trabajador`
  }
];

export default function FormatosClient() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedTemplate.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* List of Templates */}
      <div className="lg:col-span-4 space-y-3">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Selecciona una Plantilla
        </h2>
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => { setSelectedTemplate(tpl); setCopied(false); }}
            className={`w-full text-left p-4 rounded-2xl border transition ${
              selectedTemplate.id === tpl.id
                ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 dark:border-blue-400 shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{tpl.icon}</span>
              <h3 className="font-bold text-slate-950 dark:text-white text-sm">
                {tpl.title}
              </h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
              {tpl.category}
            </span>
            <p className="text-xs text-slate-500 line-clamp-2">
              {tpl.description}
            </p>
          </button>
        ))}
      </div>

      {/* Editor & Content Preview */}
      <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <span>{selectedTemplate.icon}</span>
                <span>{selectedTemplate.title}</span>
              </h2>
              <span className="text-xs text-slate-400">{selectedTemplate.category}</span>
            </div>

            <button
              onClick={handleCopy}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <span>{copied ? '✅ ¡Copiado!' : '📋 Copiar Texto'}</span>
            </button>
          </div>

          <textarea
            readOnly
            value={selectedTemplate.content}
            className="w-full h-[400px] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed focus:outline-none resize-none"
          />
        </div>

        <div className="mt-4 text-xs text-slate-500">
          💡 Puedes copiar el texto y pegarlo directamente en Microsoft Word, Google Docs o bloc de notas para personalizar los corchetes <code>[ ]</code>.
        </div>
      </div>
    </div>
  );
}
