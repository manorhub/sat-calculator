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

        {/* Educational Content Section */}
        <section className="mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">
            ¿Qué significa "Solventar Obligaciones" en el marco legal peruano?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            En Perú, según el Artículo 1237 del Código Civil y las disposiciones del Código Tributario dictadas por la SUNAT, las obligaciones pecuniarias pueden ser pactadas en moneda extranjera. Sin embargo, el deudor conserva siempre la facultad legal de pagar su obligación en moneda nacional (Soles), aplicando el tipo de cambio oficial de la fecha de pago o exigibilidad.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                1. Pagos Tributarios ante SUNAT
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Para el pago de impuestos acumulados o retenciones originadas en comprobantes de moneda extranjera, se utiliza obligatoriamente la cotización publicada por la SUNAT en su portal institucional.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                2. Deudas Comerciales y Bancarias
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                En transacciones comerciales entre particulares o instituciones bancarias, se aplicará el tipo de cambio pactado o la cotización de Venta/Compra del sistema financiero en la fecha efectiva del abono.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Related Cluster Tools */}
        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">
            🔗 Herramientas relacionadas del Cluster SUNAT
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
            <Link href="/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">🇵🇪</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                <div className="text-xs text-slate-500 font-normal">Cotización de Hoy USD/PEN</div>
              </div>
            </Link>
            <Link href="/calculadora-dolares-a-soles" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">💵</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Dólares a Soles</div>
                <div className="text-xs text-slate-500 font-normal">Convertidor USD a PEN</div>
              </div>
            </Link>
            <Link href="/tablas-e-indicadores-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Tablas e Indicadores SUNAT</div>
                <div className="text-xs text-slate-500 font-normal">UIT e indicadores oficiales</div>
              </div>
            </Link>
          </div>
        </section>

      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-16 text-center text-xs text-slate-500">
        © 2026 Calculadora SAT. Información de referencia basada en la normativa legal de Perú. No afiliado oficialmente a la SUNAT.
      </footer>
    </div>
  );
}
