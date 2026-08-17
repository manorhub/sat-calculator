import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import DolarHoyClient from './DolarHoyClient';
import { getMarketExchangeRate } from '@/lib/exchange-rates/market-rate';
import { getSunatExchangeRate } from '@/lib/sunat-exchange-rate';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const canonicalUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/dolar-hoy`;

  return {
    title: 'Dólar Hoy en Perú: Precio del Dólar y Tipo de Cambio',
    description: 'Consulta el dólar hoy en Perú. Precio del dólar de compra y venta en el mercado e información del tipo de cambio SUNAT oficial en tiempo real.',
    keywords: [
      'dolar hoy',
      'dólar hoy',
      'precio del dólar hoy',
      'precio del dolar',
      'precio del dólar',
      'precio dolar',
      'tipo de cambio hoy',
      'cuanto esta el dolar',
      'dólar hoy perú',
      'cotización del dólar'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Dólar Hoy en Perú: Precio del Dólar y Tipo de Cambio',
      description: 'Consulta el dólar hoy en Perú. Precio del dólar de compra y venta en el mercado e información del tipo de cambio SUNAT oficial en tiempo real.',
      url: canonicalUrl,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function DolarHoyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/dolar-hoy`;

  // Server-side fetch live rates
  const marketRate = await getMarketExchangeRate();
  const sunatRate = await getSunatExchangeRate();

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Dólar Hoy en Perú - Cotización y Convertidor USD/PEN',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Consulta el dólar hoy en Perú. Cotización de compra y venta en el mercado e información del tipo de cambio SUNAT oficial.',
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
        name: '¿Cuánto está el dólar hoy en Perú?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `En el mercado interbancario de Perú, la cotización de compra se ubica en S/ ${marketRate.buyRate.toFixed(3)} y la cotización de venta en S/ ${marketRate.sellRate.toFixed(3)}.`
        }
      },
      {
        '@type': 'Question',
        name: '¿Cuál es la diferencia entre el tipo de cambio del mercado y el tipo de cambio SUNAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El tipo de cambio del mercado se actualiza en tiempo real según la oferta y demanda bancaria. El tipo de cambio SUNAT es fijado diariamente por la entidad tributaria para fines de facturación y liquidación de impuestos.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo convertir dólares a soles hoy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Multiplica la cantidad de dólares (USD) por la tasa de cambio de venta o compra según corresponda tu transacción.'
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
      { '@type': 'ListItem', position: 2, name: 'Dólar Hoy en Perú', item: pageUrl }
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
            <Link href="/tipo-de-cambio-sunat" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
              Tipo de Cambio SUNAT →
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
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Dólar Hoy en Perú</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 mb-4 border border-blue-200 dark:border-blue-800">
            🇵🇪 Perú • Cotización en Tiempo Real
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Dólar Hoy en Perú
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Precio del dólar de compra y venta en el mercado peruano, cotización SUNAT oficial y convertidor instantáneo USD / PEN.
          </p>
        </div>

        {/* Main Interactive Client Component (Live Market Rate + Separate SUNAT Card + Converter) */}
        <DolarHoyClient marketRate={marketRate} sunatRate={sunatRate} />

        {/* Informational SEO Content */}
        <section className="mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            ¿Cómo se determina el precio del dólar hoy en Perú?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            El precio del dólar en Perú se define mediante la libre oferta y demanda en el mercado cambiario interbancario y las operaciones en ventanilla de bancos y casas de cambio. Asimismo, el Banco Central de Reserva del Perú (BCRP) interviene con operaciones en el mercado abierto para evitar volatilidad excesiva en el sol peruano.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                1. Cotización del Mercado Interbancario
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Es el valor al cual compran y venden divisas las instituciones financieras comerciales. Varía constantemente durante la jornada bursátil.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                2. Tipo de Cambio SUNAT (Referencial)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Publicado diariamente por la SUNAT para el registro de libros contables, emisión de comprobantes de pago y cálculo de impuestos oficiales.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Topic Cluster Links */}
        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">
            🔗 Cluster de Herramientas de Tipo de Cambio en Perú
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
            <Link href="/precio-del-dolar-en-peru" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Precio del Dólar en Perú</div>
                <div className="text-xs text-slate-500 font-normal">Análisis y factores del dólar</div>
              </div>
            </Link>
            <Link href="/tipo-de-cambio" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio General</div>
                <div className="text-xs text-slate-500 font-normal">Guía conceptual de divisas</div>
              </div>
            </Link>
            <Link href="/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">🇵🇪</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                <div className="text-xs text-slate-500 font-normal">Tasa tributaria oficial</div>
              </div>
            </Link>
            <Link href="/dolares-a-soles" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">💵</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Dólares a Soles</div>
                <div className="text-xs text-slate-500 font-normal">Calculadora USD → PEN</div>
              </div>
            </Link>
            <Link href="/soles-a-dolares" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Soles a Dólares</div>
                <div className="text-xs text-slate-500 font-normal">Calculadora PEN → USD</div>
              </div>
            </Link>
            <Link href="/tipo-de-cambio-para-solventar-obligaciones" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">⚖️</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Solventar Obligaciones</div>
                <div className="text-xs text-slate-500 font-normal">Conversión legal de tributos</div>
              </div>
            </Link>
          </div>
        </section>

      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-16 text-center text-xs text-slate-500">
        © 2026 Calculadora SAT. Información referencial del mercado financiero y tributario en Perú. No afiliado con la SUNAT.
      </footer>
    </div>
  );
}
