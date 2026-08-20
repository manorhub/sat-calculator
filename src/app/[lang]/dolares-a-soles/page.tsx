import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import DolaresASolesClient from '../calculadora-dolares-a-soles/DolaresASolesClient';
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
  const seoAlternates = getSeoAlternates('dolares-a-soles', lang);

  return {
    title: 'Dólares a Soles: Calculadora USD a PEN',
    description: 'Convierte dólares a soles peruanos en tiempo real usando la cotización del mercado, el tipo de cambio SUNAT oficial o una tasa personalizada.',
    keywords: [
      'dólar a soles',
      'dólares a soles',
      'dolares a soles',
      'dólar a soles peruanos',
      'USD a PEN'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: 'Dólares a Soles: Calculadora USD a PEN',
      description: 'Convierte dólares a soles peruanos en tiempo real usando la cotización del mercado, el tipo de cambio SUNAT oficial o una tasa personalizada.',
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function DolaresASolesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/dolares-a-soles`;

  const initialRate = await getSunatExchangeRate();

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Calculadora Dólares a Soles (USD a PEN)',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Convierte dólares a soles peruanos fácilmente en tiempo real.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'PEN',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://calculadorasat.org' },
      { '@type': 'ListItem', position: 2, name: 'Dólar Hoy', item: 'https://calculadorasat.org/dolar-hoy' },
      { '@type': 'ListItem', position: 3, name: 'Dólares a Soles', item: pageUrl }
    ]
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
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
          <Link href="/dolar-hoy" className="hover:text-blue-600 transition-colors">Dólar Hoy</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Dólares a Soles</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 mb-4 border border-blue-200 dark:border-blue-800">
            💵 Conversor USD → PEN
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Dólares a Soles: Calculadora USD a PEN
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Convierte dólares estadounidenses a soles peruanos eligiendo entre el tipo de cambio del mercado, la cotización SUNAT oficial o una tasa personalizada.
          </p>
        </div>

        <DolaresASolesClient initialRate={initialRate} />

        {/* Detailed 500+ Words SEO Content & Guide Section */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              ¿Cómo Convertir Dólares a Soles (USD a PEN) en Perú de Forma Correcta?
            </h2>
            <p>
              Cambiar <strong>dólares estadounidenses (USD) a soles peruanos (PEN)</strong> es una operación diaria para exportadores, freelancers que reciben ingresos del extranjero, familias que cobran remesas y cualquier ciudadano que desea utilizar sus ahorros en divisas para gastos locales en el Perú.
            </p>
            <p>
              Al cambiar de dólares a soles, los bancos, casas de cambio digitales y paralelas te aplicarán el <strong>Tipo de Cambio Compra</strong>. Esto significa que la entidad te "compra" tus dólares y te entrega soles peruanos al valor pactado.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Dólar de Mercado Compra vs. Tipo de Cambio SUNAT Compra
            </h2>
            <p>
              Para optimizar cada transacción cambiaria y evitar pagar impuestos indebidos, es indispensable entender qué cotización aplica según la naturaleza de tu operación:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>💵</span> Dólar Mercado Compra
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Es la tasa real a la que las casas de cambio te compran tus dólares en el mercado financiero. Si buscas vender dólares para obtener soles libres en efectivo o transferencia, debes guiarte por la tasa en vivo disponible en <Link href="/dolar-hoy" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dólar Hoy en Perú</Link>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>🇵🇪</span> SUNAT Compra Oficial
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Es el tipo de cambio fijado por la SUNAT para registrar ventas e ingresos percibidos en dólares. Para emitir comprobantes de pago (facturas o recibos por honorarios electrónica en USD), la SUNAT exige usar la tasa de compra del día de la operación en <Link href="/tipo-de-cambio-sunat" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Tipo de Cambio SUNAT</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Fórmula de Conversión de Dólares a Soles
            </h2>
            <p>
              La fórmula matemática para determinar la cantidad de Soles que recibirás al vender Dólares es:
            </p>

            <div className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm text-center border border-slate-800">
              Monto en Soles (PEN) = Monto en Dólares (USD) × Tipo de Cambio Compra (PEN/USD)
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 text-sm space-y-2">
              <strong className="text-blue-900 dark:text-blue-200 font-bold block">Ejemplo Práctico de Cálculo:</strong>
              <p>
                Si vas a cambiar <strong>$ 500 USD</strong> y el tipo de cambio compra es de <strong>3.740 PEN por USD</strong>:
              </p>
              <p className="font-mono text-xs text-blue-700 dark:text-blue-300">
                PEN = $ 500 × 3.740 = S/ 1,870.00 PEN
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recibirás exactamente S/ 1,870.00 soles en tu cuenta bancaria o en efectivo.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes sobre la Conversión Dólares a Soles
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Cuál es el mejor horario para cambiar dólares a soles en Perú?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  El mejor horario comercial es de lunes a viernes entre las 9:00 a.m. y la 1:30 p.m., ya que el mercado interbancario de divisas se encuentra abierto y las entidades ofrecen sus spreads más competitivos.
                </p>
              </div>

              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Debo emitir factura electrónica en dólares usando la tasa SUNAT de Compra o Venta?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Según la normativa de la SUNAT, las operaciones de ventas o ingresos prestados en dólares deben convertirse a moneda nacional utilizando el <strong>Tipo de Cambio SUNAT de Compra</strong> del día de publicación.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Qué diferencia hay entre este convertidor y la cotización en bancos?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Nuestra calculadora te permite elegir instantáneamente entre la tasa media del mercado interbancario, la tasa SUNAT oficial o ingresar el tipo de cambio exacto que te ofrece tu entidad bancaria.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red Completa de Calculadoras y Cotizaciones en Perú
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/soles-a-dolares" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Soles a Dólares</div>
                  <div className="text-xs text-slate-500 font-normal">Calculadora interactiva PEN → USD</div>
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
