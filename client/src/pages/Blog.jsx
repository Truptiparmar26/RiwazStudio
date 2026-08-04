import { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { blogs } from '../data/content.js';
import { useApiCollection } from '../utils/siteStore.js';

const categories = ['All', 'Photography Tips', 'Editing Tips', 'Lightroom', 'Photoshop', 'Color Grading', 'Wedding', 'Fashion'];

export default function Blog() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { items: blogItems, loading, error, refetch } = useApiCollection('blogs', blogs, { onlyActive: true });

  const filtered = useMemo(() => {
    let items = category === 'All' ? blogItems : blogItems.filter((post) => post.category === category);
    if (search.trim()) {
      const query = search.toLowerCase();
      items = items.filter((post) => post.title?.toLowerCase().includes(query) || post.category?.toLowerCase().includes(query) || post.excerpt?.toLowerCase().includes(query));
    }
    return items;
  }, [category, search, blogItems]);

  return (
    <section className="section pt-36">
      <div className="container">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Blog</p>
            <h1 className="headline mt-4">Post-production journal.</h1>
          </div>
          <div className="glass flex max-w-md items-center gap-3 rounded-full px-4 py-3">
            <FiSearch className="text-champagne" />
            <input 
              placeholder="Search articles" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none text-white placeholder:text-white/40" 
            />
          </div>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button 
              key={item} 
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition duration-300 ${category === item ? 'bg-champagne text-black border-champagne' : 'border-white/10 text-white/70 hover:text-white'}`}
            >
              {item}
            </button>
          ))}
        </div>

        {loading && blogItems.length === 0 && (
          <div className="mt-20 flex flex-col items-center justify-center py-16 text-white/60">
            <span className="h-10 w-10 animate-spin rounded-full border-2 border-champagne border-t-transparent" />
            <p className="mt-4 text-sm font-bold uppercase tracking-widest text-champagne">Loading journal entries...</p>
          </div>
        )}

        {error && blogItems.length === 0 && (
          <div className="mt-16 text-center text-white/60 py-20 border border-dashed border-red-500/30 rounded-[16px] bg-red-500/5">
            <p className="font-display text-2xl text-white/80">Unable to load articles from server.</p>
            <p className="mt-2 text-sm text-white/50">{error}</p>
            <button onClick={refetch} className="mt-6 rounded-full bg-champagne px-6 py-2 text-xs font-bold text-black uppercase">
              Retry Loading
            </button>
          </div>
        )}

        {!loading && filtered.length === 0 && !error && (
          <div className="mt-16 text-center text-white/60 py-20 border border-dashed border-white/15 rounded-[16px]">
            <p className="font-display text-2xl text-white/80">No articles found for "{search || category}"</p>
            <button onClick={() => { setCategory('All'); setSearch(''); }} className="mt-4 rounded-full bg-champagne px-6 py-2 text-xs font-bold text-black uppercase">
              Reset Filters
            </button>
          </div>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {filtered.map((post, index) => (
            <Link key={post.id || post._id || `${post.title}-${index}`} to={`/blog/${post.slug || post.id || post._id}`} className="group block">
              <article className="glass overflow-hidden rounded-[8px] transition duration-500 group-hover:border-champagne/40 group-hover:shadow-[0_0_30px_rgba(244,214,144,0.15)] h-full flex flex-col">
                <div className="overflow-hidden bg-charcoal h-64 w-full">
                  <img src={post.image || post.featuredImage || 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=750&q=76&fm=webp'} alt={post.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[.18em] text-champagne">{post.category || 'Editing'}</span>
                    <h2 className="mt-3 font-display text-2xl group-hover:text-champagne transition duration-300">{post.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-white/62 line-clamp-3">{post.excerpt || post.shortDescription || 'A practical look at premium editing decisions, style consistency, and visual delivery.'}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-xs font-bold text-white/50 border-t border-white/10 pt-4">
                    <span>{post.readTime || 3} min read</span>
                    <span className="text-champagne group-hover:translate-x-1 transition duration-300">Read More →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        {filtered.length > 0 && (
        <div className="mt-10 flex justify-center gap-2">
          {[1].map((page) => <button key={page} className={`grid h-11 w-11 place-items-center rounded-full ${page === 1 ? 'bg-champagne text-black' : 'border border-white/10'}`}>{page}</button>)}
        </div>
        )}
      </div>
    </section>
  );
}
