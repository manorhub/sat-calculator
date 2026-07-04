'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import LanguageSelector from '../../../components/LanguageSelector';
import ThemeToggle from '../../../components/ThemeToggle';
import esDict from '../../../dictionaries/es.json';
import enDict from '../../../dictionaries/en.json';
import { Post } from '../../../types/blog';

export default function BlogListPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = use(params);
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const dict = lang === 'en' ? enDict : esDict;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/posts?lang=${lang}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [lang]);

  // Extract unique categories from posts
  const categories = React.useMemo(() => {
    const cats = posts.map(p => p.category);
    return ['all', ...Array.from(new Set(cats))];
  }, [posts]);

  // Filter posts
  const filteredPosts = React.useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || 
        post.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

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

      {/* Hero Banner Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-extrabold bg-white/15 text-blue-100 uppercase tracking-widest mb-4">
            {lang === 'en' ? 'News & Guidance' : 'Noticias y Orientación Fiscal'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none mb-4">
            {lang === 'en' ? 'Fiscal & Financial Blog' : 'Blog Fiscal y Financiero'}
          </h1>
          <p className="text-sm sm:text-base text-blue-100/90 max-w-xl mx-auto font-medium">
            {lang === 'en' 
              ? 'Stay informed with the latest SAT updates, tax tips, and financial calculations tutorials in Mexico.' 
              : 'Mantente informado con los últimos cambios del SAT, consejos fiscales y tutoriales de finanzas en México.'}
          </p>
        </div>
      </section>

      {/* Search and Filters Container */}
      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow w-full">
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between mb-10">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search articles...' : 'Buscar artículos...'}
              className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold shadow-sm"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
          </div>

          {/* Category pills */}
          {categories.length > 2 && (
            <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition duration-150 whitespace-nowrap shadow-sm border ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-850'
                  }`}
                >
                  {cat === 'all' ? (lang === 'en' ? 'All' : 'Todos') : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading and Results Display */}
        {loading ? (
          <div className="py-24 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 border-4 border-blue-500/25 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-sm font-semibold">{lang === 'en' ? 'Loading posts...' : 'Cargando artículos...'}</span>
          </div>
        ) : filteredPosts.length > 0 ? (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-2 mb-4 text-xs font-extrabold">
                    <span className="px-2.5 py-0.5 rounded uppercase tracking-wider bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                      {post.category}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500">
                      📅 {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX')}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-extrabold text-slate-950 dark:text-white leading-snug hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Link href={`${lang === 'en' ? '/en' : ''}/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-slate-550 dark:text-slate-400 text-sm mt-3.5 leading-relaxed line-clamp-3 font-medium">
                    {post.excerpt}
                  </p>
                </div>

                <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500 dark:text-slate-450">
                    ✍️ {post.author}
                  </span>
                  <Link 
                    href={`${lang === 'en' ? '/en' : ''}/blog/${post.slug}`}
                    className="font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                  >
                    {lang === 'en' ? 'Read More ➔' : 'Leer Más ➔'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
            <span className="text-4xl block mb-3">📭</span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {lang === 'en' ? 'No articles found' : 'No se encontraron artículos'}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              {lang === 'en' 
                ? 'Try adjusting your search query or category filters.' 
                : 'Intenta ajustar tus criterios de búsqueda o filtros de categorías.'}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center md:text-left mb-6">
            <span className="font-extrabold text-slate-900 dark:text-white text-base animate-pulse">
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
