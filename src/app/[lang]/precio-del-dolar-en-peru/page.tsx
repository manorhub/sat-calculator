import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import PrecioDolarPeruClient from './PrecioDolarPeruClient';
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
  const canonicalUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/precio-del-dolar-en-peru`;

  return {
    title: 'Precio del Dólar en Perú Hoy: Cotización USD/PEN',
    description: 'Conoce el precio del dólar en Perú hoy, cotización de compra y venta, factores que influyen en el sol peruano y convertidor de divisas.',
    keywords: [
      'precio del dólar en Perú',
      'precio del dolar peru',
      'precio dólar Perú',
      'dólar en Perú',
      'precio del dólar hoy Perú',
      'cotización del dólar en Perú'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Precio del Dólar en Perú Hoy: Cotización USD/PEN',
      description: 'Conoce el precio del dólar en Perú hoy, cotización de compra y venta, factores que influyen en el sol peruano y convertidor de divisas.',
      url: canonicalUrl,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function PrecioDolarPeruPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/precio-del-dolar-en-peru`;

  const marketRate = await getMarketExchangeRate();
  const sunatRate = await getSunatExchangeRate();

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Precio del Dólar en Perú - Análisis y Cotización USD/PEN',
    description: 'Conoce el precio del dólar en Perú hoy, cotización de compra y venta y los factores macroeconómicos que influyen en la moneda.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué factores influyen en el precio del dólar en Perú?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El precio del dólar en Perú depende de las exportaciones mineras (especialmente del precio del cobre), las decisiones de tasa de interés del BCRP y la Reserva Federal de EE.UU. (FED), y el flujo de inversiones internacionales.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Por qué la tasa de compra y venta del dólar son distintas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La tasa de compra es el valor que los bancos te pagan por tus dólares, mientras que la tasa de venta es el precio al que te venden dólares. La diferencia entre ambas se denomina margen cambiario (spread).'
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
      { '@type': 'ListItem', position: 2, name: 'Dólar Hoy', item: 'https://calculadorasat.org/dolar-hoy' },
      { '@type': 'ListItem', position: 3, name: 'Precio del Dólar en Perú', item: pageUrl }
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
            <Link href="/dolar-hoy" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
              ← Dólar Hoy en Perú
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
          <Link href="/dolar-hoy" className="hover:text-blue-600 transition-colors">Dólar Hoy</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Precio del Dólar en Perú</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 mb-4 border border-indigo-200 dark:border-indigo-800">
            📊 Análisis y Tendencia Financiera Perú
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Precio del Dólar en Perú Hoy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Entiende los determinantes del tipo de cambio USD/PEN, la cotización de compra y venta del mercado interbancario y la referencia SUNAT.
          </p>
        </div>

        {/* Prominent CTA Link to Dólar Hoy */}
        <div className="mb-8 p-4 rounded-2xl bg-blue-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💵</span>
            <div>
              <div className="font-extrabold text-base">¿Buscas la cotización en vivo minuto a minuto?</div>
              <div className="text-xs text-blue-100 font-medium">Ingresa a nuestra herramienta principal de Dólar Hoy en Perú.</div>
            </div>
          </div>
          <Link href="/dolar-hoy" className="px-6 py-2.5 rounded-xl bg-white text-blue-900 font-black text-xs hover:bg-blue-50 transition shadow-sm whitespace-nowrap">
            Ver Dólar Hoy en Vivo →
          </Link>
        </div>

        <PrecioDolarPeruClient marketRate={marketRate} sunatRate={sunatRate} />

        {/* Factors section */}
        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Factores que determinan el precio del dólar en Perú
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-3xl mb-2 block">⛏️</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Precio Internacional del Cobre</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Perú es el segundo productor mundial de cobre. Cuando el precio internacional del cobre sube, ingresan más dólares al país, fortaleciendo el sol peruano.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-3xl mb-2 block">🏛️</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Intervención del BCRP</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                El Banco Central de Reserva del Perú (BCRP) interviene mediante subastas de CDR, swaps cambiarios y venta directa de dólares para reducir la volatilidad.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-3xl mb-2 block">🇺🇸</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Decisiones de la Fed</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Las alzas de tasas de interés por parte de la Reserva Federal de EE.UU. suelen fortalecer al dólar globalmente frente a monedas emergentes como el sol.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Topic Cluster Links */}
        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">
            🔗 Herramientas relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
            <Link href="/dolar-hoy" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">💵</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Dólar Hoy en Perú</div>
                <div className="text-xs text-slate-500 font-normal">Cotización del dólar en vivo</div>
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
              <span className="text-2xl">💱</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Dólares a Soles</div>
                <div className="text-xs text-slate-500 font-normal">Calculadora USD → PEN</div>
              </div>
            </Link>
          </div>
        </section>

      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-16 text-center text-xs text-slate-500">
        © 2026 Calculadora SAT. Información financiera y macroeconómica referencial en Perú.
      </footer>
    </div>
  );
}
