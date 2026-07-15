import { FiSearch } from 'react-icons/fi';
import Reveal from '../components/Reveal.jsx';
import { blogs } from '../data/content.js';
import { useStoredCollection } from '../utils/siteStore.js';

const categories = ['Photography Tips', 'Editing Tips', 'Lightroom', 'Photoshop', 'Color Grading', 'Wedding', 'Fashion'];

export default function Blog() {
  const blogItems = useStoredCollection('blogs', blogs);

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
            <input placeholder="Search articles" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          </div>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((item) => <button key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-white/70">{item}</button>)}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {blogItems.filter((post) => post.status !== 'draft').map((post, index) => (
            <article key={post.id || `${post.title}-${index}`} className="glass overflow-hidden rounded-[8px]">
              <img src={post.image} alt={post.title} loading="lazy" className="h-64 w-full object-cover" />
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-[.18em] text-champagne">{post.category}</span>
                <h2 className="mt-3 font-display text-3xl">{post.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/62">{post.excerpt || 'A practical look at premium editing decisions, style consistency, and visual delivery.'}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-2">
          {[1, 2, 3].map((page) => <button key={page} className={`grid h-11 w-11 place-items-center rounded-full ${page === 1 ? 'bg-champagne text-black' : 'border border-white/10'}`}>{page}</button>)}
        </div>
      </div>
    </section>
  );
}
