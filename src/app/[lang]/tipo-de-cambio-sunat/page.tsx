import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import SunatCalculatorClient from './SunatCalculatorClient';
import { getSunatExchangeRate, getSunatHistoricalRatesList } from '@/lib/sunat-exchange-rate';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}
import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('tipo-de-cambio-sunat', lang);

  return {
    title: 'Tipo de Cambio SUNAT Hoy: Dólar a Soles | Calculadora',
    description: 'Consulta el tipo de cambio SUNAT de hoy, conoce el precio de compra y venta del dólar y convierte USD a soles peruanos fácilmente.',
    keywords: [
      'tipo de cambio SUNAT',
      'tipo de cambio SUNAT hoy',
      'tipo de cambio SUNAT dólar',
      'dólar SUNAT',
      'tipo de cambio dólar sol peruano',
      'tipo de cambio USD PEN',
      'tipo de cambio compra venta SUNAT',
      'tipo de cambio Perú',
      'convertir dólares a soles',
      'convertir soles a dólares'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: 'Tipo de Cambio SUNAT Hoy: Dólar a Soles | Calculadora',
      description: 'Consulta el tipo de cambio SUNAT de hoy, conoce el precio de compra y venta del dólar y convierte USD a soles peruanos fácilmente.',
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function SunatPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/tipo-de-cambio-sunat`;

  // Server-side initial data fetch for fast SSR
  const initialRate = await getSunatExchangeRate();
  const initialHistory = await getSunatHistoricalRatesList();

  // Structured Data (JSON-LD)
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Tipo de Cambio SUNAT Hoy - Convertidor Dólar a Soles',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Consulta el tipo de cambio SUNAT de hoy, conoce el precio de compra y venta del dólar y convierte USD a soles peruanos fácilmente.',
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
        name: '¿Qué es el tipo de cambio SUNAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El tipo de cambio SUNAT es la cotización oficial del dólar estadounidense (USD) con respecto al sol peruano (PEN) publicada por la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) para efectos fiscales, tributarios y contables en Perú.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cuál es el tipo de cambio SUNAT de hoy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `El tipo de cambio SUNAT de hoy (${initialRate.fecha}) es de S/ ${initialRate.compra.toFixed(3)} para compra y S/ ${initialRate.venta.toFixed(3)} para venta.`
        }
      },
      {
        '@type': 'Question',
        name: '¿Cuál es el precio de compra y venta del dólar según SUNAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El precio de Compra SUNAT se utiliza para valuar ingresos y facturas emitidas en dólares, mientras que el precio de Venta SUNAT se aplica a compras, gastos e importaciones efectuadas en dólares.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo convertir dólares a soles usando el tipo de cambio SUNAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para convertir USD a PEN: multiplica el monto en dólares por la tasa de compra (si es ingreso) o venta (si es gasto). Para convertir PEN a USD: divide el monto en soles entre el tipo de cambio SUNAT correspondiente.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Dónde consultar el tipo de cambio oficial en Perú?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Se puede consultar de forma directa e inmediata en el portal oficial de la SUNAT o a través de nuestra herramienta interactiva conectada a las fuentes autorizadas.'
        }
      },
      {
        '@type': 'Question',
        name: '¿El tipo de cambio SUNAT cambia todos los días?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, la SUNAT publica nuevos valores diariamente de lunes a viernes. Para sábados, domingos y feriados se mantiene la cotización publicada el día hábil bancario anterior.'
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
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href={lang === 'en' ? '/en' : '/'} className="font-extrabold text-xl text-slate-900 dark:text-white hover:opacity-90 transition">
            Calculadora<span className="text-blue-600">SAT</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href={lang === 'en' ? '/en' : '/'} className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
              ← {lang === 'en' ? 'Back to Calculators' : 'Regresar al Inicio'}
            </Link>
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-6" aria-label="Breadcrumb">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">
            {lang === 'en' ? 'Home' : 'Inicio'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            Tipo de Cambio SUNAT
          </span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 mb-4 border border-amber-200 dark:border-amber-800">
            🇵🇪 Perú • Cotización Oficial
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Tipo de Cambio SUNAT
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Consulta el tipo de cambio SUNAT de hoy y convierte dólares estadounidenses a soles peruanos fácilmente.
          </p>
        </div>

        {/* Client Calculator Component */}
        <SunatCalculatorClient 
          initialRate={initialRate} 
          initialHistory={initialHistory} 
          lang={lang} 
        />

        {/* Detailed 500+ Words SEO Article & Regulation Guide */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              ¿Qué es el Tipo de Cambio SUNAT y Cómo se Aplica en la Contabilidad en Perú?
            </h2>
            <p>
              El <strong>Tipo de Cambio SUNAT</strong> es el valor oficial de referencia para la conversión entre el <strong>dólar estadounidense (USD) y el sol peruano (PEN)</strong> fijado por la Superintendencia Nacional de Aduanas y de Administración Tributaria. Se establece con base en los cierres del mercado cambiario reportados por la Superintendencia de Banca, Seguros y AFP (SBS).
            </p>
            <p>
              En el Perú, todas las empresas y contribuyentes que realicen transacciones comerciales, facturación electrónica o contabilidad en moneda extranjera están obligados por el Código Tributario a registrar sus operaciones utilizando la tasa SUNAT oficial correspondiente al día de la emisión o pago.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Uso de la Tasa SUNAT: Compra vs. Venta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>🟢</span> Tasa de Compra SUNAT
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Se aplica obligatoriamente para contabilizar <strong>ingresos, cobros y ventas facturadas en dólares</strong>. Permite determinar el valor base imponible del Impuesto General a las Ventas (IGV) y los pagos a cuenta del Impuesto a la Renta. Para operaciones directas de venta de dólares, puedes usar <Link href="/dolares-a-soles" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dólares a Soles</Link>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>🔴</span> Tasa de Venta SUNAT
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Se utiliza para registrar <strong>compras, gastos operativos e importaciones</strong> realizadas en dólares. Para calcular la compra de divisas con soles en efectivo, utiliza <Link href="/soles-a-dolares" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Soles a Dólares</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Reglas de Facturación Electrónica y Diferencia de Cambio
            </h2>
            <p>
              Al emitir un Comprobante de Pago Electrónico (CPE) en dólares, el sistema de facturación de la SUNAT requiere registrar el tipo de cambio oficial del día de emisión. Si el cobro o pago se realiza en una fecha posterior con una cotización distinta, la variación resultante debe ser registrada contablemente como <strong>ganancia o pérdida por diferencia de cambio</strong>.
            </p>
          </section>
        </article>

        {/* FAQ Section */}
        <section className="mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mb-8 text-center">
            Preguntas Frecuentes sobre el Tipo de Cambio SUNAT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-slate-150 dark:border-slate-800 rounded-2xl p-5 bg-slate-50/50 dark:bg-slate-950/50">
              <h3 className="font-bold text-slate-950 dark:text-white text-base mb-2">
                ¿Qué es el tipo de cambio SUNAT?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                El tipo de cambio SUNAT es la tasa oficial de conversión entre el dólar estadounidense (USD) y el sol peruano (PEN) determinada por la Superintendencia Nacional de Aduanas y de Administración Tributaria. Es de uso obligatorio para liquidación de impuestos, libros contables y comprobantes de pago electrónicos en Perú.
              </p>
            </div>

            <div className="border border-slate-150 dark:border-slate-800 rounded-2xl p-5 bg-slate-50/50 dark:bg-slate-950/50">
              <h3 className="font-bold text-slate-950 dark:text-white text-base mb-2">
                ¿Cuál es el tipo de cambio SUNAT de hoy?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                El tipo de cambio varía a diario. Hoy se ubica en <strong className="text-blue-600 dark:text-blue-400">S/ {initialRate.compra > 0 ? initialRate.compra.toFixed(3) : '---'}</strong> para compra y <strong className="text-blue-600 dark:text-blue-400">S/ {initialRate.venta > 0 ? initialRate.venta.toFixed(3) : '---'}</strong> para venta (correspondiente a la fecha {initialRate.fecha}).
              </p>
            </div>

            <div className="border border-slate-150 dark:border-slate-800 rounded-2xl p-5 bg-slate-50/50 dark:bg-slate-950/50">
              <h3 className="font-bold text-slate-950 dark:text-white text-base mb-2">
                ¿Cuál es el precio de compra y venta del dólar según SUNAT?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                La tasa de <strong>Compra SUNAT</strong> aplica a ingresos, cobros y ventas facturadas en moneda extranjera. La tasa de <strong>Venta SUNAT</strong> aplica al registro de facturas de compras, gastos contables e importaciones.
              </p>
            </div>

            <div className="border border-slate-150 dark:border-slate-800 rounded-2xl p-5 bg-slate-50/50 dark:bg-slate-950/50">
              <h3 className="font-bold text-slate-950 dark:text-white text-base mb-2">
                ¿Cómo convertir dólares a soles usando el tipo de cambio SUNAT?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Para dólares a soles (USD → PEN): multiplica la cantidad en USD por el tipo de cambio del día. Para soles a dólares (PEN → USD): divide el monto entre la cotización SUNAT correspondiente.
              </p>
            </div>

            <div className="border border-slate-150 dark:border-slate-800 rounded-2xl p-5 bg-slate-50/50 dark:bg-slate-950/50">
              <h3 className="font-bold text-slate-950 dark:text-white text-base mb-2">
                ¿Dónde consultar el tipo de cambio oficial en Perú?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                En el portal oficial de la SUNAT (<code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">sunat.gob.pe</code>) o a través de nuestra calculadora interactiva que actualiza de manera continua los datos autorizados.
              </p>
            </div>

            <div className="border border-slate-150 dark:border-slate-800 rounded-2xl p-5 bg-slate-50/50 dark:bg-slate-950/50">
              <h3 className="font-bold text-slate-950 dark:text-white text-base mb-2">
                ¿El tipo de cambio SUNAT cambia todos los días?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                La SUNAT actualiza la cotización todos los días hábiles de la semana. Para sábados, domingos y feriados se mantiene vigente el tipo de cambio publicado el último día hábil anterior.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Section - SUNAT Cluster */}
        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6 flex items-center gap-2">
            🔗 Herramientas y Calculadoras del Cluster SUNAT Perú
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/tipo-de-cambio-para-solventar-obligaciones" 
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-md transition bg-slate-50/50 dark:bg-slate-950/50 group"
            >
              <span className="text-2xl mb-2 block">⚖️</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition">
                Tipo de Cambio para Solventar Obligaciones
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Calcula la cotización aplicable para cancelar deudas y tributos en moneda extranjera en Perú.
              </p>
            </Link>

            <Link 
              href="/calculadora-dolares-a-soles" 
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-md transition bg-slate-50/50 dark:bg-slate-950/50 group"
            >
              <span className="text-2xl mb-2 block">💵</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition">
                Calculadora Dólares a Soles (USD → PEN)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Convierte dólares a soles con tasa SUNAT oficial o cotización personalizada.
              </p>
            </Link>

            <Link 
              href="/calculadora-soles-a-dolares" 
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-md transition bg-slate-50/50 dark:bg-slate-950/50 group"
            >
              <span className="text-2xl mb-2 block">💰</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition">
                Calculadora Soles a Dólares (PEN → USD)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Convierte soles a dólares estadounidenses de manera rápida e intuitiva.
              </p>
            </Link>

            <Link 
              href="/consulta-ruc-sunat" 
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-md transition bg-slate-50/50 dark:bg-slate-950/50 group"
            >
              <span className="text-2xl mb-2 block">🔍</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition">
                Consulta RUC SUNAT
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Verificador numérico de RUC y guía de consulta en el padrón oficial de SUNAT.
              </p>
            </Link>

            <Link 
              href="/tablas-e-indicadores-sunat" 
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-md transition bg-slate-50/50 dark:bg-slate-950/50 group"
            >
              <span className="text-2xl mb-2 block">📈</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition">
                Tablas e Indicadores SUNAT
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Histórico del valor de la UIT (2023-2026), tramos de IR y parámetros oficiales.
              </p>
            </Link>

            <Link 
              href="/calculadoras/conversiones/calculadora-tipo-de-cambio" 
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-md transition bg-slate-50/50 dark:bg-slate-950/50 group"
            >
              <span className="text-2xl mb-2 block">💱</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition">
                Conversor Moneda FIX (USD / MXN)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Conversor de tipo de cambio oficial para transacciones en pesos mexicanos.
              </p>
            </Link>
          </div>
        </section>

      </main>

      <Footer lang={lang} />
    </div>
  );
}
