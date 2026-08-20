export function getSeoAlternates(route: string, lang: string) {
  const cleanRoute = route.startsWith('/') ? route : `/${route}`;
  const baseDomain = 'https://www.calculadorasat.org';
  
  const esPath = cleanRoute === '/' ? '' : cleanRoute;
  const canonicalUrl = `${baseDomain}${lang === 'en' ? '/en' : ''}${esPath}`;
  const esUrl = `${baseDomain}${esPath}`;
  const enUrl = `${baseDomain}/en${esPath}`;

  return {
    canonical: canonicalUrl,
    languages: {
      'es-MX': esUrl,
      'en-US': enUrl,
      'x-default': esUrl,
    },
  };
}
