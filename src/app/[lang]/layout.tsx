import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import CookieBanner from "../../components/CookieBanner";
import SEOHreflang from "../../components/SEO/SEOHreflang";
import ThemeProvider from "../../components/ThemeProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.calculadorasat.org'),
  title: "Calculadora SAT - Plataforma Fiscal y Financiera México",
  description: "La mejor plataforma de calculadoras fiscales y financieras de México. Calcula IVA, ISR, Nómina, RESICO, Aguinaldo y más de forma gratuita y al instante.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="google-site-verification" content="rRetDb7bEgDlPVqH4e0hWvIB__PrqNCSr2FYbfXsZMM" />
        <SEOHreflang />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9602707669345879"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden text-slate-900 dark:text-slate-100">
        {/* Google Analytics (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PFQQD895QD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PFQQD895QD');
          `}
        </Script>
        <ThemeProvider>
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}


