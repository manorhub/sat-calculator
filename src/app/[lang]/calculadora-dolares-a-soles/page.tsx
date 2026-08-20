import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import DolaresASolesClient from './DolaresASolesClient';
import { getSunatExchangeRate } from '@/lib/sunat-exchange-rate';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const canonicalUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/calculadora-dolares-a-soles`;

  return {
    title: 'Calculadora Dólares a Soles: USD a PEN',
    description: 'Convierte dólares a soles peruanos fácilmente usando el tipo de cambio disponible o un valor personalizado.',
    keywords: [
      'convertir dólares a soles',
      'dólares a soles',
      'calculadora dólares a soles',
      'USD a PEN',
      'dólar a sol peruano'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Calculadora Dólares a Soles: USD a PEN',
      description: 'Convierte dólares a soles peruanos fácilmente usando el tipo de cambio disponible o un valor personalizado.',
      url: canonicalUrl,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function DolaresASolesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/calculadora-dolares-a-soles`;

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
    description: 'Convierte dólares a soles peruanos fácilmente usando el tipo de cambio disponible o un valor personalizado.',
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
        name: '¿Cómo convertir dólares a soles peruanos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Multiplica la cantidad en dólares (USD) por la tasa de cambio aplicable en Soles (PEN) por cada dólar.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué opción de tipo de cambio debo seleccionar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Usa el Tipo de Cambio SUNAT si es para contabilidad o impuestos. Usa el Tipo de Cambio Personalizado para ingresar el precio de tu banco o casa de cambio.'
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
      { '@type': 'ListItem', position: 2, name: 'Tipo de Cambio SUNAT', item: 'https://calculadorasat.org/tipo-de-cambio-sunat' },
      { '@type': 'ListItem', position: 3, name: 'Dólares a Soles', item: pageUrl }
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
              ← Tipo de Cambio SUNAT
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
          <Link href="/tipo-de-cambio-sunat" className="hover:text-blue-600 transition-colors">Tipo de Cambio SUNAT</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Dólares a Soles</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 mb-4 border border-blue-200 dark:border-blue-800">
            💵 Conversor USD → PEN
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Calculadora Dólares a Soles
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Convierte dólares estadounidenses a soles peruanos eligiendo entre el tipo de cambio oficial de la SUNAT o una cotización personalizada.
          </p>
        </div>

        <DolaresASolesClient initialRate={initialRate} />

        {/* Informational content */}
        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-slate-950 dark:text-white">
            Diferencia entre Tipo de Cambio SUNAT y Personalizado
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-400">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Tipo de Cambio SUNAT</h3>
              <p className="text-xs leading-relaxed">
                Tasa oficial fijada por la SUNAT para fines de facturación contable, registro tributario y cálculo de impuestos en Perú.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Tipo de Cambio Personalizado</h3>
              <p className="text-xs leading-relaxed">
                Tasa libre o comercial ofrecida por entidades bancarias, casas de cambio digitales o ventanillas físicas en Perú.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">
            🔗 Herramientas relacionadas del Cluster SUNAT
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
            <Link href="/calculadora-soles-a-dolares" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Soles a Dólares</div>
                <div className="text-xs text-slate-500 font-normal">Convertidor PEN a USD</div>
              </div>
            </Link>
            <Link href="/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">🇵🇪</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                <div className="text-xs text-slate-500 font-normal">Cotización oficial del día</div>
              </div>
            </Link>
            <Link href="/tipo-de-cambio-para-solventar-obligaciones" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">⚖️</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Solventar Obligaciones</div>
                <div className="text-xs text-slate-500 font-normal">Pagos de tributos y deudas</div>
              </div>
            </Link>
          </div>
        </section>

      </main>

      <Footer lang={lang} />
    </div>
  );
}
