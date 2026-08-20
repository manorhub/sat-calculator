import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SolesADolaresClient from '../calculadora-soles-a-dolares/SolesADolaresClient';
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
  const seoAlternates = getSeoAlternates('soles-a-dolares', lang);

  return {
    title: 'Soles a Dólares: Calculadora PEN a USD',
    description: 'Convierte soles peruanos a dólares estadounidenses en tiempo real usando el tipo de cambio del mercado o la cotización oficial SUNAT.',
    keywords: [
      'soles a dólares',
      'cambio de soles a dólares',
      'PEN a USD',
      'convertir soles a dólares'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: 'Soles a Dólares: Calculadora PEN a USD',
      description: 'Convierte soles peruanos a dólares estadounidenses en tiempo real usando el tipo de cambio del mercado o la cotización oficial SUNAT.',
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function SolesADolaresPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/soles-a-dolares`;

  const initialRate = await getSunatExchangeRate();

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Calculadora Soles a Dólares (PEN a USD)',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Convierte soles peruanos a dólares estadounidenses en tiempo real.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://calculadorasat.org' },
      { '@type': 'ListItem', position: 2, name: 'Dólar Hoy', item: 'https://calculadorasat.org/dolar-hoy' },
      { '@type': 'ListItem', position: 3, name: 'Soles a Dólares', item: pageUrl }
    ]
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header lang={lang} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/dolar-hoy" className="hover:text-blue-600 transition-colors">Dólar Hoy</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Soles a Dólares</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 mb-4 border border-emerald-200 dark:border-emerald-800">
            💰 Conversor PEN → USD
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Soles a Dólares: Calculadora PEN a USD
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Convierte soles peruanos a dólares estadounidenses en tiempo real eligiendo entre la cotización del mercado, la tasa SUNAT oficial o un valor personalizado.
          </p>
        </div>

        <SolesADolaresClient initialRate={initialRate} />

        {/* Detailed 500+ Words SEO Content & Guide Section */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              ¿Cómo Funciona la Conversión de Soles a Dólares (PEN a USD) en Perú?
            </h2>
            <p>
              Convertir <strong>soles peruanos (PEN) a dólares estadounidenses (USD)</strong> es una de las operaciones financieras y comerciales más frecuentes en el Perú. Ya sea para realizar compras internacionales, ahorrar en moneda fuerte, pagar deudas contratadas en dólares o contabilizar operaciones tributarias ante la <strong>SUNAT</strong>, comprender exactamente cómo opera el tipo de cambio resulta fundamental para maximizar el valor de tu dinero.
            </p>
            <p>
              Al cambiar de soles a dólares, la entidad financiera, casa de cambio digital o la <strong>SUNAT</strong> aplica el <strong>Tipo de Cambio Venta</strong>. Esto se debe a que estás entregando moneda nacional a cambio de comprar divisas extranjeras.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Diferencia clave: Mercado Interbancario vs. Tipo de Cambio SUNAT
            </h2>
            <p>
              Es muy importante distinguir entre los dos valores de tipo de cambio que conviven en el mercado peruano:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>📈</span> Dólar Mercado / Comercial
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Es el precio real en tiempo real determinado por la oferta y la demanda entre bancos, casas de cambio digitales y el mercado libre. Varía constantemente durante el horario de negociación interbancaria (9:00 a.m. a 1:30 p.m. hora peruana). Puedes consultar la cotización del día en nuestro portal <Link href="/dolar-hoy" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dólar Hoy en Perú</Link>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>🏛️</span> Tipo de Cambio SUNAT
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Es la cotización oficial publicada diariamente por la Superintendencia Nacional de Aduanas y de Administración Tributaria. Se utiliza exclusivamente para la facturación, cálculo del IGV, Impuesto a la Renta y declaraciones contables. Consulta la tasa oficial en <Link href="/tipo-de-cambio-sunat" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Tipo de Cambio SUNAT</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Fórmula de Conversión y Ejemplo Práctico
            </h2>
            <p>
              La fórmula matemática estándar para convertir un monto de Soles (PEN) a Dólares (USD) es:
            </p>

            <div className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm text-center border border-slate-800">
              Monto en Dólares (USD) = Monto en Soles (PEN) / Tipo de Cambio Venta (PEN/USD)
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 text-sm space-y-2">
              <strong className="text-blue-900 dark:text-blue-200 font-bold block">Ejemplo Práctico de Conversión:</strong>
              <p>
                Si dispones de <strong>S/ 1,000 PEN</strong> y el tipo de cambio venta en el mercado es de <strong>3.750 PEN por USD</strong>:
              </p>
              <p className="font-mono text-xs text-blue-700 dark:text-blue-300">
                USD = S/ 1,000 / 3.750 = $ 266.67 USD
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Al realizar la operación obtendrás exactamente $266.67 dólares americanos.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes sobre la Conversión Soles a Dólares
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Cuál tasa debo usar si voy a comprar dólares en el banco o casa de cambio?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Debes utilizar el <strong>Tipo de Cambio Venta del Mercado</strong>. Los bancos y entidades cambiarias venden divisas aplicando su margen comercial de venta sobre el valor interbancario.
                </p>
              </div>

              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Qué tasa se usa para tributos y deudas con el Estado Peruano?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Para deudas u obligaciones fiscales contratadas en moneda extranjera debes apoyarte en nuestra calculadora de <Link href="/tipo-de-cambio-para-solventar-obligaciones" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Tipo de Cambio para Solventar Obligaciones</Link>.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Cuándo cambia el tipo de cambio oficial de la SUNAT?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  La SUNAT publica diariamente el tipo de cambio oficial de compra y venta en las mañanas, tomando como referencia la cotización de cierre del día hábil anterior reportada por la SBS.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Explora la Red Completa de Calculadoras de Divisas en Perú
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/dolares-a-soles" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">💵</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Dólares a Soles</div>
                  <div className="text-xs text-slate-500 font-normal">Calculadora interactiva USD → PEN</div>
                </div>
              </Link>

              <Link href="/dolar-hoy" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Dólar Hoy en Perú</div>
                  <div className="text-xs text-slate-500 font-normal">Cotización interbancaria en vivo</div>
                </div>
              </Link>

              <Link href="/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🇵🇪</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                  <div className="text-xs text-slate-500 font-normal">Cotización oficial del día</div>
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
                <span className="text-2xl">💱</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio General</div>
                  <div className="text-xs text-slate-500 font-normal">Guía cambiaria integral</div>
                </div>
              </Link>

              <Link href="/tipo-de-cambio-para-solventar-obligaciones" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Solventar Obligaciones</div>
                  <div className="text-xs text-slate-500 font-normal">Referencia legal de pago de deudas</div>
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
