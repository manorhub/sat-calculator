import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import WidgetBuilderClient from './WidgetBuilderClient';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const canonicalUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/widgets`;

  return {
    title: 'Widgets de Calculadoras Gratis para Sitios Web y Blogs',
    description: 'Inserta calculadoras gratis de IVA, Dólar Hoy, Salario Neto y CETES en tu sitio web con un sencillo código iframe.',
    keywords: [
      'widgets calculadoras gratis',
      'widget dolar hoy iframe',
      'widget calculadora iva mexico',
      'widget salario neto blog'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Widgets de Calculadoras Gratis para Sitios Web y Blogs',
      description: 'Inserta calculadoras gratis de IVA, Dólar Hoy, Salario Neto y CETES en tu sitio web con un sencillo código iframe.',
      url: canonicalUrl,
      siteName: 'Calculadora SAT',
      locale: 'es_MX',
      type: 'website',
    },
  };
}

export default async function WidgetsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const pageUrl = `https://calculadorasat.org${lang === 'en' ? '/en' : ''}/widgets`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    url: pageUrl,
    name: 'Widgets de Calculadoras Gratis para Webmasters',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'Genera e inserta calculadoras financieras e iberoamericanas en tu blog o portal web gratis.',
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
        name: '¿Son 100% gratuitos los widgets para insertar en mi web?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, todos nuestros widgets son completamente gratuitos y de libre inserción para webmasters, blogs de noticias, portales contables y sitios personales.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo insertar el widget de Dólar Hoy o IVA en WordPress?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Solo debes copiar el código HTML <iframe> generado en nuestro constructor y pegarlo dentro de un bloque de HTML personalizado o widget de texto en tu editor de WordPress.'
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
      { '@type': 'ListItem', position: 2, name: 'Widgets Webmasters', item: pageUrl }
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
            <Link href="/developer" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
              ← Documentación API
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
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Widgets para Sitios Web</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300 mb-4 border border-violet-200 dark:border-violet-800">
            🧩 Para Bloggers y Desarrolladores Web
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Widgets de Calculadoras Gratis
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mt-3 font-medium leading-relaxed">
            Inserta cualquiera de nuestras calculadoras interactivas en tu blog, portal de noticias o sitio web copiando un sencillo código iframe HTML.
          </p>
        </div>

        <WidgetBuilderClient />

        {/* Detailed 500+ Words SEO Content & Webmaster Guide */}
        <article className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Widgets Interactivos Gratuitos para Enriquecer tu Portal Web
            </h2>
            <p>
              Ofrecer a tus usuarios herramientas interactivas de cálculo en tiempo real aumenta exponencialmente el tiempo de permanencia en el sitio (Dwell Time), reduce la tasa de rebote y mejora el posicionamiento SEO orgánico de tu blog o sitio web de noticias financieras.
            </p>
            <p>
              Nuestra suite de <strong>Widgets empaquetados en iFrame</strong> es totalmente receptiva (Responsive Design), ultrarrápida y compatible con cualquier gestor de contenidos (WordPress, Blogger, Wix, Webflow o código personalizado en React/HTML).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Widgets Disponibles para Inserción
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-3xl mb-2 block">💵</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Widget Dólar Hoy en Vivo</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Muestra la cotización del dólar en tiempo real y permite realizar conversiones rápidas en tu barra lateral o dentro de artículos.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-3xl mb-2 block">📊</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Widget Calculadora de IVA</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Permite agregar y desglosar tasas de IVA para comprobantes de pago de forma rápida para tus lectores.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-3xl mb-2 block">💰</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Widget Salario Neto</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ideal para blogs de empleo y RH, permite simular retenciones impositivas y sueldo neto recibido.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Preguntas Frecuentes de Desarrolladores y Webmasters
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Los widgets afectan la velocidad de carga de mi sitio web?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  No. Los widgets se cargan de forma asíncrona dentro de un contenedor aislado iframe optimizado de alto rendimiento sin sobrecargar el hilo principal de ejecuciones de tu página.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                  ¿Tienen API para consumo de datos JSON?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Sí. Si prefieres consumir datos puros JSON en tu backend, visita nuestra sección <Link href="/developer" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">API Developer Documentation</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white mb-6">
              🌐 Recursos Adicionales para Desarrolladores
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold">
              <Link href="/developer" className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition bg-slate-50 dark:bg-slate-950 flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <div className="text-slate-900 dark:text-white font-bold">API Developer Docs</div>
                  <div className="text-xs text-slate-500 font-normal">Endpoints de cálculo JSON</div>
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
