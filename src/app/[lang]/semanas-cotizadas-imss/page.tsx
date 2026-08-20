import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import SemanasCotizadasClient from './SemanasCotizadasClient';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

import { getSeoAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const seoAlternates = getSeoAlternates('semanas-cotizadas-imss', lang);

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
    alternates: seoAlternates,
    openGraph: {
      title: 'Semanas Cotizadas IMSS y Pensión Ley 73 | Calculadora 2026',
      description: 'Calcula tus semanas cotizadas en el IMSS, Salario Diario Integrado (SDI) y simula tu pensión estimada por vejez o cesantía.',
      url: seoAlternates.canonical,
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuántas semanas cotizadas necesito para jubilarme con la Ley 73 del IMSS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bajo el régimen de la Ley del Seguro Social 1973 (Ley 73), requieres un mínimo de 500 semanas cotizadas reconocidas por el IMSS y tener al menos 60 años para pensión por cesantía o 65 años para vejez.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cuántas semanas pide la Ley 97 del IMSS en 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bajo la reforma a la Ley 97 del IMSS, el requisito de semanas cotizadas comenzó en 750 semanas en 2021 y se incrementa en 25 semanas cada año hasta alcanzar las 1,000 semanas en el año 2031.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo influye el Salario Diario Integrado (SDI) en mi pensión Ley 73?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El monto de la pensión Ley 73 se calcula promediando el Salario Base de Cotización (SBC/SDI) de los últimos 5 años cotizados (últimas 250 semanas) multiplicado por el factor de cuantía básica e incrementos anuales.'
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
      { '@type': 'ListItem', position: 2, name: 'Semanas Cotizadas IMSS', item: pageUrl }
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
            <Link href="/calculadoras/finanzas-personales/calculadora-afore" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
              ← Calculadora AFORE
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

        {/* Detailed 500+ Words SEO Article & Pension Guide */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              ¿Por qué son Fundamentales las Semanas Cotizadas en el IMSS?
            </h2>
            <p>
              Las <strong>Semanas Cotizadas ante el Instituto Mexicano del Seguro Social (IMSS)</strong> representan el registro de periodos semanales durante los cuales un trabajador ha mantenido una relación laboral formal y su patrón ha pagado las cuotas obrero-patronales correspondientes.
            </p>
            <p>
              Conocer tu historial de semanas acumuladas es el primer paso indispensable para planificar tu retiro, calcular tu pensión por cesantía en edad avanzada o vejez, o solicitar la Modalidad 40 (Continuación Voluntaria en el Régimen Obligatorio).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Diferencias Clave: Ley 73 vs. Ley 97 del IMSS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>🏛️</span> Ley del Seguro Social 1973 (Ley 73)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Aplica a trabajadores que comenzaron a cotizar ante el IMSS <strong>antes del 1 de julio de 1997</strong>. Requiere un mínimo de <strong>500 semanas cotizadas</strong> y la pensión es pagada de por vida por el Gobierno Federal en función del salario promedio de las últimas 250 semanas.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <span>💼</span> Ley del Seguro Social 1997 (Ley 97 / AFORE)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Aplica a trabajadores que cotizaron a partir del <strong>1 de julio de 1997</strong>. La pensión depende exclusivamente del saldo acumulado en tu cuenta individual de AFORE. Requiere un incremento gradual de semanas (875 semanas en 2026). Para proyectar tu saldo AFORE, consulta nuestra <Link href="/calculadoras/finanzas-personales/calculadora-afore" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Calculadora AFORE</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              ¿Cómo Obtener tu Constancia Oficial de Semanas Cotizadas en Línea?
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Ingresa al portal oficial de Servicios Digitales del IMSS (<code>imss.gob.pe</code> / <code>imss.gob.mx</code>).</li>
              <li>Ten a la mano tu <strong>CURP</strong>, tu <strong>Número de Seguro Social (NSS)</strong> y un correo electrónico personal.</li>
              <li>Solicita el trámite "Constancia de Semanas Cotizadas en el IMSS".</li>
              <li>Recibirás un documento PDF oficial con el desglose histórico de cada patrón registrado y el total acumulado.</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes sobre Semanas Cotizadas
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Qué es el Salario Diario Integrado (SDI) o SBC?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  El Salario Base de Cotización (SBC/SDI) es el sueldo diario percibido más la parte proporcional de prestaciones de ley (aguinaldo, prima vacacional y bonos) con el que tu patrón te registra ante el IMSS.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Qué pasa si tengo semanas descontadas por desempleo?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Si realizaste un retiro parcial por desempleo de tu AFORE, el IMSS descuenta semanas equivalentes. Puedes recuperarlas reintegrando el dinero retirado a tu cuenta de AFORE.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Red de Herramientas de Nómina y Seguridad Social
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/calculadoras/finanzas-personales/calculadora-afore" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🏦</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Calculadora AFORE</div>
                  <div className="text-xs text-slate-500 font-normal">Proyección de saldo y pensión</div>
                </div>
              </Link>
              <Link href="/calculadoras/nomina/calculadora-salario-neto" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">💵</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Calculadora Salario Neto</div>
                  <div className="text-xs text-slate-500 font-normal">Sueldo neto y retenciones IMSS</div>
                </div>
              </Link>
              <Link href="/calculadoras/nomina/calculadora-vacaciones" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">🏖️</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">Vacaciones Dignas</div>
                  <div className="text-xs text-slate-500 font-normal">Días y prima vacacional</div>
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
