import React from 'react';
import { notFound } from 'next/navigation';
import { getCalculatorBySlug } from '../../../../../calculators';
import CalculatorEngine from '../../../../../components/CalculatorEngine';
import RichSnippets from '../../../../../components/SEO/RichSnippets';
import dynamic from 'next/dynamic';
const AIAssistant = dynamic(() => import('../../../../../components/AI/AIAssistant'));
import LanguageSelector from '../../../../../components/LanguageSelector';
import ThemeToggle from '../../../../../components/ThemeToggle';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    lang: string;
    category: string;
    slug: string;
  }>;
}

function getLocalizedConfig(config: any, lang: string) {
  if (lang === 'es' || !config.translations || !config.translations[lang]) {
    return config;
  }
  const trans = config.translations[lang];
  return {
    ...config,
    title: trans.title || config.title,
    shortDescription: trans.shortDescription || config.shortDescription,
    category: trans.category || config.category,
    seo: {
      ...config.seo,
      ...(trans.seo || {})
    }
  };
}

import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const baseCalculator = getCalculatorBySlug(resolvedParams.slug);

  if (!baseCalculator) {
    return {
      title: lang === 'en' ? 'Calculator Not Found' : 'Calculadora no encontrada',
      description: lang === 'en' ? 'The requested calculator does not exist.' : 'La calculadora solicitada no existe o ha sido movida.',
    };
  }

  const calculator = getLocalizedConfig(baseCalculator, lang);
  const seoAlternates = getSeoAlternates(`calculadoras/${resolvedParams.category}/${resolvedParams.slug}`, lang);

  return {
    title: calculator.seo.metaTitle,
    description: calculator.seo.metaDescription,
    keywords: calculator.seo.keywords.join(', '),
    alternates: seoAlternates,
    openGraph: {
      title: calculator.seo.metaTitle,
      description: calculator.seo.metaDescription,
      url: seoAlternates.canonical,
      siteName: 'Calculadora SAT',
      type: 'website',
    },
  };
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function CalculatorPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const baseCalculator = getCalculatorBySlug(resolvedParams.slug);

  if (!baseCalculator) {
    notFound();
  }

  const calculator = getLocalizedConfig(baseCalculator, lang);
  const currentUrl = `https://www.calculadorasat.org/${lang === 'en' ? 'en/' : ''}calculadoras/${resolvedParams.category}/${resolvedParams.slug}`;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between">
      <Header lang={lang} />

      <main className="max-w-6xl mx-auto px-4 py-8 w-full flex-grow">
        {/* Dynamic SEO JSON-LD Schemas */}
        <RichSnippets config={calculator} url={currentUrl} />

        {/* Navigation Breadcrumbs */}
        <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href={lang === 'en' ? '/en' : '/'} className="hover:text-blue-600 transition-colors">
            {lang === 'en' ? 'Home' : 'Inicio'}
          </Link>
          <span className="mx-2">/</span>
          <Link href={lang === 'en' ? `/en/calculadoras/${resolvedParams.category}` : `/calculadoras/${resolvedParams.category}`} className="hover:text-blue-600 transition-colors capitalize">
            {calculator.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            {calculator.title}
          </span>
        </nav>

        {/* Main Engine Component */}
        <CalculatorEngine slug={resolvedParams.slug} lang={lang} />

        {/* Contextual AI Assistant Drawer */}
        <AIAssistant activeCalculatorContext={calculator.title} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
