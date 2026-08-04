import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiCalendar, FiUser, FiTag } from 'react-icons/fi';
import Reveal from '../components/Reveal.jsx';
import PreloadedImage from '../components/PreloadedImage.jsx';
import { loadCollection } from '../utils/siteStore.js';
import { blogs } from '../data/content.js';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const localBlogs = loadCollection('blogs', blogs);
    const localMatch = localBlogs.find((b) => b.slug === slug || b.id === slug || b._id === slug || String(b.id) === String(slug));
    if (localMatch) {
      setPost(localMatch);
      setLoading(false);
      setError(null);
    } else {
      setLoading(true);
    }

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        if (res.ok) {
          const json = await res.json();
          const item = json.data?.item || json.data;
          if (item && active) {
            setPost({
              ...item,
              image: typeof item.featuredImage === 'object' ? (item.featuredImage?.url || '') : (item.featuredImage || item.image || '')
            });
            setError(null);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        // Ignore network failure and rely on local match
      }
      if (active && !localMatch) {
        setError('Blog post not found.');
        setLoading(false);
      }
    };
    fetchBlog();
    return () => { active = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-32 flex flex-col items-center justify-center text-white/60">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-champagne border-t-transparent" />
        <p className="mt-4 text-sm font-bold uppercase tracking-widest text-champagne">Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-40 pb-32 container">
        <div className="text-center text-white/60 py-20 border border-dashed border-white/15 rounded-[16px]">
          <p className="font-display text-3xl text-white/80">Article Not Found</p>
          <p className="mt-2 text-sm text-white/50">{error || 'The story you are looking for has been moved or unpublished.'}</p>
          <Link to="/blog" className="mt-6 inline-block rounded-full bg-champagne px-6 py-3 text-xs font-bold text-black uppercase tracking-wider">
            ← Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  const publishDateStr = post.publishDate ? new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : post.updatedAt || 'Recent';

  return (
    <div className="min-h-screen pt-36 pb-32 overflow-hidden">
      <div className="pointer-events-none fixed top-1/4 left-10 h-96 w-96 rounded-full bg-champagne/10 blur-[130px] z-[-1]" />
      
      <div className="container max-w-4xl">
        <Reveal>
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-champagne hover:text-white transition duration-300 mb-8">
            <FiArrowLeft className="text-base" /> Back to Journal
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
            <span className="rounded-full border border-champagne/40 bg-champagne/15 px-3 py-1 text-champagne">
              {post.category || 'Editing Insights'}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock className="text-champagne" /> {post.readTime || post.readingTime || 3} min read
            </span>
            <span className="flex items-center gap-1.5">
              <FiCalendar className="text-champagne" /> {publishDateStr}
            </span>
          </div>
          <h1 className="headline mt-4 leading-tight">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-6 text-xl leading-8 text-white/70 font-medium italic border-l-2 border-champagne pl-4 my-6">
              {post.excerpt}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="my-10 rounded-[16px] overflow-hidden luxury-border bg-charcoal shadow-2xl">
            <PreloadedImage
              src={post.image || post.featuredImage || 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80&fm=webp'}
              alt={post.title}
              priority={true}
              containerClassName="max-h-[520px] w-full"
              className="w-full max-h-[520px] object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass rounded-[12px] p-8 md:p-12 text-white/80 leading-9 text-lg space-y-6">
            {post.content ? (
              <div 
                className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-a:text-champagne prose-strong:text-white"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            ) : (
              <div className="space-y-6">
                <p>
                  High-end retouching requires more than applying presets or routine color curves. At Riwaz Studio, every image is approached as an emotional story where lighting, texture, and subject presence must work in harmony.
                </p>
                <h3 className="font-display text-2xl text-white pt-4">Maintaining Human Texture</h3>
                <p>
                  When editing luxury weddings or editorial fashion, the greatest risk is over-polishing skin to the point of feeling artificial. Our workflow emphasizes precise frequency separation and hand-painted micro-burns to clean distractions while preserving organic pores, fabrics, and environmental atmosphere.
                </p>
                <h3 className="font-display text-2xl text-white pt-4">Cinematic Color Language</h3>
                <p>
                  Color grading establishes the subconscious mood of a photograph. Whether tailoring a warm champagne palette for regal celebrations or deep moody tones for contemporary editorials, tonal consistency across hundreds of delivered frames is what separates amateur edits from executive campaign exports.
                </p>
              </div>
            )}

            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
                <FiTag className="text-champagne mr-2" />
                {post.tags.map((t, idx) => (
                  <span key={idx} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-bold text-white/60"> # {t} </span>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 glass rounded-[12px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[.18em] text-champagne">Collaborate With Us</span>
            <h3 className="font-display text-3xl text-white mt-1">Want this editing standard for your studio?</h3>
          </div>
          <Link to="/contact" className="rounded-full bg-champagne px-8 py-4 text-xs font-black uppercase text-ink hover:scale-105 transition duration-300 shadow-[0_0_25px_rgba(244,214,144,0.4)] whitespace-nowrap">
            Inquire Retouching Suite
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
