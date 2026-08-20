import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IgvPeruClient from './IgvPeruClient';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('calculadora-igv-peru', lang);

  return {
    title: 'Calculadora de IGV Perú 18% | Desglosar y Agregar IGV SUNAT',
    description: 'Calcula el 18% de IGV en Perú. Desglosa el impuesto de un total o agrégalo a la base imponible de forma rápida para comprobantes de pago SUNAT.',
    keywords: [
      'calculadora igv peru',
      'igv peru 18',
      'desglosar igv',
      'calcular igv',
      'igv sunat',
      'sacar el igv de un monto'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: 'Calculadora de IGV Perú 18% | Desglosar y Agregar IGV SUNAT',
      description: 'Calcula el 18% de IGV en Perú. Desglosa el impuesto de un total o agrégalo a la base imponible de forma rápida.',
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function IgvPeruPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/calculadora-igv-peru`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Calculadora de IGV Perú 18%',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Calcula, agrega o desglosa el 18% del Impuesto General a las Ventas (IGV) en Perú.',
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
        name: '¿Cuál es la tasa oficial del IGV en Perú?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La tasa del Impuesto General a las Ventas (IGV) en Perú es del 18%, compuesta por un 16% tributario del IGV y un 2% del Impuesto de Promoción Municipal (IPM).'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo desglosar el IGV de una factura en soles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para desglosar el IGV de un precio total que ya incluye impuestos, divide la cifra total entre 1.18. La diferencia resultante entre el total y la base imponible es el valor del IGV.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué es el crédito fiscal del IGV ante la SUNAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Es el monto del IGV pagado en compras de bienes y servicios vinculados al giro del negocio, el cual se resta del IGV cobrado en las ventas para determinar el impuesto neto a pagar en la declaración mensual.'
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
      { '@type': 'ListItem', position: 2, name: 'Calculadora de IGV Perú', item: pageUrl }
    ]
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header lang={lang} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Calculadora de IGV Perú</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 mb-4 border border-emerald-200 dark:border-emerald-800">
            🇵🇪 Impuestos Perú • SUNAT 18%
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Calculadora de IGV Perú (18%)
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Calcula, agrega o desglosa el 18% del Impuesto General a las Ventas (IGV) en segundos para tus comprobantes electrónicos y liquidaciones de la SUNAT.
          </p>
        </div>

        <IgvPeruClient />

        {/* 500+ Words Article */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              ¿Cómo Funciona el Cálculo del IGV (18%) en el Perú?
            </h2>
            <p>
              El <strong>Impuesto General a las Ventas (IGV)</strong> es un tributo indirecto de alcance nacional que grava el consumo de bienes y servicios contratados o vendidos en el territorio peruano. Se aplica sobre el valor neto o base imponible con una tasa general del <strong>18%</strong>, estructurada por un 16% para el Tesoro Público y un 2% asignado al Impuesto de Promoción Municipal (IPM).
            </p>
            <p>
              En la emisión de comprobantes de pago tributarios de la <strong>SUNAT</strong> (facturas y boletas de venta electrónicas), la normativa exige registrar con precisión la <strong>Base Imponible</strong>, el monto del <strong>IGV</strong> y el <strong>Importe Total</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Las Dos Operaciones Esenciales: Agregar vs. Desglosar IGV
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                  1. Agregar IGV (+18%)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                  Se realiza cuando conoces el valor neto o costo del servicio (Base Imponible) y necesitas añadirle el 18% para cobrar el precio final al cliente.
                </p>
                <code className="text-xs bg-slate-200 dark:bg-slate-800 p-2 rounded block text-center font-mono">
                  Total = Subtotal × 1.18
                </code>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                  2. Desglosar IGV (Dividir entre 1.18)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                  Se aplica cuando dispones del precio total facturado e incluyes impuestos, y deseas conocer exactamente cuánto corresponde a la base imponible y cuánto a la SUNAT.
                </p>
                <code className="text-xs bg-slate-200 dark:bg-slate-800 p-2 rounded block text-center font-mono">
                  Base Imponible = Total / 1.18
                </code>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Ejemplo Práctico Numérico de Cálculo
            </h2>
            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 text-sm space-y-2">
              <strong className="text-blue-900 dark:text-blue-200 font-bold block">Caso A: Tienes un producto de S/ 500 netos</strong>
              <p className="text-xs">IGV (18%) = S/ 500 × 0.18 = S/ 90.00</p>
              <p className="text-xs font-bold">Total Facturado = S/ 500 + S/ 90 = S/ 590.00 PEN</p>

              <hr className="my-3 border-blue-200 dark:border-blue-800" />

              <strong className="text-blue-900 dark:text-blue-200 font-bold block">Caso B: Tienes una boleta final de S/ 1,180.00</strong>
              <p className="text-xs">Base Imponible = S/ 1,180 / 1.18 = S/ 1,000.00</p>
              <p className="text-xs font-bold">IGV Desglosado = S/ 1,180 - S/ 1,000 = S/ 180.00 PEN</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes sobre el IGV en Perú
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Qué comprobantes de pago tributario aplican IGV?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Las Facturas electrónicas desglosan obligatoriamente el IGV. Las Boletas de Venta muestran el precio total incluido IGV. Los Recibos por Honorarios no llevan IGV ya que están sujetos a retención del Impuesto a la Renta de 4ta Categoría.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Cómo consultar la validez de un RUC antes de emitir factura?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Puedes utilizar nuestra herramienta de <Link href="/consulta-ruc-sunat" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Consulta RUC SUNAT</Link> para verificar el estado habido y activo de tu cliente.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red de Herramientas Tributarias y Financieras de Perú
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🇵🇪</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                  <div className="text-xs text-slate-500 font-normal">Cotización oficial del día</div>
                </div>
              </Link>
              <Link href="/tablas-e-indicadores-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Tablas e Indicadores SUNAT</div>
                  <div className="text-xs text-slate-500 font-normal">UIT e indicadores tributarios</div>
                </div>
              </Link>
              <Link href="/consulta-ruc-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Consulta RUC SUNAT</div>
                  <div className="text-xs text-slate-500 font-normal">Validador oficial de RUC</div>
                </div>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
