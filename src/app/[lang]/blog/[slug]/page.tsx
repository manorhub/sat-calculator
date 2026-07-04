'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import LanguageSelector from '../../../../components/LanguageSelector';
import ThemeToggle from '../../../../components/ThemeToggle';
import esDict from '../../../../dictionaries/es.json';
import enDict from '../../../../dictionaries/en.json';
import { Post } from '../../../../types/blog';

export default function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const resolvedParams = use(params);
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const slug = resolvedParams.slug;
  const dict = lang === 'en' ? enDict : esDict;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
          
          // Set browser tab title dynamically for SEO
          if (typeof window !== 'undefined') {
            document.title = `${data.title} | Calculadora SAT`;
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  // Basic Markdown Parser for Article Body
  const parseMarkdown = (md: string): string => {
    if (!md) return '';
    return md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-black mt-10 mb-4 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black mt-12 mb-6 text-slate-900 dark:text-white">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-extrabold text-slate-950 dark:text-white">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic text-slate-800 dark:text-slate-200">$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        const isInternal = url.startsWith('/') || url.startsWith('#') || !url.includes('://');
        const target = isInternal ? '' : ' target="_blank" rel="noopener noreferrer"';
        return `<a href="${url}" class="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-all duration-150"${target}>${text}</a>`;
      })
      .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc text-slate-700 dark:text-slate-300 my-2 leading-relaxed">$1</li>')
      .split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('<h') || trimmed.startsWith('<li') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<a')) {
          return line;
        }
        return `<p class="mb-5 text-slate-650 dark:text-slate-350 text-base sm:text-lg leading-relaxed">${line}</p>`;
      })
      .join('\n');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-250">
      
      {/* Navigation Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href={lang === 'en' ? '/en' : '/'} className="font-extrabold text-xl text-slate-900 dark:text-white hover:opacity-90 transition">
            Calculadora<span className="text-blue-600">SAT</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="flex space-x-4 sm:space-x-6">
              <Link href={lang === 'en' ? '/en/calendario-fiscal' : '/calendario-fiscal'} className="text-sm font-bold text-slate-600 dark:text-slate-350 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1">
                📅 {dict.nav.calendar}
              </Link>
              <Link href={lang === 'en' ? '/en/blog' : '/blog'} className="text-sm font-extrabold text-blue-600 dark:text-blue-400 transition flex items-center gap-1">
                ✍️ {dict.nav.blog || 'Blog'}
              </Link>
            </nav>
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-4 py-12 flex-grow w-full">
        {/* Navigation / Back Button */}
        <div className="mb-8">
          <Link
            href={lang === 'en' ? '/en/blog' : '/blog'}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition duration-150 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            {lang === 'en' ? 'Back to Blog' : 'Volver al Blog'}
          </Link>
        </div>

        {loading ? (
          <div className="py-24 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 border-4 border-blue-500/25 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-sm font-semibold">{lang === 'en' ? 'Loading article...' : 'Cargando artículo...'}</span>
          </div>
        ) : error || !post ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
              {lang === 'en' ? 'Article not found' : 'Artículo no encontrado'}
            </h3>
            <p className="text-slate-550 text-sm mt-2 mb-6">
              {lang === 'en' 
                ? 'The page you are looking for does not exist or has been removed.' 
                : 'La publicación que buscas no existe o ha sido eliminada.'}
            </p>
            <Link
              href={lang === 'en' ? '/en/blog' : '/blog'}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md"
            >
              {lang === 'en' ? 'Return to Blog' : 'Regresar al Blog'}
            </Link>
          </div>
        ) : (
          /* Article Body Layout */
          <article className="animate-fade-in">
            {/* Header info */}
            <header className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-extrabold text-slate-400 dark:text-slate-500 mb-4">
                <span className="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 px-2.5 py-1 rounded font-black uppercase tracking-wider">
                  {post.category}
                </span>
                <span>•</span>
                <span>✍️ {post.author}</span>
                <span>•</span>
                <span>📅 {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX')}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 italic mt-4 border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-1 leading-relaxed font-medium">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Rendered HTML Content */}
            <div 
              className="prose dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
            />

            {/* Bottom CTA Block */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900/50 dark:to-slate-900/20 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {lang === 'en' ? 'Need to run tax calculations?' : '¿Necesitas calcular tus impuestos?'}
                </h3>
                <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm mt-1">
                  {lang === 'en' 
                    ? 'Explore our suite of 100% free, updated SAT calculators.' 
                    : 'Explora nuestra suite de calculadoras SAT 100% gratuitas y actualizadas.'}
                </p>
              </div>
              <Link
                href={lang === 'en' ? '/en' : '/'}
                className="px-5 py-3 bg-blue-650 hover:bg-blue-750 text-white font-bold rounded-xl text-xs whitespace-nowrap shadow transition duration-150"
              >
                {lang === 'en' ? 'Go to Calculators ➔' : 'Ir a Calculadoras ➔'}
              </Link>
            </div>
          </article>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center md:text-left mb-6">
            <span className="font-extrabold text-slate-900 dark:text-white text-base">
              Calculadora<span className="text-blue-600">SAT</span>
            </span>
            <p className="mt-1 text-slate-550 text-sm">{dict.footer.rights} {dict.footer.disclaimer}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row md:flex-wrap gap-y-3 gap-x-6 justify-center md:justify-start text-sm text-slate-550">
            <Link href={lang === 'en' ? '/en/calendario-fiscal' : '/calendario-fiscal'} className="hover:text-blue-600 transition font-bold text-blue-600 dark:text-blue-400">{dict.nav.calendar}</Link>
            <Link href={lang === 'en' ? '/en/developer' : '/developer'} className="hover:text-indigo-750 transition font-bold text-indigo-600 dark:text-indigo-400">{dict.nav.developer}</Link>
            <Link href={lang === 'en' ? '/en/privacy' : '/privacy'} className="hover:text-slate-700 transition">{dict.footer.privacy}</Link>
            <Link href={lang === 'en' ? '/en/terms' : '/terms'} className="hover:text-slate-700 transition">{dict.footer.terms}</Link>
            <Link href={lang === 'en' ? '/en/about' : '/about'} className="hover:text-slate-700 transition">{dict.nav.about}</Link>
            <Link href={lang === 'en' ? '/en/contact' : '/contact'} className="hover:text-slate-700 transition">{dict.nav.contact}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
