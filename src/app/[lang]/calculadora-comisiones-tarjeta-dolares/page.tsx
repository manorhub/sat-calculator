import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import ComisionesTarjetaClient from './ComisionesTarjetaClient';
import { getMarketExchangeRate } from '@/lib/exchange-rates/market-rate';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const canonicalUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/calculadora-comisiones-tarjeta-dolares`;

  return {
    title: 'Calculadora de Compras en Dólares con Tarjeta | Comisiones Forex',
    description: 'Calcula cuánto te cuesta realmente comprar en dólares con tu tarjeta de crédito o débito bancaria incluyendo el margen cambiario y las comisiones Forex (2% a 5%).',
    keywords: [
      'compras en dolares con tarjeta',
      'comision por cambio de divisa tarjeta',
      'dolar tarjeta peru',
      'comision forex tarjeta de credito',
      'cuanto cobra el banco por comprar en dolares'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Calculadora de Compras en Dólares con Tarjeta | Comisiones Forex',
      description: 'Calcula cuánto te cuesta realmente comprar en dólares con tu tarjeta de crédito o débito bancaria.',
      url: canonicalUrl,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function ComisionesTarjetaPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/calculadora-comisiones-tarjeta-dolares`;

  const marketRate = await getMarketExchangeRate();

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Calculadora de Comisiones por Compras en Dólares con Tarjeta',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Calcula el costo real en moneda local de comprar en dólares con tarjeta bancaria.',
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
        name: '¿Por qué mi banco me cobra un valor más alto al comprar en dólares?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Los bancos aplican su propia cotización de venta en ventanilla (más alta que el mercado interbancario) más una comisión por procesamiento de transacciones internacionales en divisa extranjera (3% a 5%).'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué es la Conversión Dinámica de Moneda (DCC)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Es un servicio ofrecido en pasarelas de pago o puntos de venta extranjeros donde la tienda convierte el monto a tu moneda local en ventanilla. Suele aplicar una tasa cambiaria desfavorable del 5% al 7% por lo que siempre se recomienda pagar en la moneda original (USD).'
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
      { '@type': 'ListItem', position: 2, name: 'Comisiones de Tarjeta en Dólares', item: pageUrl }
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
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Comisiones de Tarjeta en Dólares</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300 mb-4 border border-violet-200 dark:border-violet-800">
            💳 Finanzas Personales & Forex
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Calculadora de Compras en Dólares con Tarjeta
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Descubre cuánto te cuesta realmente comprar en dólares en Amazon, AliExpress o viajes utilizando tu tarjeta bancaria con sus comisiones cambiarias.
          </p>
        </div>

        <ComisionesTarjetaClient defaultRate={marketRate.sellRate} />

        {/* 500+ Words SEO Article */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              ¿Cómo Cobran los Bancos por Compras en Dólares con Tarjeta?
            </h2>
            <p>
              Al realizar compras en dólares estadounidenses (USD) desde tiendas digitales extranjeras como Amazon, PayPal, AliExpress o Shein utilizando una tarjeta emitida en moneda local, el banco efectúa dos recargos principales:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>
                <strong>Margen Cambiario (Spread):</strong> El banco no aplica la tasa interbancaria del mercado, sino su cotización de Venta bancaria de ventanilla (más alta que la del mercado libre).
              </li>
              <li>
                <strong>Comisión por Cambio de Divisa (Forex Fee):</strong> Muchos bancos adicionan un porcentaje sobre el importe facturado (entre 2.5% y 5.0%) por procesar compras internacionales en moneda distinta a la tarjeta.
              </li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Recomendaciones para Ahorrar en Compras en Dólares
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Usa Tarjetas Bimoneda o en Dólares:</strong> Abre una cuenta de ahorro en dólares y fondéala cambiando tu dinero en plataformas o casas de cambio digitales con tasas competitivas antes de realizar la compra.
              </li>
              <li>
                <strong>Rechaza la Conversión Dinámica (DCC):</strong> Al pagar con tarjeta física o pasarela de pago en el extranjero, selecciona siempre pagar en <strong>USD (dólares)</strong> y no en tu moneda local.
              </li>
            </ul>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red Completa de Calculadoras Cambiarias
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/dolar-hoy" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Dólar Hoy en Perú</div>
                  <div className="text-xs text-slate-500 font-normal">Cotización en vivo</div>
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
        © 2026 Calculadora SAT. Herramienta estimativa de comisiones internacionales bancarias.
      </footer>
    </div>
  );
}
