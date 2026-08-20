import type { MetadataRoute } from 'next';
import { calculators } from '@/calculators';
import posts from '@/data/posts.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://www.calculadorasat.org';
  const currentDate = new Date();

  // 1. Static & Cluster routes
  const staticPaths = [
    '',
    'about',
    'contact',
    'developer',
    'privacy',
    'terms',
    'calendario-fiscal',
    'blog',
    'llms.txt',
    'formatos',
    'widgets',
    'semanas-cotizadas-imss',
    'dolar-hoy',
    'precio-del-dolar-en-peru',
    'tipo-de-cambio',
    'tipo-de-cambio-sunat',
    'tipo-de-cambio-para-solventar-obligaciones',
    'dolares-a-soles',
    'soles-a-dolares',
    'calculadora-dolares-a-soles',
    'calculadora-soles-a-dolares',
    'consulta-ruc-sunat',
    'tablas-e-indicadores-sunat',
  ];

  const staticEntries = staticPaths.map((path) => {
    const segment = path ? `/${path}` : '';
    return {
      url: `${domain}${segment}`,
      lastModified: currentDate,
      changeFrequency: (path === '' || path === 'tipo-de-cambio-sunat') ? ('daily' as const) : ('weekly' as const),
      priority: path === '' ? 1.0 : (path.includes('tipo-de-cambio-sunat') ? 0.9 : 0.8),
      alternates: {
        languages: {
          es: `${domain}${segment}`,
          en: `${domain}/en${segment}`,
        },
      },
    };
  });

  // 2. Category routes
  const uniqueCategories = Array.from(
    new Set(calculators.map((calc) => calc.categorySlug))
  );

  const categoryEntries = uniqueCategories.map((categorySlug) => {
    const segment = `/calculadoras/${categorySlug}`;
    return {
      url: `${domain}${segment}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          es: `${domain}${segment}`,
          en: `${domain}/en${segment}`,
        },
      },
    };
  });

  // 3. Calculator detail routes
  const calculatorEntries = calculators.map((calc) => {
    const segment = `/calculadoras/${calc.categorySlug}/${calc.slug}`;
    return {
      url: `${domain}${segment}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          es: `${domain}${segment}`,
          en: `${domain}/en${segment}`,
        },
      },
    };
  });

  // 4. Blog post routes
  const publishedPosts = (posts as any[]).filter(p => p.status === 'published');
  const blogEntries = publishedPosts.map((post) => {
    const segment = `/blog/${post.slug}`;
    return {
      url: `${domain}${segment}`,
      lastModified: new Date(post.date || currentDate),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          es: `${domain}${segment}`,
          en: `${domain}/en${segment}`,
        },
      },
    };
  });

  return [...staticEntries, ...categoryEntries, ...calculatorEntries, ...blogEntries];
}
