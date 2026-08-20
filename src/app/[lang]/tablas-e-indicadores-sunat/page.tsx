import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import TablasIndicadoresClient from './TablasIndicadoresClient';
import { getSunatExchangeRate } from '@/lib/sunat-exchange-rate';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const canonicalUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/tablas-e-indicadores-sunat`;

  return {
    title: 'Tablas e Indicadores SUNAT: UIT y Valores Tributarios Perú',
    description: 'Consulta el valor de la UIT en Perú, tablas tributarias del Impuesto a la Renta, tasas e indicadores oficiales fijados por SUNAT y el MEF.',
    keywords: [
      'tablas e indicadores sunat',
      'indicadores sunat',
      'tablas sunat',
      'indicadores tributarios Perú',
      'valores tributarios SUNAT',
      'UIT Perú 2026'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Tablas e Indicadores SUNAT: UIT y Valores Tributarios Perú',
      description: 'Consulta el valor de la UIT en Perú, tablas tributarias del Impuesto a la Renta, tasas e indicadores oficiales fijados por SUNAT y el MEF.',
      url: canonicalUrl,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function TablasIndicadoresPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/tablas-e-indicadores-sunat`;

  const initialRate = await getSunatExchangeRate();

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Tablas e Indicadores SUNAT - Valores Tributarios Perú',
    description: 'Consulta el valor de la UIT en Perú, tablas tributarias del Impuesto a la Renta, tasas e indicadores oficiales fijados por SUNAT y el MEF.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuál es el valor de la UIT en Perú para el 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El valor de la Unidad Impositiva Tributaria (UIT) para el ejercicio 2026 es de S/ 5,350 soles (Decreto Supremo N.° 298-2025-EF).'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cuáles son las escalas del Impuesto a la Renta de 4ta y 5ta categoría en Perú?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Los tramos progresivos acumulativos van desde el 8% (hasta 5 UIT), 14% (de 5 a 20 UIT), 17% (de 20 a 35 UIT), 20% (de 35 a 45 UIT) y 30% (más de 45 UIT).'
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
      { '@type': 'ListItem', position: 3, name: 'Tablas e Indicadores SUNAT', item: pageUrl }
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
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Tablas e Indicadores SUNAT</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 mb-4 border border-indigo-200 dark:border-indigo-800">
            📊 Valores Oficiales Perú
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Tablas e Indicadores SUNAT
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Consulta el histórico del valor de la Unidad Impositiva Tributaria (UIT), escalas del Impuesto a la Renta y parámetros fiscales autorizados.
          </p>
        </div>

        <TablasIndicadoresClient initialRate={initialRate} />

        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">
            🔗 Herramientas relacionadas del Cluster SUNAT
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
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
                <div className="text-xs text-slate-500 font-normal">Conversión legal de tributos</div>
              </div>
            </Link>
            <Link href="/consulta-ruc-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">🔍</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Consulta RUC SUNAT</div>
                <div className="text-xs text-slate-500 font-normal">Verificador y guía RUC</div>
              </div>
            </Link>
          </div>
        </section>

      </main>

      <Footer lang={lang} />
    </div>
  );
}
