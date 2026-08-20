import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import QuintaCategoriaClient from './QuintaCategoriaClient';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const canonicalUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/calculadora-quinta-categoria-peru`;

  return {
    title: 'Calculadora Renta de 5ta Categoría 2026 Perú | SUNAT',
    description: 'Calcula la retención mensual del Impuesto a la Renta de 5ta Categoría en Perú deduciendo las 7 UIT vigentes (S/ 37,450 en 2026) y aplicando la escala de la SUNAT.',
    keywords: [
      'calculadora 5ta categoria peru',
      'renta de quinta categoria 2026',
      'impuesto a la renta 5ta categoria',
      'retencion quinta categoria sunat',
      'deduccion 7 uit 2026'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Calculadora Renta de 5ta Categoría 2026 Perú | SUNAT',
      description: 'Calcula la retención mensual del Impuesto a la Renta de 5ta Categoría en Perú deduciendo las 7 UIT vigentes.',
      url: canonicalUrl,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function QuintaCategoriaPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/calculadora-quinta-categoria-peru`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Calculadora de Impuesto a la Renta de Quinta Categoría Perú',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Calcula la retención del Impuesto a la Renta de 5ta Categoría para trabajadores en planilla en Perú.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'PEN',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿A partir de qué sueldo se descuenta Renta de 5ta Categoría en 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En el año 2026, los trabajadores con ingresos anuales proyectados superiores a 7 UIT (S/ 37,450 PEN) quedan sujetos a retención de 5ta Categoría. Esto equivale a un sueldo mensual bruto aproximado de S/ 2,675 PEN.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo se calcula la deducción de las 7 UIT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Se proyecta el ingreso bruto anual (12 sueldos + gratificaciones de julio y diciembre) y se le resta de forma automática la deducción legal de 7 UIT (7 x S/ 5,350 = S/ 37,450 PEN).'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cuáles son los tramos impositivos de la 5ta Categoría?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La tasa progresiva es de 8% (hasta 5 UIT), 14% (de 5 a 20 UIT), 17% (de 20 a 35 UIT), 20% (de 35 a 45 UIT) y 30% para el exceso de 45 UIT.'
        }
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://calculadorasat.org' },
      { '@type': 'ListItem', position: 2, name: 'Renta 5ta Categoría Perú', item: pageUrl }
    ]
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href={lang === 'en' ? '/en' : '/'} className="font-extrabold text-xl text-slate-900 dark:text-white hover:opacity-90 transition">
            Calculadora<span className="text-blue-600">SAT</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/tablas-e-indicadores-sunat" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
              ← Tablas y UIT SUNAT
            </Link>
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Impuesto Renta 5ta Categoría</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 mb-4 border border-indigo-200 dark:border-indigo-800">
            🇵🇪 Planilla y Tributos Perú • UIT 2026 S/ 5,350
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Calculadora Renta de 5ta Categoría 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Estima la retención mensual del Impuesto a la Renta de Quinta Categoría para trabajadores en planilla en Perú.
          </p>
        </div>

        <QuintaCategoriaClient />

        {/* 500+ Words SEO Article */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              ¿Qué es el Impuesto a la Renta de Quinta Categoría en Perú?
            </h2>
            <p>
              El <strong>Impuesto a la Renta de Quinta Categoría</strong> es un tributo directo administrado por la <strong>SUNAT</strong> que se aplica a los ingresos obtenidos por concepto de trabajo personal prestado en relación de dependencia o planilla laboral. Corresponde al empleador actuar como agente de retención y abonar mensualmente dicho monto a la administración tributaria.
            </p>
            <p>
              Para calcular el impuesto, la ley otorga una deducción inafecta equivalente a <strong>7 Unidades Impositivas Tributarias (7 UIT)</strong>. Para el año 2026, fijado el valor de la UIT en <strong>S/ 5,350 PEN</strong>, la deducción inafecta automática haciende a <strong>S/ 37,450 PEN</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Escala Progresiva de Tramos del Impuesto (SUNAT 2026)
            </h2>
            <p>
              Una vez deducidas las 7 UIT del ingreso bruto anual, sobre la <strong>Renta Neta Imponible</strong> restante se aplica la siguiente escala progresiva acumulativa:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white">
                    <th className="p-3">Tramo de Renta Neta</th>
                    <th className="p-3">Rango en UIT</th>
                    <th className="p-3">Monto Límite en Soles (2026)</th>
                    <th className="p-3 text-right">Tasa Impositiva</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="p-3">1° Tramo</td>
                    <td className="p-3">Hasta 5 UIT</td>
                    <td className="p-3">Hasta S/ 26,750</td>
                    <td className="p-3 text-right font-bold text-blue-600">8%</td>
                  </tr>
                  <tr>
                    <td className="p-3">2° Tramo</td>
                    <td className="p-3">Más de 5 hasta 20 UIT</td>
                    <td className="p-3">De S/ 26,750 a S/ 107,000</td>
                    <td className="p-3 text-right font-bold text-blue-600">14%</td>
                  </tr>
                  <tr>
                    <td className="p-3">3° Tramo</td>
                    <td className="p-3">Más de 20 hasta 35 UIT</td>
                    <td className="p-3">De S/ 107,000 a S/ 187,250</td>
                    <td className="p-3 text-right font-bold text-blue-600">17%</td>
                  </tr>
                  <tr>
                    <td className="p-3">4° Tramo</td>
                    <td className="p-3">Más de 35 hasta 45 UIT</td>
                    <td className="p-3">De S/ 187,250 a S/ 240,750</td>
                    <td className="p-3 text-right font-bold text-blue-600">20%</td>
                  </tr>
                  <tr>
                    <td className="p-3">5° Tramo</td>
                    <td className="p-3">Exceso de 45 UIT</td>
                    <td className="p-3">Más de S/ 240,750</td>
                    <td className="p-3 text-right font-bold text-blue-600">30%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Deducciones Adicionales de 3 UIT
            </h2>
            <p>
              Además de las 7 UIT automáticas, los trabajadores pueden deducir hasta <strong>3 UIT adicionales (S/ 16,050 PEN)</strong> sustentando comprobantes electrónicos por:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>30% de gastos en Restaurantes, Hoteles y Bares.</li>
              <li>30% de Servicios Profesionales u Oficios emitidos con Recibo por Honorarios.</li>
              <li>30% del Alquiler de Inmuebles destinados a vivienda.</li>
              <li>100% de Aportes a EsSalud por Trabajadores del Hogar.</li>
            </ul>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red de Herramientas de Planilla y Divisas en Perú
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/tablas-e-indicadores-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Tablas e Indicadores SUNAT</div>
                  <div className="text-xs text-slate-500 font-normal">Valor de la UIT 2026</div>
                </div>
              </Link>
              <Link href="/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🇵🇪</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                  <div className="text-xs text-slate-500 font-normal">Cotización tributaria oficial</div>
                </div>
              </Link>
              <Link href="/dolar-hoy" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">💵</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Dólar Hoy en Perú</div>
                  <div className="text-xs text-slate-500 font-normal">Cotización en vivo</div>
                </div>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-16 text-center text-xs text-slate-500">
        © 2026 Calculadora SAT. Simulación de 5ta Categoría basada en la Ley del Impuesto a la Renta de Perú.
      </footer>
    </div>
  );
}
