'use client';

import React, { useState } from 'react';

interface WidgetOption {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  description: string;
  icon: string;
  path: string;
}

const widgetOptions: WidgetOption[] = [
  {
    id: 'dolar-hoy',
    name: 'Widget Dólar Hoy en Perú',
    slug: 'dolar-hoy',
    categorySlug: 'tipo-de-cambio',
    description: 'Cotización en vivo del precio del dólar de compra y venta.',
    icon: '💵',
    path: '/dolar-hoy'
  },
  {
    id: 'iva-mexico',
    name: 'Widget Calculadora de IVA',
    slug: 'calculadora-iva',
    categorySlug: 'sat',
    description: 'Calculadora interactiva para agregar o desglosar el 16% de IVA.',
    icon: '🧾',
    path: '/calculadoras/sat/calculadora-iva'
  },
  {
    id: 'salario-neto',
    name: 'Widget Salario Neto',
    slug: 'calculadora-salario-neto',
    categorySlug: 'nomina',
    description: 'Calculadora de sueldo bruto a neto con retenciones ISR e IMSS.',
    icon: '💼',
    path: '/calculadoras/nomina/calculadora-salario-neto'
  },
  {
    id: 'cetes-directo',
    name: 'Widget Inversión en CETES',
    slug: 'calculadora-cetes',
    categorySlug: 'inversiones',
    description: 'Simulador de rendimientos netos en CETES Directo.',
    icon: '📈',
    path: '/calculadoras/inversiones/calculadora-cetes'
  }
];

export default function WidgetBuilderClient() {
  const [selectedWidget, setSelectedWidget] = useState<WidgetOption>(widgetOptions[0]);
  const [width, setWidth] = useState<string>('100%');
  const [height, setHeight] = useState<string>('500');
  const [copied, setCopied] = useState<boolean>(false);

  const iframeCode = `<iframe 
  src="https://calculadorasat.org${selectedWidget.path}" 
  width="${width}" 
  height="${height}" 
  style="border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;" 
  title="${selectedWidget.name}"
></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(iframeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Widget selection */}
      <div className="lg:col-span-5 space-y-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          1. Elige una Calculadora
        </h2>

        <div className="space-y-2.5">
          {widgetOptions.map((w) => (
            <button
              key={w.id}
              onClick={() => { setSelectedWidget(w); setCopied(false); }}
              className={`w-full text-left p-4 rounded-2xl border transition ${
                selectedWidget.id === w.id
                  ? 'bg-violet-50/80 dark:bg-violet-950/40 border-violet-500 dark:border-violet-400 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{w.icon}</span>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm">
                  {w.name}
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                {w.description}
              </p>
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            2. Ajusta las Dimensiones
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 font-bold mb-1">Ancho (Width)</label>
              <input
                type="text"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="100%"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 font-bold mb-1">Alto (Height en px)</label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="500"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippet & Preview */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              3. Copia el Código HTML iFrame
            </h3>
            <button
              onClick={handleCopy}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-sm transition"
            >
              {copied ? '✅ ¡Copiado!' : '📋 Copiar Código'}
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            <code>{iframeCode}</code>
          </pre>
        </div>

        {/* Live iFrame Preview Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="font-extrabold text-sm text-slate-500 uppercase tracking-wider mb-4">
            Vista Previa en Vivo
          </h3>
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2">
            <iframe
              src={selectedWidget.path}
              width="100%"
              height="450"
              className="w-full border-0 rounded-xl"
              title={selectedWidget.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
