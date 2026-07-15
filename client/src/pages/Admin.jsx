import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import {
  FiBarChart2,
  FiBell,
  FiChevronRight,
  FiEdit3,
  FiFileText,
  FiGrid,
  FiHome,
  FiImage,
  FiLock,
  FiLogOut,
  FiMail,
  FiMessageSquare,
  FiPlus,
  FiSave,
  FiSearch,
  FiSettings,
  FiStar,
  FiTrash2,
  FiUpload,
  FiUsers
} from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { blogs, gallery, services, testimonials } from '../data/content.js';
import { deleteRecord, loadCollection, upsertRecord } from '../utils/siteStore.js';

const modules = [
  { key: 'dashboard', label: 'Dashboard', icon: FiHome },
  { key: 'gallery', label: 'Gallery', icon: FiImage, endpoint: '/api/gallery' },
  { key: 'services', label: 'Services', icon: FiStar, endpoint: '/api/services' },
  { key: 'blogs', label: 'Blogs', icon: FiFileText, endpoint: '/api/blogs' },
  { key: 'testimonials', label: 'Testimonials', icon: FiUsers, endpoint: '/api/testimonials' },
  { key: 'messages', label: 'Messages', icon: FiMessageSquare, endpoint: '/api/contact' },
  { key: 'settings', label: 'Settings', icon: FiSettings }
];

const fallback = {
  gallery,
  services,
  blogs,
  testimonials: testimonials.map((item, index) => ({
    id: `testimonial-${index + 1}`,
    title: item.name,
    name: item.name,
    role: item.role,
    quote: item.quote,
    rating: item.rating,
    status: 'published'
  })),
  messages: [],
  settings: [{ id: 'settings', title: 'Riwaz Studio', email: 'hello@riwazstudio.com', phone: '+91 8780464627', whatsapp: '+91 8780464627', status: 'published' }]
};

const blank = {
  gallery: { title: '', category: 'Wedding', image: '', description: '', tags: '', status: 'published' },
  services: { title: '', price: '', image: '', description: '', features: '', status: 'published' },
  blogs: { title: '', category: 'Editing Tips', image: '', excerpt: '', content: '', status: 'published' },
  testimonials: { title: '', name: '', role: '', quote: '', rating: 5, status: 'published' },
  messages: { name: '', email: '', phone: '', subject: '', message: '', status: 'unread' },
  settings: { id: 'settings', title: '', email: '', phone: '', whatsapp: '', instagram: '', address: '', footerText: '', status: 'published' }
};

const chartBars = [44, 68, 52, 86, 74, 96, 62, 78];

function moduleByKey(key) {
  return modules.find((item) => item.key === key) || modules[0];
}

function titleOf(item, type) {
  if (type === 'messages') return item.subject || item.name || 'Message';
  if (type === 'testimonials') return item.name || item.title;
  return item.title || item.name || 'Untitled';
}

function normalizeForSave(type, form) {
  if (type === 'services' && typeof form.features === 'string') {
    return { ...form, features: form.features.split(',').map((item) => item.trim()).filter(Boolean) };
  }
  if (type === 'gallery' && typeof form.tags === 'string') {
    return { ...form, tags: form.tags.split(',').map((item) => item.trim()).filter(Boolean) };
  }
  if (type === 'testimonials') {
    return { ...form, title: form.name || form.title, rating: Number(form.rating || 5) };
  }
  return form;
}

function inputValue(value) {
  return Array.isArray(value) ? value.join(', ') : value || '';
}

function pathParts(pathname) {
  return pathname.replace(/^\/admin\/?/, '').split('/').filter(Boolean);
}

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const parts = pathParts(location.pathname);
  const page = parts[0] || 'dashboard';
  const mode = parts[1] === 'add' ? 'add' : parts[2] === 'edit' ? 'edit' : 'list';
  const editId = mode === 'edit' ? parts[1] : null;
  const active = page === 'dashboard' ? 'dashboard' : page;
  const activeModule = moduleByKey(active);

  const [token, setToken] = useState(localStorage.getItem('riwaz_token') || '');
  const [email, setEmail] = useState('admin@riwazstudio.com');
  const [password, setPassword] = useState('');
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const [records, setRecords] = useState(() =>
    Object.fromEntries(Object.keys(fallback).map((key) => [key, loadCollection(key, fallback[key])]))
  );

  const activeRecords = records[active] || [];
  const editingRecord = mode === 'edit' ? activeRecords.find((item) => item.id === editId) : null;
  const [draft, setDraft] = useState(null);
  const form = draft || editingRecord || blank[active] || {};

  const stats = useMemo(() => [
    { label: 'Gallery Photos', value: records.gallery?.length || 0, icon: FiImage, color: 'from-sky-400 to-blue-600' },
    { label: 'Services', value: records.services?.length || 0, icon: FiStar, color: 'from-amber-300 to-orange-500' },
    { label: 'Blogs', value: records.blogs?.length || 0, icon: FiFileText, color: 'from-fuchsia-400 to-rose-500' },
    { label: 'Unread Messages', value: records.messages?.filter((item) => item.status !== 'read').length || 0, icon: FiMessageSquare, color: 'from-emerald-300 to-teal-600' }
  ], [records]);

  const filtered = activeRecords.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()));

  const setField = (field, value) => setDraft((current) => ({ ...(current || form), [field]: value }));

  const refresh = (type, next) => setRecords((current) => ({ ...current, [type]: next }));

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      const accessToken = data.token || data.accessToken || data.data?.accessToken;
      if (accessToken) {
        localStorage.setItem('riwaz_token', accessToken);
        setToken(accessToken);
        return;
      }
    } catch {
      // Demo login handles local preview when the backend is offline.
    }
    if (email === 'admin@riwazstudio.com' && password === 'RiwazStudioo') {
      const demoToken = `demo.${Date.now()}`;
      localStorage.setItem('riwaz_token', demoToken);
      setToken(demoToken);
    } else {
      setNotice('Use admin@riwazstudio.com / RiwazStudioo for local preview.');
    }
  };

  const save = async (event) => {
    event.preventDefault();
    const payload = normalizeForSave(active, { ...form, id: mode === 'edit' ? editId : form.id });
    const next = upsertRecord(active, payload, fallback[active]);
    refresh(active, next);
    setDraft(null);
    setNotice(`${activeModule.label} saved and the public website was updated.`);
    navigate(active === 'settings' ? '/admin/settings' : `/admin/${active}`);

    if (!token?.startsWith('demo.') && activeModule.endpoint) {
      try {
        await fetch(mode === 'edit' ? `${activeModule.endpoint}/${editId}` : activeModule.endpoint, {
          method: mode === 'edit' ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      } catch {
        // Local storage remains the live preview source.
      }
    }
  };

  const remove = async (item) => {
    const next = deleteRecord(active, item.id, fallback[active]);
    refresh(active, next);
    setNotice(`${activeModule.label} deleted and removed from the website.`);
  };

  const markRead = (item) => {
    refresh('messages', upsertRecord('messages', { ...item, status: 'read' }, fallback.messages));
  };

  const reply = (item) => {
    const message = window.prompt(`Reply to ${item.email || item.name}`, `Hello ${item.name || ''},\n\n`);
    if (!message) return;
    refresh('messages', upsertRecord('messages', { ...item, status: 'replied', reply: message }, fallback.messages));
    setNotice('Reply saved. Connect SMTP in backend .env to send real email.');
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#f3f5fb] text-[#20243a]">
        <div className="grid min-h-screen place-items-center p-6">
          <motion.form
            onSubmit={login}
            className="w-full max-w-md rounded-[8px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,.12)]"
            initial={{ opacity: 0, y: 26, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
          >
            <div className="grid h-14 w-14 place-items-center rounded-[8px] bg-[#151331] text-2xl text-white"><FiLock /></div>
            <h1 className="mt-6 text-3xl font-extrabold">Riwaz Admin</h1>
            <p className="mt-2 text-sm text-slate-500">Hidden dashboard route for website management.</p>
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-6 w-full rounded-[8px] border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" placeholder="Email" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} className="mt-3 w-full rounded-[8px] border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" placeholder="Password" type="password" />
            <button className="mt-5 w-full rounded-[8px] bg-[#246bfe] px-5 py-3 font-extrabold text-white shadow-lg shadow-blue-500/20">Enter Dashboard</button>
            {notice && <p className="mt-4 rounded-[8px] bg-amber-50 p-3 text-sm text-amber-700">{notice}</p>}
          </motion.form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef1f8] text-[#20243a]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] bg-[#111029] text-white shadow-2xl lg:block">
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-white text-lg font-black text-[#246bfe]">R</span>
          <div>
            <strong className="block text-lg">RIWAZ</strong>
            <span className="text-xs uppercase tracking-[.2em] text-white/40">Admin</span>
          </div>
        </div>
        <nav className="p-3">
          <p className="px-3 py-3 text-[.68rem] font-bold uppercase tracking-[.18em] text-white/35">Menu</p>
          {modules.map(({ key, label, icon: Icon }) => (
            <Link
              key={key}
              to={key === 'dashboard' ? '/admin' : `/admin/${key}`}
              onClick={() => { setDraft(null); setQuery(''); }}
              className={`mb-1 flex items-center justify-between rounded-[8px] px-3 py-3 text-sm font-semibold transition ${active === key ? 'bg-[#246bfe] text-white shadow-lg shadow-blue-500/20' : 'text-white/62 hover:bg-white/8 hover:text-white'}`}
            >
              <span className="flex items-center gap-3"><Icon /> {label}</span>
              <FiChevronRight className="text-xs opacity-50" />
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-[240px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/92 px-4 backdrop-blur md:px-6">
          <div>
            <h1 className="text-lg font-extrabold md:text-xl">{activeModule.label === 'Dashboard' ? 'Dashboard Overview' : `${activeModule.label} Management`}</h1>
            <p className="text-xs text-slate-500">Riwaz Studio / Admin Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="hidden items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 py-2 md:flex">
              <FiSearch className="text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search..." className="w-48 bg-transparent text-sm outline-none" />
            </label>
            <button className="relative grid h-10 w-10 place-items-center rounded-[8px] border border-slate-200 bg-white text-slate-600"><FiBell /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" /></button>
            <Link to="/" className="grid h-10 w-10 place-items-center rounded-[8px] border border-slate-200 bg-white text-slate-600" title="Back to website"><FiGrid /></Link>
            <button onClick={() => { localStorage.removeItem('riwaz_token'); setToken(''); }} className="grid h-10 w-10 place-items-center rounded-[8px] bg-[#111029] text-white" title="Logout"><FiLogOut /></button>
          </div>
        </header>

        <main className="p-4 md:p-6">
          {notice && <div className="mb-5 rounded-[8px] border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">{notice}</div>}
          {page === 'dashboard' && <Dashboard stats={stats} records={records} />}
          {page !== 'dashboard' && mode === 'list' && (
            <ListPage
              active={active}
              activeModule={activeModule}
              filtered={filtered}
              onDelete={remove}
              onMarkRead={markRead}
              onReply={reply}
            />
          )}
          {page !== 'dashboard' && (mode === 'add' || mode === 'edit') && (
            <EditorPage
              active={active}
              activeModule={activeModule}
              form={form}
              mode={mode}
              onChange={setField}
              onSave={save}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function Dashboard({ stats, records }) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }, index) => (
          <motion.div
            key={label}
            className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm"
            initial={{ opacity: 0, y: 24, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -5, rotateX: 2 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">{label}</p>
                <strong className="mt-3 block text-3xl font-black">{value}</strong>
              </div>
              <span className={`grid h-12 w-12 place-items-center rounded-[8px] bg-gradient-to-br ${color} text-xl text-white shadow-lg`}><Icon /></span>
            </div>
            <div className="mt-5 flex h-12 items-end gap-1">
              {chartBars.map((bar, i) => <span key={i} className={`flex-1 rounded-t bg-gradient-to-t ${color} opacity-75`} style={{ height: `${bar}%` }} />)}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-extrabold">Recent Messages</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="text-slate-400"><tr><th className="py-3">Customer</th><th>Subject</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {(records.messages || []).slice(0, 6).map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="py-4 font-bold">{item.name}</td>
                    <td>{item.subject}</td>
                    <td><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">{item.status}</span></td>
                    <td>{item.updatedAt || 'Today'}</td>
                  </tr>
                ))}
                {!(records.messages || []).length && <tr><td colSpan="4" className="py-8 text-center text-slate-400">No customer messages yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-extrabold">Website Health</h2>
          <div className="mt-5 grid gap-4">
            {['CRUD connected to website pages', 'Hidden admin route active', 'Local preview storage enabled', 'Backend API ready for sync'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-[8px] bg-slate-50 p-3 text-sm font-semibold text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListPage({ active, activeModule, filtered, onDelete, onMarkRead, onReply }) {
  return (
    <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-extrabold">{activeModule.label}</h2>
          <p className="text-sm text-slate-500">Add, edit, delete, search, and publish records from separate admin pages.</p>
        </div>
        {active !== 'messages' && <Link to={`/admin/${active}/add`} className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#246bfe] px-5 py-3 font-extrabold text-white shadow-lg shadow-blue-500/20"><FiPlus /> Add New</Link>}
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="text-slate-400">
            <tr><th className="py-3">Title</th><th>Status</th><th>Category / Contact</th><th>Updated</th><th className="text-right">Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t border-slate-100 align-top">
                <td className="max-w-md py-4">
                  <strong>{titleOf(item, active)}</strong>
                  <span className="mt-1 block truncate text-slate-400">{item.description || item.quote || item.message || item.excerpt}</span>
                </td>
                <td className="py-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">{item.status || 'published'}</span></td>
                <td className="py-4">{item.category || item.role || item.email || activeModule.label}</td>
                <td className="py-4">{item.updatedAt || 'Today'}</td>
                <td className="py-3">
                  <div className="flex justify-end gap-2">
                    {active === 'messages' && <button onClick={() => onReply(item)} className="grid h-9 w-9 place-items-center rounded-[8px] border border-slate-200 text-blue-600"><FiMail /></button>}
                    {active === 'messages' && <button onClick={() => onMarkRead(item)} className="grid h-9 w-9 place-items-center rounded-[8px] border border-slate-200 text-emerald-600"><FiSave /></button>}
                    {active !== 'messages' && <Link to={`/admin/${active}/${item.id}/edit`} className="grid h-9 w-9 place-items-center rounded-[8px] border border-slate-200 text-slate-600"><FiEdit3 /></Link>}
                    <button onClick={() => onDelete(item)} className="grid h-9 w-9 place-items-center rounded-[8px] border border-slate-200 text-rose-500"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan="5" className="py-10 text-center text-slate-400">No records found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditorPage({ active, activeModule, form, mode, onChange, onSave }) {
  const fields = Object.keys(blank[active] || {});
  return (
    <motion.form
      onSubmit={onSave}
      className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm"
      initial={{ opacity: 0, y: 24, rotateX: -4 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
    >
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-extrabold">{mode === 'edit' ? 'Edit' : 'Add'} {activeModule.label}</h2>
          <p className="text-sm text-slate-500">This is a separate admin page with sidebar layout.</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/admin/${active}`} className="rounded-[8px] border border-slate-200 px-5 py-3 font-bold text-slate-600">Cancel</Link>
          <button className="inline-flex items-center gap-2 rounded-[8px] bg-[#246bfe] px-5 py-3 font-extrabold text-white shadow-lg shadow-blue-500/20"><FiUpload /> Save</button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {fields.map((field) => {
          const large = ['message', 'description', 'content', 'quote', 'footerText'].includes(field);
          const common = 'rounded-[8px] border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500';
          return (
            <label key={field} className={large ? 'lg:col-span-2' : ''}>
              <span className="mb-2 block text-xs font-black uppercase tracking-[.14em] text-slate-400">{field}</span>
              {large ? (
                <textarea rows="6" value={inputValue(form[field])} onChange={(event) => onChange(field, event.target.value)} className={`${common} w-full resize-none`} />
              ) : (
                <input value={inputValue(form[field])} onChange={(event) => onChange(field, event.target.value)} className={`${common} w-full`} />
              )}
            </label>
          );
        })}
      </div>
    </motion.form>
  );
}
