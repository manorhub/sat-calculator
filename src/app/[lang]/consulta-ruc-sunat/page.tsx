import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import ConsultaRucClient from './ConsultaRucClient';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('consulta-ruc-sunat', lang);

  return {
    title: 'Consulta RUC SUNAT: Cómo Consultar un RUC',
    description: 'Aprende cómo consultar un RUC en SUNAT, qué información puedes verificar y dónde realizar la consulta oficial.',
    keywords: [
      'consulta ruc sunat',
      'sunat ruc',
      'ruc sunat',
      'consultar ruc',
      'validar ruc Perú'
    ],
    alternates: seoAlternates,
    openGraph: {
      title: 'Consulta RUC SUNAT: Cómo Consultar un RUC',
      description: 'Aprende cómo consultar un RUC en SUNAT, qué información puedes verificar y dónde realizar la consulta oficial.',
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      locale: 'es_PE',
      type: 'website',
    },
  };
}

export default async function ConsultaRucPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/consulta-ruc-sunat`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Guía y Verificador de Consulta RUC SUNAT',
    description: 'Aprende cómo consultar un RUC en SUNAT, qué información puedes verificar y dónde realizar la consulta oficial.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué es el RUC en Perú?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El Registro Único de Contribuyentes (RUC) es el padrón de 11 dígitos a cargo de la SUNAT que identifica a las personas físicas y empresas que realizan actividades económicas en Perú.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Dónde realizar la consulta oficial de RUC de la SUNAT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Puedes ingresar directamente al portal e-Consulta RUC oficial de la SUNAT (e-consulta.sunat.gob.pe).'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué información pública permite consultar el RUC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Permite consultar el nombre/razón social, estado (Activo, En Baja), condición (Habido, No Habido), tipo de contribuyente y domicilio fiscal.'
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
      { '@type': 'ListItem', position: 3, name: 'Consulta RUC SUNAT', item: pageUrl }
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
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Consulta RUC SUNAT</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 mb-4 border border-amber-200 dark:border-amber-800">
            🔍 Guía y Verificación RUC Perú
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Consulta RUC SUNAT
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Verifica la validez de la estructura matemática de un RUC y conoce los pasos para realizar la consulta en el padrón oficial de la SUNAT.
          </p>
        </div>

        {/* Interactive RUC Structure Validator Client */}
        <ConsultaRucClient />

        {/* Informational Guide */}
        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Guía para Consultar un RUC en la SUNAT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-2xl mb-2 block">1️⃣</span>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Ingresa al Portal SUNAT</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Accede a la herramienta oficial e-Consulta RUC en la web institucional de la SUNAT (<code className="text-[11px] bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">sunat.gob.pe</code>).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-2xl mb-2 block">2️⃣</span>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Elige el Criterio</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Puedes buscar por el número de RUC de 11 dígitos, el DNI de la persona o la Razón Social / Nombre Comercial.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-2xl mb-2 block">3️⃣</span>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Verifica la Condición</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Asegúrate de que el contribuyente figure como <strong>ACTIVO</strong> y en condición de <strong>HABIDO</strong>.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              💡 <code>calculadorasat.org</code> es una guía informativa y no está afiliada con la SUNAT.
            </div>
            <a
              href="https://e-consulta.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <span>Ir al Sitio Oficial de SUNAT e-Consulta</span>
              <span>↗</span>
            </a>
          </div>
        </section>

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
            <Link href="/tablas-e-indicadores-sunat" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Tablas e Indicadores SUNAT</div>
                <div className="text-xs text-slate-500 font-normal">UIT e indicadores oficiales</div>
              </div>
            </Link>
            <Link href="/calculadora-dolares-a-soles" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
              <span className="text-2xl">💵</span>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Dólares a Soles</div>
                <div className="text-xs text-slate-500 font-normal">Convertidor USD a PEN</div>
              </div>
            </Link>
          </div>
        </section>

      </main>

      <Footer lang={lang} />
    </div>
  );
}
