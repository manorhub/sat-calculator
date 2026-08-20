import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import SolventarObligacionesClient from './SolventarObligacionesClient';
import { getSunatExchangeRate } from '@/lib/sunat-exchange-rate';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const canonicalUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/tipo-de-cambio-para-solventar-obligaciones`;

  return {
    title: 'Tipo de Cambio para Solventar Obligaciones | SUNAT',
    description: 'Calcula y consulta el tipo de cambio utilizado para convertir montos relacionados con obligaciones en Perú.',
    keywords: [
      'tipo de cambio para solventar obligaciones',
      'tipo de cambio para pagos',
      'tipo de cambio SUNAT para obligaciones',
      'tipo de cambio para obligaciones',
      'tipo de cambio dólar para pagos'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Tipo de Cambio para Solventar Obligaciones | SUNAT',
      description: 'Calcula y consulta el tipo de cambio utilizado para convertir montos relacionados con obligaciones en Perú.',
      url: canonicalUrl,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function SolventarObligacionesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/tipo-de-cambio-para-solventar-obligaciones`;

  const initialRate = await getSunatExchangeRate();

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Tipo de Cambio para Solventar Obligaciones en Perú',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Calcula y consulta el tipo de cambio utilizado para convertir montos relacionados con obligaciones en Perú.',
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
        name: '¿Qué significa solventar obligaciones en moneda extranjera?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En el marco legal y fiscal peruano, solventar obligaciones implica cancelar deudas, pagos contractuales o tributos fijados en moneda extranjera mediante la conversión legalmente aplicable a soles peruanos (PEN).'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué tipo de cambio de la SUNAT se aplica para el pago de tributos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Según las normas tributarias de Perú, para liquidar obligaciones y tributos se utiliza el tipo de cambio oficial publicado por la SUNAT en la fecha de realización o exigibilidad de la operación.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Se aplica la tasa de compra o la tasa de venta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para obligaciones de gastos, compras o pagos se aplica el tipo de cambio de Venta SUNAT. Para ingresos y cobranzas registradas se aplica la cotización de Compra SUNAT.'
        }
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://calculadorasat.org',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tipo de Cambio SUNAT',
        item: 'https://calculadorasat.org/tipo-de-cambio-sunat',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Solventar Obligaciones',
        item: pageUrl,
      },
    ],
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
            <Link href="/tipo-de-cambio-sunat" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
              ← Tipo de Cambio SUNAT
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
          <Link href="/tipo-de-cambio-sunat" className="hover:text-blue-600 transition-colors">Tipo de Cambio SUNAT</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Solventar Obligaciones</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 mb-4 border border-indigo-200 dark:border-indigo-800">
            ⚖️ Normativa Legal y Financiera Perú
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Tipo de Cambio para Solventar Obligaciones
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Calcula el monto exacto en soles o dólares necesario para cancelar compromisos tributarios y deudas contractuales en Perú según la cotización oficial SUNAT.
          </p>
        </div>

        <SolventarObligacionesClient initialRate={initialRate} />

        {/* Detailed 500+ Words SEO Content & Legal Framework Article */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              ¿Qué es el Tipo de Cambio para Solventar Obligaciones y Cómo Aplica en Perú?
            </h2>
            <p>
              El <strong>Tipo de Cambio para Solventar Obligaciones</strong> es la tasa oficial de conversión utilizada en el territorio peruano para cancelar deudas, tributos fiscales y obligaciones contractuales pactadas originalmente en moneda extranjera (dólares estadounidenses) mediante su equivalente en moneda nacional (soles peruanos).
            </p>
            <p>
              De acuerdo con el <strong>Artículo 1237 del Código Civil Peruano</strong> y las regulaciones tributarias de la <strong>SUNAT</strong>, un deudor tiene derecho a cancelar una obligación en dólares entregando soles peruanos al tipo de cambio de venta del día y lugar del pago.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Reglas de Aplicación: Pagos Tributarios vs. Contratos Civiles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>🏛️</span> Obligaciones Tributarias ante SUNAT
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Para liquidar impuestos expresados en dólares o calcular retenciones de IGV e Impuesto a la Renta, es de uso obligatorio el <Link href="/tipo-de-cambio-sunat" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Tipo de Cambio SUNAT</Link> de compra o venta según corresponda al tipo de operación.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>📜</span> Obligaciones Civiles y Comerciales
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Para contratos de arrendamiento, compras de bienes o préstamos privados estipulados en dólares, las partes pueden emplear la tasa interbancaria de la SBS o acordar el valor referencial disponible en <Link href="/dolar-hoy" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dólar Hoy en Perú</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes sobre el Pago de Obligaciones en Perú
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Puedo pagar un contrato en soles si fue pactado en dólares?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Sí, en Perú el Código Civil autoriza expresamente cancelar deudas en moneda extranjera entregando su equivalente en soles al tipo de cambio de venta del día del pago salvo pacto expreso en contrario (cláusula de pago efectivo en moneda extranjera).
                </p>
              </div>

              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Cómo convertir de Soles a Dólares o viceversa rápidamente?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Aprovecha nuestros conversores especializados <Link href="/dolares-a-soles" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dólares a Soles</Link> y <Link href="/soles-a-dolares" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Soles a Dólares</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red Completa de Calculadoras del Cluster Cambiario Peruano
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🇵🇪</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                  <div className="text-xs text-slate-500 font-normal">Cotización oficial del día</div>
                </div>
              </Link>

              <Link href="/dolar-hoy" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Dólar Hoy en Perú</div>
                  <div className="text-xs text-slate-500 font-normal">Cotización interbancaria en vivo</div>
                </div>
              </Link>

              <Link href="/precio-del-dolar-en-peru" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Precio del Dólar en Perú</div>
                  <div className="text-xs text-slate-500 font-normal">Análisis económico y cotización</div>
                </div>
              </Link>

              <Link href="/tipo-de-cambio" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio General</div>
                  <div className="text-xs text-slate-500 font-normal">Guía conceptual cambiaria</div>
                </div>
              </Link>

              <Link href="/dolares-a-soles" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">💵</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Dólares a Soles</div>
                  <div className="text-xs text-slate-500 font-normal">Conversor USD → PEN</div>
                </div>
              </Link>

              <Link href="/soles-a-dolares" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Soles a Dólares</div>
                  <div className="text-xs text-slate-500 font-normal">Conversor PEN → USD</div>
                </div>
              </Link>
            </div>
          </section>
        </article>

      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-16 text-center text-xs text-slate-500">
        © 2026 Calculadora SAT. Información de referencia basada en la normativa legal de Perú. No afiliado oficialmente a la SUNAT.
      </footer>
    </div>
  );
}
