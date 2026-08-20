import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import SolesADolaresClient from './SolesADolaresClient';
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
  const seoAlternates = getSeoAlternates('calculadora-soles-a-dolares', lang);

  return {
    title: 'Calculadora Soles a Dólares: PEN a USD',
    description: 'Convierte soles peruanos a dólares estadounidenses usando el tipo de cambio que elijas.',
    keywords: [
      'soles a dólares',
      'convertir soles a dólares',
      'calculadora soles a dólares',
      'PEN a USD',
      'sol peruano a dólar'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: 'Calculadora Soles a Dólares: PEN a USD',
      description: 'Convierte soles peruanos a dólares estadounidenses usando el tipo de cambio que elijas.',
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
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/calculadora-soles-a-dolares`;

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
    description: 'Convierte soles peruanos a dólares estadounidenses usando el tipo de cambio que elijas.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo convertir soles peruanos a dólares?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Divide el monto total en soles (PEN) entre la cotización del dólar (S/ por USD) que desees aplicar.'
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
      { '@type': 'ListItem', position: 3, name: 'Soles a Dólares', item: pageUrl }
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
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Soles a Dólares</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 mb-4 border border-emerald-200 dark:border-emerald-800">
            💰 Conversor PEN → USD
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Calculadora Soles a Dólares
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Convierte soles peruanos a dólares estadounidenses usando el tipo de cambio oficial SUNAT o una tasa personalizada de tu elección.
          </p>
        </div>

        <SolesADolaresClient initialRate={initialRate} />

        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">
            🔗 Herramientas relacionadas del Cluster SUNAT
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
            <Link href="/calculadora-dolares-a-soles" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">💵</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Dólares a Soles</div>
                <div className="text-xs text-slate-500 font-normal">Convertidor USD a PEN</div>
              </div>
            </Link>
            <Link href="/tipo-de-cambio-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">🇵🇪</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Tipo de Cambio SUNAT</div>
                <div className="text-xs text-slate-500 font-normal">Cotización oficial del día</div>
              </div>
            </Link>
            <Link href="/tablas-e-indicadores-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Tablas e Indicadores SUNAT</div>
                <div className="text-xs text-slate-500 font-normal">UIT e indicadores tributarios</div>
              </div>
            </Link>
          </div>
        </section>

      </main>

      <Footer lang={lang} />
    </div>
  );
}
