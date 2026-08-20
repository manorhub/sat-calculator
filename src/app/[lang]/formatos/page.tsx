import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
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
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/formatos`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Formatos Descargables de RH y Trabajo Gratis',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Descarga plantillas editables gratis de Carta de Renuncia Voluntaria, Recibo de Finiquito y Convenios Laborales.',
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
        name: '¿Son legales y válidas las plantillas descargables de Carta de Renuncia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, las plantillas han sido redactadas conforme a los requisitos estipulados por la legislación laboral formal (Ley Federal del Trabajo / Código de Trabajo), incluyendo datos de identificación, declaración explícita de renuncia voluntaria y firma del trabajador.'
        }
      },
      {
        '@type': 'Question',
        name: '¿En qué formatos puedo descargar los documentos de Recursos Humanos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Puedes copiar directamente el texto editable o descargarlo en formato Microsoft Word (.docx) y PDF para su impresión directa.'
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
      { '@type': 'ListItem', position: 2, name: 'Formatos de RH', item: pageUrl }
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
            <Link href="/calculadoras/nomina/calculadora-finiquito" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
              ← Calculadora de Finiquito
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
            Descarga o copia plantillas legales y laborales gratuitas para empleados, patrones y departamentos de Recursos Humanos.
          </p>
        </div>

        <FormatosClient />

        {/* Detailed 500+ Words SEO Content & Legal Templates Guide */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Plantillas Legales de Recursos Humanos y Gestión Laboral
            </h2>
            <p>
              En la administración laboral diaria, contar con documentos legales estandarizados es esencial para respaldar la terminación del vínculo laboral, documentar el pago de finiquitos o liquidaciones y proteger los derechos tanto de los trabajadores como de los empleadores.
            </p>
            <p>
              Nuestra biblioteca de <strong>Formatos Descargables Gratuitos</strong> incluye modelos editables listos para su uso formal.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              ¿Qué Documentos Puedes Descargar Gratis?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-3xl mb-2 block">📝</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Carta de Renuncia Voluntaria</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Documento formal mediante el cual el empleado notifica a la empresa su decisión irrevocable de terminar la relación laboral por iniciativa propia.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-3xl mb-2 block">🧾</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Recibo de Finiquito</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Constancia que detalla el pago proporcional de sueldo, vacaciones, prima vacacional y aguinaldo acordado al concluir la relación de trabajo.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-3xl mb-2 block">⚖️</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Convenio de Terminación</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Acuerdo mutuo entre patrón y trabajador para dar por finalizado el contrato de trabajo con pleno consentimiento de ambas partes.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes sobre Formatos de RH
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Cómo calcular el monto que corresponde en el Recibo de Finiquito?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Puedes utilizar nuestra <Link href="/calculadoras/nomina/calculadora-finiquito" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Calculadora de Finiquito</Link> para obtener el desglose exacto de importes proporcionales antes de imprimir tu documento.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Es obligatorio firmar de recibido?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Sí, la firma autógrafa o huella dactilar del trabajador en el recibo de finiquito acredita la recepción conforme del pago y la liberación de obligaciones del patrón.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red de Herramientas de Nómina Relacionadas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/calculadoras/nomina/calculadora-finiquito" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🧾</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Calculadora de Finiquito</div>
                  <div className="text-xs text-slate-500 font-normal">Cálculo por renuncia o despido</div>
                </div>
              </Link>
              <Link href="/calculadoras/nomina/calculadora-aguinaldo" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Calculadora de Aguinaldo</div>
                  <div className="text-xs text-slate-500 font-normal">Monto proporcional y LFT</div>
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
