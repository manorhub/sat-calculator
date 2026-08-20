import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import PrecioDolarPeruClient from './PrecioDolarPeruClient';
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
  const seoAlternates = getSeoAlternates('precio-del-dolar-en-peru', lang);

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
    alternates: seoAlternates,
    openGraph: {
      title: 'Precio del Dólar en Perú Hoy: Cotización USD/PEN',
      description: 'Conoce el precio del dólar en Perú hoy, cotización de compra y venta, factores que influyen en el sol peruano y convertidor de divisas.',
      url: seoAlternates.canonical,
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

        {/* Detailed 500+ Words SEO Content & Macroeconomic Analysis */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Análisis del Precio del Dólar en Perú y Factores Determinantes
            </h2>
            <p>
              El <strong>precio del dólar en el Perú</strong> refleja la salud macroeconómica del país y su nivel de integración con los mercados globales. La economía peruana es una de las economías más sólidas de América Latina en términos cambiarios gracias a las elevadas reservas internacionales netas acumuladas por el Banco Central de Reserva del Perú (BCRP).
            </p>
            <p>
              Sin embargo, fluctuaciones diarias en el precio del dólar impactan directamente en el costo de productos importados, combustibles, insumos agrícolas, créditos en moneda extranjera y tarifas de servicios.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Factores Fundamentales que Afectan el Precio del Dólar en Perú
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-3xl mb-2 block">⛏️</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Precio del Cobre y Minería</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Perú es el segundo mayor exportador mundial de cobre. Precios elevados del mineral aumentan el flujo de dólares al país, incrementando la oferta cambiaria y apreciando el Sol.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-3xl mb-2 block">🏛️</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Intervención del BCRP</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  El BCRP realiza intervenciones directas en el mercado cambiario spot y emite Certificados de Depósito Reajustables (CDBCRP) para amortiguar picos de volatilidad.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-3xl mb-2 block">🇺🇸</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Tasas de la Fed de EE.UU.</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Decisiones de la Reserva Federal de aumentar o recortar tipos de interés alteran el valor global del billete verde a nivel internacional.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              ¿Cómo afectan la Cotización Compra y Venta a tu Dinero?
            </h2>
            <p>
              Al realizar transacciones cambarias en bancos o casas de cambio digitales se aplican dos valores:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Tasa de Compra (Bid):</strong> Es el precio al que la entidad cambiaria adquiere tus dólares a cambio de soles. Para convertir tus dólares a soles, consulta <Link href="/dolares-a-soles" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dólares a Soles</Link>.
              </li>
              <li>
                <strong>Tasa de Venta (Ask):</strong> Es el precio al que la entidad cambiaria te vende dólares a cambio de soles. Para comprar dólares con tus soles, utiliza <Link href="/soles-a-dolares" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Soles a Dólares</Link>.
              </li>
              <li>
                <strong>Tasa SUNAT Oficial:</strong> Para la emisión de facturas y contabilidad ante la entidad tributaria, consulta <Link href="/tipo-de-cambio-sunat" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Tipo de Cambio SUNAT</Link>.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes sobre la Cotización del Dólar
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Dónde consultar el precio del dólar hoy en vivo?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Puedes ingresar a nuestra página <Link href="/dolar-hoy" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dólar Hoy en Perú</Link> para monitorear el precio de compra y venta interbancario actualizado en tiempo real.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Qué tasa aplica para liquidación de deudas contractuales?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Para deudas u obligaciones expresadas en moneda extranjera según ley peruana, consulta <Link href="/tipo-de-cambio-para-solventar-obligaciones" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Tipo de Cambio para Solventar Obligaciones</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red Completa de Calculadoras Cambiarias en Perú
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/dolar-hoy" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">💵</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Dólar Hoy en Perú</div>
                  <div className="text-xs text-slate-500 font-normal">Cotización en vivo</div>
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
                  <div className="text-xs text-slate-500 font-normal">Cotización oficial del día</div>
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

              <Link href="/tipo-de-cambio-para-solventar-obligaciones" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">⚖️</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Solventar Obligaciones</div>
                  <div className="text-xs text-slate-500 font-normal">Tasa para cancelación de deudas</div>
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
