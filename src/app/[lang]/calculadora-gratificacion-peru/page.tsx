import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GratificacionClient from './GratificacionClient';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('calculadora-gratificacion-peru', lang);

  return {
    title: 'Calculadora de Gratificación Perú 2026 | Julio y Diciembre',
    description: 'Calcula tu gratificación legal de Fiestas Patrias (Julio) y Navidad (Diciembre) en Perú con la Bonificación Extraordinaria del 9% de EsSalud o 6.75% de EPS.',
    keywords: [
      'calculadora gratificacion peru',
      'calcular gratificacion julio diciembre',
      'gratificacion fiestas patrias',
      'gratificacion navidad peru',
      'bonificacion extraordinaria essalud 9'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: 'Calculadora de Gratificación Perú 2026 | Julio y Diciembre',
      description: 'Calcula tu gratificación legal de Fiestas Patrias (Julio) y Navidad (Diciembre) en Perú.',
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function GratificacionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/calculadora-gratificacion-peru`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Calculadora de Gratificación en Perú',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Calcula el monto de tu gratificación de Fiestas Patrias o Navidad en Perú.',
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
        name: '¿Cuándo es el último día para pagar la gratificación en Perú?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La gratificación de Fiestas Patrias debe depositarse hasta el 15 de julio, mientras que la gratificación de Navidad debe pagarse hasta el 15 de diciembre.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué es la Bonificación Extraordinaria del 9%?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Es un beneficio establecido por la Ley N° 30334 mediante el cual el 9% que el empleador solía aportar a EsSalud sobre la gratificación es abonado directamente al trabajador.'
        }
      },
      {
        '@type': 'Question',
        name: '¿La gratificación paga impuestos o AFP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Las gratificaciones legales están inafectas de aportes a AFP u ONP. Sin embargo, forman parte del cálculo anual computable para el Impuesto a la Renta de 5ta Categoría.'
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
      { '@type': 'ListItem', position: 2, name: 'Calculadora de Gratificación Perú', item: pageUrl }
    ]
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header lang={lang} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Calculadora de Gratificación</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 mb-4 border border-amber-200 dark:border-amber-800">
            🎁 Ley N° 27735 y Ley N° 30334 • Perú
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Calculadora de Gratificación Perú
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Calcula el monto de tu gratificación de Fiestas Patrias (Julio) o Navidad (Diciembre) incluyendo la Bonificación Extraordinaria de EsSalud (9%) o EPS (6.75%).
          </p>
        </div>

        <GratificacionClient />

        {/* 500+ Words SEO Article */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              ¿Cómo Funciona el Cálculo de la Gratificación en el Perú?
            </h2>
            <p>
              La <strong>Gratificación Legal</strong> en el Perú es un beneficio social otorgado por ley a todos los trabajadores de la actividad privada bajo el régimen laboral común (Ley N° 27735). Se deposita dos veces al año: en **julio** (Fiestas Patrias) y en **diciembre** (Navidad).
            </p>
            <p>
              Equivale a una remuneración mensual completa si el trabajador ha laborado el semestre entero (enero a junio para julio, o julio a diciembre para diciembre). Si ha trabajado menos tiempo, se paga de forma proporcional por cada mes calendario completo laborado.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Bonificación Extraordinaria del 9% (EsSalud) o 6.75% (EPS)
            </h2>
            <p>
              Con la entrada en vigencia de la <strong>Ley N° 30334</strong>, las gratificaciones quedaron inafectas de descuentos para aportes a pensiones (AFP u ONP). Adicionalmente, el aporte que el empleador realizaba a EsSalud (9%) es entregado directamente al trabajador bajo el concepto de <strong>Bonificación Extraordinaria</strong>. Si el trabajador cuenta con cobertura EPS, recibe el 6.75%.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Ejemplo Práctico de Gratificación
            </h2>
            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 text-sm space-y-2 font-mono">
              <p>Sueldo Bruto: S/ 3,000 PEN</p>
              <p>Meses trabajados: 6 meses (semestre completo)</p>
              <p>Gratificación Base = S/ 3,000 PEN</p>
              <p>Bonificación EsSalud (9%) = S/ 3,000 × 0.09 = S/ 270 PEN</p>
              <strong className="text-blue-900 dark:text-blue-200 block text-base pt-2">
                Total Neto Aportado en Cuenta = S/ 3,270.00 PEN
              </strong>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red de Herramientas Laborales en Perú
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/calculadora-cts-peru" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🏦</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Calculadora de CTS</div>
                  <div className="text-xs text-slate-500 font-normal">Compensación por Tiempo de Servicios</div>
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
