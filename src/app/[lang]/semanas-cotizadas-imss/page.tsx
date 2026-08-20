import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import SemanasCotizadasClient from './SemanasCotizadasClient';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const canonicalUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/semanas-cotizadas-imss`;

  return {
    title: 'Semanas Cotizadas IMSS y Pensión Ley 73 | Calculadora 2026',
    description: 'Calcula tus semanas cotizadas en el IMSS, Salario Diario Integrado (SDI) y simula tu pensión estimada por vejez o cesantía bajo la Ley 73 o Ley 97.',
    keywords: [
      'semanas cotizadas imss',
      'semanas cotizadas',
      'pensión imss ley 73',
      'calcular semanas imss',
      'salario diario integrado imss'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Semanas Cotizadas IMSS y Pensión Ley 73 | Calculadora 2026',
      description: 'Calcula tus semanas cotizadas en el IMSS, Salario Diario Integrado (SDI) y simula tu pensión estimada por vejez o cesantía.',
      url: canonicalUrl,
      siteName: 'Calculadora SAT',
      locale: 'es_MX',
      type: 'website',
    },
  };
}

export default async function SemanasCotizadasPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/semanas-cotizadas-imss`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Calculadora de Semanas Cotizadas IMSS y Pensión',
    applicationCategory: 'FinancialApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Calcula tus semanas cotizadas en el IMSS y simula tu pensión Ley 73 / Ley 97.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'MXN',
    },
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href={lang === 'en' ? '/en' : '/'} className="font-extrabold text-xl text-slate-900 dark:text-white hover:opacity-90 transition">
            Calculadora<span className="text-blue-600">SAT</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Semanas Cotizadas IMSS</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 mb-4 border border-indigo-200 dark:border-indigo-800">
            📋 Seguridad Social e IMSS México
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Semanas Cotizadas IMSS y Pensión
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Estima el número de semanas acumuladas en el Seguro Social y simula el monto de tu pensión bajo la Ley 73 o Ley 97.
          </p>
        </div>

        <SemanasCotizadasClient />

        <section className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            ¿Cómo consultar tus Semanas Cotizadas en el IMSS?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-2xl mb-2 block">1️⃣</span>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Ten a la mano tus datos</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Necesitas tu Clave Única de Registro de Población (CURP), Número de Seguro Social (NSS) y un correo electrónico activo.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-2xl mb-2 block">2️⃣</span>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Ingresa al Servicio Digital IMSS</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Accede al portal oficial de Semanas Cotizadas del IMSS y solicita la Constancia de Semanas Cotizadas.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-2xl mb-2 block">3️⃣</span>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Descarga tu reporte</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Recibirás en tu correo el documento PDF con el historial detallado de patrones y semanas cotizadas.
              </p>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-16 text-center text-xs text-slate-500">
        © 2026 Calculadora SAT. Información estimativa basada en la Ley del Seguro Social de México. No afiliado oficialmente con el IMSS.
      </footer>
    </div>
  );
}
