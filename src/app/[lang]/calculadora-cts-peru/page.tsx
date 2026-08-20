import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import CtsClient from './CtsClient';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('calculadora-cts-peru', lang);

  return {
    title: 'Calculadora de CTS Perú 2026 | Mayo y Noviembre',
    description: 'Calcula el depósito semestral de Compensación por Tiempo de Servicios (CTS) en Perú (Mayo y Noviembre) incluyendo un sexto de la gratificación.',
    keywords: [
      'calculadora cts peru',
      'calcular cts mayo noviembre',
      'compensacion por tiempo de servicios',
      'deposito cts peru 2026',
      'sexto de gratificacion cts'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: 'Calculadora de CTS Perú 2026 | Mayo y Noviembre',
      description: 'Calcula el depósito semestral de Compensación por Tiempo de Servicios (CTS) en Perú.',
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function CtsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/calculadora-cts-peru`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Calculadora de CTS en Perú',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Calcula el depósito de la Compensación por Tiempo de Servicios (CTS) en Perú.',
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
        name: '¿En qué meses se deposita la CTS en Perú?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Los depósitos semestrales de la CTS deben abonarse obligatoriamente en las quincenas de Mayo (semestre noviembre-abril) y Noviembre (semestre mayo-octubre).'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo influye la gratificación en el cálculo de la CTS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Al sueldo básico mensual se le debe agregar un sexto (1/6) del monto de la última gratificación percibida para determinar la Remuneración Computable.'
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
      { '@type': 'ListItem', position: 2, name: 'Calculadora de CTS Perú', item: pageUrl }
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
            <Link href="/calculadora-gratificacion-peru" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
              ← Gratificación Perú
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
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Calculadora de CTS Perú</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 mb-4 border border-blue-200 dark:border-blue-800">
            🏦 Beneficios Sociales • D.S. N° 001-97-TR
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Calculadora de CTS Perú
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Calcula el monto exacto del depósito de Compensación por Tiempo de Servicios para los periodos de mayo y noviembre.
          </p>
        </div>

        <CtsClient />

        {/* 500+ Words SEO Article */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              ¿Qué es la CTS (Compensación por Tiempo de Servicios) en el Perú?
            </h2>
            <p>
              La <strong>Compensación por Tiempo de Servicios (CTS)</strong> es un beneficio social de contingencia que el empleador deposita dos veces al año a favor del trabajador con el objetivo de constituir un fondo de previsión para afrontar contingencias derivadas del cese laboral.
            </p>
            <p>
              Se calcula semestralmente por los periodos **noviembre - abril** (pago hasta el 15 de mayo) y **mayo - octubre** (pago hasta el 15 de noviembre).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Fórmula de Cálculo de la Remuneración Computable
            </h2>
            <p>
              La base imponible sobre la cual se calcula la CTS se llama <strong>Remuneración Computable</strong> e incluye:
            </p>
            <div className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm text-center border border-slate-800">
              Remuneración Computable = Sueldo Básico + (Gratificación / 6)
            </div>
            <p className="text-xs">
              Luego, el monto semestral del depósito se calcula dividiendo la remuneración computable entre 12 y multiplicándola por los meses completos trabajados en el semestre.
            </p>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red de Herramientas de Planilla en Perú
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/calculadora-gratificacion-peru" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Gratificación Perú</div>
                  <div className="text-xs text-slate-500 font-normal">Julio y Diciembre</div>
                </div>
              </Link>
              <Link href="/calculadora-quinta-categoria-peru" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Renta 5ta Categoría</div>
                  <div className="text-xs text-slate-500 font-normal">Retención mensual SUNAT</div>
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
