import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import DolarHoyClient from './DolarHoyClient';
import { getMarketExchangeRate } from '@/lib/exchange-rates/market-rate';
import { getSunatExchangeRate } from '@/lib/sunat-exchange-rate';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}
import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('dolar-hoy', lang);

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
    alternates: seoAlternates,
    openGraph: {
      title: 'Dólar Hoy en Perú: Precio del Dólar y Tipo de Cambio',
      description: 'Consulta el dólar hoy en Perú. Precio del dólar de compra y venta en el mercado e información del tipo de cambio SUNAT oficial en tiempo real.',
      url: seoAlternates.canonical,
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

        {/* Informational SEO Content Section (500+ Words) */}
        <article className="mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Dólar Hoy en Perú: Cotización en Tiempo Real y Análisis del Mercado
            </h2>
            <p>
              El valor del <strong>dólar hoy en el Perú</strong> es una de las variables económicas más consultadas por personas naturales, inversionistas, importadores y emprendedores. Saber cuánto vale el dólar en tiempo real te permite tomar decisiones financieras acertadas al comprar divisas, pagar tarjetas de crédito o realizar inversiones internacionales.
            </p>
            <p>
              En nuestro portal cuentas con información actualizada continuamente del <strong>Mercado Interbancario</strong> y la cotización oficial de la <strong>SUNAT</strong>, permitiéndote comparar ambas referencias de forma transparente sin sesgos ni tarifas ocultas.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Mercado Interbancario vs. Tipo de Cambio SUNAT
            </h2>
            <p>
              Al consultar la cotización del dólar en el Perú es crucial identificar la diferencia entre los dos entornos cambiarios principales:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>📈</span> Cotización del Mercado Interbancario
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Es la tasa real a la que operan los bancos comerciales (BCP, BBVA, Interbank, Scotiabank) y las plataformas de cambio digitales. Fluctúa segundo a segundo en horario bancario de 9:00 a.m. a 1:30 p.m.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>🏛️</span> Tipo de Cambio SUNAT Oficial
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Publicado diariamente por la SUNAT en las primeras horas de la mañana. Sirve como referencia estandarizada y obligatoria para la contabilidad, emisión de facturas electrónicas y declaración tributaria. Consulta los datos históricos en <Link href="/tipo-de-cambio-sunat" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Tipo de Cambio SUNAT</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Factores que Determinan el Precio del Dólar Hoy en el Perú
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Política Monetaria del BCRP:</strong> El Banco Central de Reserva del Perú realiza operaciones de compraventa de dólares spot y subastas de Swaps Cambiarios para moderar volatilidades abruptas.
              </li>
              <li>
                <strong>Mercado Global y Reserva Federal:</strong> Expectativas sobre las tasas de interés de la Fed influyen directamente en la fortaleza global del dólar (Índice DXY).
              </li>
              <li>
                <strong>Exportaciones Mineras (Cobre y Oro):</strong> Mayores precios del cobre inyectan divisas a la economía peruana, apreciando el Sol.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes sobre el Dólar Hoy
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Cómo convertir de Dólares a Soles o viceversa?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Usa nuestros conversores dedicados <Link href="/dolares-a-soles" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dólares a Soles</Link> y <Link href="/soles-a-dolares" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Soles a Dólares</Link> para obtener la cifra exacta en tiempo real.
                </p>
              </div>

              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿A qué hora abre y cierra el mercado cambiario en Perú?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  El mercado interbancario opera de lunes a viernes entre las 9:00 a.m. y la 1:30 p.m. Fuera de ese horario, las tasas suelen congelarse o ampliar su margen de ganancia en ventanillas bancarias.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red Completa de Calculadoras de Divisas en Perú
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
        </article>

      </main>

      <Footer lang={lang} />
    </div>
  );
}
