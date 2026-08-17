import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import TipoCambioGeneralClient from './TipoCambioGeneralClient';
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
  const canonicalUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/tipo-de-cambio`;

  return {
    title: 'Tipo de Cambio Hoy en Perú: Dólar, Soles y USD/PEN',
    description: 'Aprende qué es el tipo de cambio, diferencia entre precio de compra y venta, tasa del mercado vs SUNAT y cómo calcular conversiones cambiarias.',
    keywords: [
      'tipo de cambio',
      'tipo de cambio hoy',
      'tipo de cambio dolar',
      'tasa de cambio',
      'tipo de cambio peru',
      'tipo de cambio del dólar',
      'tipo de cambio dolar peru'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Tipo de Cambio Hoy en Perú: Dólar, Soles y USD/PEN',
      description: 'Aprende qué es el tipo de cambio, diferencia entre precio de compra y venta, tasa del mercado vs SUNAT y cómo calcular conversiones cambiarias.',
      url: canonicalUrl,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function TipoCambioGeneralPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/tipo-de-cambio`;

  const marketRate = await getMarketExchangeRate();
  const sunatRate = await getSunatExchangeRate();

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Guía del Tipo de Cambio en Perú',
    description: 'Aprende qué es el tipo de cambio, diferencia entre precio de compra y venta, tasa del mercado vs SUNAT y cómo calcular conversiones.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué es el tipo de cambio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El tipo de cambio es la relación de proporción que existe entre el valor de dos divisas (por ejemplo, cuántos soles peruanos equivalen a un dólar estadounidense).'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cuál es la diferencia entre el tipo de cambio SUNAT y el tipo de cambio del mercado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El tipo de cambio del mercado fluctuará en tiempo real en bancos y casas de cambio. El tipo de cambio SUNAT es publicado formalmente una vez al día para liquidación contable y fiscal.'
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
      { '@type': 'ListItem', position: 2, name: 'Tipo de Cambio', item: pageUrl }
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
              ← Dólar Hoy
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
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Tipo de Cambio</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 mb-4 border border-blue-200 dark:border-blue-800">
            🌐 Guía de Divisas y Monedas
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Tipo de Cambio Hoy en Perú
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Aprende qué es el tipo de cambio, cómo funciona la cotización de compra y venta y las diferencias entre el mercado interbancario y el tipo de cambio SUNAT.
          </p>
        </div>

        <TipoCambioGeneralClient marketRate={marketRate} sunatRate={sunatRate} />

        {/* Educational Content */}
        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Conceptos fundamentales sobre el Tipo de Cambio
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Precio de Compra vs Precio de Venta
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                El <strong>precio de compra</strong> es la tasa a la que una entidad financiera te compra tus dólares. El <strong>precio de venta</strong> es la tasa a la que la entidad te vende dólares a ti. La diferencia entre ambos es el spread cambiario.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Mercado Libre vs Tipo de Cambio SUNAT
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                El <strong>mercado libre</strong> fluctúa de forma continua durante las horas bursátiles. El <strong>tipo de cambio SUNAT</strong> es la referencia estandarizada que exige la legislación tributaria peruana para el registro contable y la liquidación de tributos.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">
            🔗 Herramientas relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
            <Link href="/dolar-hoy" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">💵</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Dólar Hoy en Perú</div>
                <div className="text-xs text-slate-500 font-normal">Cotización en tiempo real</div>
              </div>
            </Link>
            <Link href="/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">🇵🇪</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                <div className="text-xs text-slate-500 font-normal">Referencia legal tributaria</div>
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
        © 2026 Calculadora SAT. Guía educativa e informativa sobre divisas y tipo de cambio en Perú.
      </footer>
    </div>
  );
}
