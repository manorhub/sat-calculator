import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import FormatosClient from './FormatosClient';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const canonicalUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/formatos`;

  return {
    title: 'Formatos Descargables de RH y Trabajo | Word y PDF Gratis',
    description: 'Descarga gratis plantillas editables de Carta de Renuncia Voluntaria, Recibo de Finiquito, Convenio de Terminación Laboral y Constancia de Retenciones.',
    keywords: [
      'formatos descargables rh',
      'carta de renuncia voluntaria word',
      'recibo de finiquito plantilla',
      'convenio terminacion laboral pdf',
      'formatos recursos humanos mexico'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Formatos Descargables de RH y Trabajo | Word y PDF Gratis',
      description: 'Descarga gratis plantillas editables de Carta de Renuncia Voluntaria, Recibo de Finiquito y Convenio Laboral.',
      url: canonicalUrl,
      siteName: 'Calculadora SAT',
      locale: 'es_MX',
      type: 'website',
    },
  };
}

export default async function FormatosPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans">
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
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Formatos y Plantillas</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 mb-4 border border-blue-200 dark:border-blue-800">
            📄 Plantillas Editables Gratis
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Formatos Descargables de RH y Trabajo
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Descarga o copia plantillas legales y laborales gratuitas para empleados, patrones y departamentos de Recursos Humanos en México.
          </p>
        </div>

        <FormatosClient />
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-16 text-center text-xs text-slate-500">
        © 2026 Calculadora SAT. Plantillas de uso libre para fines informativos y administrativos.
      </footer>
    </div>
  );
}
