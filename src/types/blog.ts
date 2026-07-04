export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  lang: 'es' | 'en' | 'all';
  category: string;
  date: string;
  author: string;
  status: 'draft' | 'published';
}
