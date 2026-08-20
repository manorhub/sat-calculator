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

        {/* Detailed 500+ Words SEO Content & Comprehensive Guide Section */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              ¿Qué es el Tipo de Cambio y Cómo Funciona en el Perú?
            </h2>
            <p>
              El <strong>tipo de cambio</strong> es el precio de una moneda expresado en términos de otra. En el caso del Perú, la paridad cambiaria de mayor relevancia económica y financiera es el par <strong>USD/PEN</strong>, que representa la cantidad de <strong>soles peruanos</strong> requeridos para comprar un <strong>dólar estadounidense</strong>.
            </p>
            <p>
              En el territorio peruano rige un esquema cambiario de <strong>flotación administrada</strong> impulsado por el Banco Central de Reserva del Perú (BCRP). Bajo este sistema, el valor del dólar se determina por la oferta y la demanda del mercado libre, aunque el BCRP interviene de forma oportuna para mitigar volatilidades extremas y asegurar la estabilidad macroeconómica nacional.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Diferencia Fundamental: Tipo de Cambio Compra vs. Venta
            </h2>
            <p>
              Cualquier entidad que opera en el mercado cambiaría (bancos comerciales, casas de cambio digitales y cambistas) publica dos precios diferentes:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>🟢</span> Tipo de Cambio Compra (Bid)
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Es la cotización a la cual la entidad financiera te compra tus dólares. Si tienes dólares en efectivo o en tu cuenta y deseas cambiarlos a soles, la entidad aplicará el precio de compra. Para convertir dólares a soles, utiliza nuestra herramienta <Link href="/dolares-a-soles" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dólares a Soles</Link>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>🔴</span> Tipo de Cambio Venta (Ask)
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Es la cotización a la cual la entidad financiera te vende los dólares. Si tienes soles y deseas adquirir dólares americanos, la entidad aplicará el precio de venta. Para calcular esta conversión, usa nuestro simulador <Link href="/soles-a-dolares" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Soles a Dólares</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Factores Macroeconómicos que Influyen en el Precio del Dólar en Perú
            </h2>
            <p>
              El precio del dólar en el Perú se ve afectado por factores internacionales y locales:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Precio Internacional del Cobre y Minería:</strong> El cobre es el principal producto de exportación del Perú. Precios elevados del cobre generan un mayor flujo de divisas (dólares) al país, fortaleciendo el Sol peruano.
              </li>
              <li>
                <strong>Decisiones de la Reserva Federal (Fed) de EE.UU.:</strong> El incremento de las tasas de interés por parte de la Fed atrae capitales globales hacia activos denominados en dólares, elevando la cotización del billete verde a nivel mundial.
              </li>
              <li>
                <strong>Intervención Cambiaria del BCRP:</strong> El BCRP interviene vendiendo dólares en el mercado spot o emitiendo certificados de depósito reajustables (CDBCRP) para amortiguar picos repentinos de alza o caída del dólar.
              </li>
              <li>
                <strong>Obligaciones Tributarias ante la SUNAT:</strong> En fechas de vencimiento de impuestos ante la <Link href="/tipo-de-cambio-sunat" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">SUNAT</Link>, las empresas demandan mayores montos en Soles para cumplir con sus declaraciones, influyendo temporalmente en la liquidez cambiaria.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes sobre el Tipo de Cambio en Perú
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Por qué el Tipo de Cambio SUNAT difiere del Mercado Interbancario?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  El mercado interbancario fluctúa en tiempo real según las negociaciones de los bancos. El <Link href="/tipo-de-cambio-sunat" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Tipo de Cambio SUNAT</Link> es una tasa oficial fijada diariamente para fines exclusivamente tributarios y contables.
                </p>
              </div>

              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Dónde puedo ver la cotización del dólar en vivo hoy?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Puedes consultar los valores en vivo de compra, venta y variación del mercado en nuestra página especializada de <Link href="/dolar-hoy" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dólar Hoy en Perú</Link>.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Qué tasa se aplica para el pago de deudas y deudas contractuales?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Para la liquidación formal de deudas en moneda extranjera según el Código Civil Peruano, se debe consultar el <Link href="/tipo-de-cambio-para-solventar-obligaciones" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Tipo de Cambio para Solventar Obligaciones</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Directorio de Herramientas y Calculadoras Cambiarias en Perú
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
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
                  <div className="text-xs text-slate-500 font-normal">Análisis macroeconómico</div>
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
                <span className="text-2xl">🏛️</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Solventar Obligaciones</div>
                  <div className="text-xs text-slate-500 font-normal">Tasa para cancelación de deudas</div>
                </div>
              </Link>
            </div>
          </section>
        </article>

      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-16 text-center text-xs text-slate-500">
        © 2026 Calculadora SAT. Guía educativa e informativa sobre divisas y tipo de cambio en Perú.
      </footer>
    </div>
  );
}
