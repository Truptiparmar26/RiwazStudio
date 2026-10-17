import { useEffect, useState, useCallback } from 'react';
import { serviceCanonicalOrder } from '../data/content.js';

const prefix = 'riwaz_admin_';

const apiEndpoints = {
  gallery: '/api/gallery',
  services: '/api/services',
  blogs: '/api/blogs',
  testimonials: '/api/testimonials',
  messages: '/api/contact',
  settings: '/api/settings'
};

export function getIndianTime(val, fallbackId) {
  try {
    if (typeof val === 'string' && val !== 'Today' && (val.includes('|') || val.toLowerCase().includes('m'))) {
      return val;
    }
    let dateObj = null;
    if (val && val !== 'Today' && !isNaN(new Date(val).getTime())) {
      dateObj = new Date(val);
    } else if (typeof fallbackId === 'string' && fallbackId.includes('-')) {
      const parts = fallbackId.split('-');
      const ts = Number(parts[parts.length - 1]);
      if (!isNaN(ts) && ts > 1000000000000) {
        dateObj = new Date(ts);
      }
    }
    if (!dateObj) dateObj = new Date();

    return dateObj.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', ' |');
  } catch {
    return new Date().toLocaleDateString('en-IN');
  }
}

function getTimestamp(item) {
  const id = String(item.id || item._id || '');
  const match = id.match(/\d{13,}/);
  if (match) return Number(match[0]);
  if (item.createdAt && !isNaN(new Date(item.createdAt).getTime())) {
    return new Date(item.createdAt).getTime();
  }
  return 0;
}

function sortRecords(items, type) {
  return [...items].sort((a, b) => {
    if (type === 'services') {
      const titleA = (a.title || a.name || '').trim().toLowerCase();
      const titleB = (b.title || b.name || '').trim().toLowerCase();
      const ordA = serviceCanonicalOrder[titleA] ?? Number(a.order ?? 999);
      const ordB = serviceCanonicalOrder[titleB] ?? Number(b.order ?? 999);
      if (ordA !== ordB) return ordA - ordB;
    }
    const orderA = Number(a.order ?? 0);
    const orderB = Number(b.order ?? 0);
    if (orderA !== orderB) return orderA - orderB;
    // Tie-breaker: put newly created Admin records (with timestamps) first
    return getTimestamp(b) - getTimestamp(a);
  });
}

export function normalizeRecords(records, type) {
  if (!Array.isArray(records)) return [];
  return records.map((item, index) => {
    const id = item.id || item._id || `${type}-${index + 1}`;
    const updatedAt = getIndianTime(item.updatedAt || item.createdAt, id);
    const rawImg = item.image || item.bannerImage || item.featuredImage || item.profileImage || item.url || '';
    const imgStr = typeof rawImg === 'object' && rawImg !== null ? (rawImg.url || rawImg.src || '') : (rawImg || '');
    const status = item.status || (item.isActive !== false ? 'published' : 'draft');
    const name = item.name || item.clientName || item.title || '';
    const role = item.role || item.designation || item.profession || '';
    const quote = item.quote || item.message || item.review || '';
    const canonicalOrder = type === 'services' ? (serviceCanonicalOrder[(item.title || name).trim().toLowerCase()] ?? undefined) : undefined;
    const order = Number(item.order ?? item.sortOrder ?? item.displayOrder ?? canonicalOrder ?? (index + 1));
    
    return {
      ...item,
      id,
      _id: item._id || id,
      status,
      isActive: status !== 'draft',
      featured: Boolean(item.featured),
      order: Number(item.order ?? item.sortOrder ?? item.displayOrder ?? 0),
      image: imgStr || (typeof item.image === 'string' ? item.image : '') || '',
      bannerImage: imgStr || (typeof item.bannerImage === 'string' ? item.bannerImage : '') || '',
      featuredImage: imgStr || (typeof item.featuredImage === 'string' ? item.featuredImage : '') || '',
      profileImage: imgStr || (typeof item.profileImage === 'string' ? item.profileImage : '') || '',
      shortDescription: item.shortDescription || item.excerpt || '',
      readTime: Number(item.readTime || item.readingTime || 1),
      message: quote || item.message || '',
      quote: quote,
      name: name,
      clientName: name,
      designation: role || item.designation || '',
      role: role,
      rating: Number(item.rating ?? 5),
      updatedAt
    };
  });
}

export function getDeletedIds(type) {
  try {
    const raw = localStorage.getItem(`${prefix}deleted_${type}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markDeleted(type, id) {
  try {
    const deleted = getDeletedIds(type);
    if (id && !deleted.includes(String(id))) {
      localStorage.setItem(`${prefix}deleted_${type}`, JSON.stringify([...deleted, String(id)]));
    }
  } catch {
    // ignore
  }
}

export function unmarkDeleted(type, id) {
  try {
    const deleted = getDeletedIds(type);
    if (id && deleted.includes(String(id))) {
      localStorage.setItem(`${prefix}deleted_${type}`, JSON.stringify(deleted.filter((item) => item !== String(id))));
    }
  } catch {
    // ignore
  }
}

export function mergeWithLocal(type, serverRecords, fallback = []) {
  const serverNormalized = normalizeRecords(serverRecords, type);
  const localNormalized = loadCollection(type, fallback);
  const deletedIds = getDeletedIds(type);

  const map = new Map();
  const existingNames = new Set();

  // 1. First load local records so Admin's newly added items take top priority
  localNormalized.forEach((item) => {
    const id = String(item.id || item._id);
    const nameKey = (item.title || item.name || item.clientName || '').trim().toLowerCase();
    if (type === 'services' && nameKey === 'baby shoot editing') return;
    if (!deletedIds.includes(id) && !deletedIds.includes(String(item._id))) {
      map.set(id, item);
      if (nameKey) existingNames.add(nameKey);
    }
  });

  // 2. Append server records if not already present by ID or exact title/name duplicate
  serverNormalized.forEach((item) => {
    const id = String(item.id || item._id);
    const nameKey = (item.title || item.name || item.clientName || '').trim().toLowerCase();
    if (type === 'services' && nameKey === 'baby shoot editing') return;
    if (!map.has(id) && !deletedIds.includes(id) && !deletedIds.includes(String(item._id))) {
      if (!nameKey || !existingNames.has(nameKey)) {
        map.set(id, item);
        if (nameKey) existingNames.add(nameKey);
      }
    }
  });

  // 3. Append fallback records so all services always show even if server/local cache is incomplete
  if (Array.isArray(fallback) && fallback.length > 0) {
    const fallbackNormalized = normalizeRecords(fallback, type);
    fallbackNormalized.forEach((item) => {
      const id = String(item.id || item._id);
      const nameKey = (item.title || item.name || item.clientName || '').trim().toLowerCase();
      if (type === 'services' && nameKey === 'baby shoot editing') return;
      if (!map.has(id) && !deletedIds.includes(id) && !deletedIds.includes(String(item._id))) {
        if (!nameKey || !existingNames.has(nameKey)) {
          map.set(id, item);
          if (nameKey) existingNames.add(nameKey);
        }
      }
    });
  }

  if (type === 'gallery') {
    const categoryMap = {
      'weddings': 'Wedding',
      'pre wedding': 'Pre-Wedding',
      'pre-wedding': 'Pre-Wedding',
      'portraits': 'Portrait',
      'fashion': 'Retouching',
      'retouch': 'Retouching',
      'skin retouch': 'Retouching',
      'color correction': 'Color Grading',
      'color grading': 'Color Grading',
      'creative': 'Creative Edits',
      'commercial': 'Creative Edits',
      'nature': 'Creative Edits',
      'travel': 'Creative Edits',
      'events': 'Creative Edits',
      'product': 'Creative Edits',
      'baby': 'Portrait',
      'kids': 'Portrait',
      'social': 'Instagram Posts',
      'instagram': 'Instagram Posts',
      'instagram post design': 'Instagram Posts',
      'instagram posts': 'Instagram Posts'
    };
    const items = Array.from(map.values()).map((item) => {
      const rawCat = (item.category || '').trim().toLowerCase();
      const mapped = categoryMap[rawCat];
      return mapped ? { ...item, category: mapped } : item;
    });
    return sortRecords(items, type);
  }

  return sortRecords(Array.from(map.values()), type);
}

export function loadCollection(type, fallback = []) {
  try {
    const saved = localStorage.getItem(`${prefix}${type}`);
    let raw = saved ? JSON.parse(saved) : fallback;
    if (!Array.isArray(raw) || (raw.length === 0 && fallback.length > 0 && type !== 'messages')) {
      raw = fallback;
      localStorage.setItem(`${prefix}${type}`, JSON.stringify(raw));
    } else if (Array.isArray(fallback) && fallback.length > 0) {
      if (type === 'services') {
        // Strip out old deprecated Baby Shoot Editing completely so it never duplicates Kids Photo Editing
        raw = raw.filter((item) => {
          const key = (item.title || item.name || '').trim().toLowerCase();
          return key !== 'baby shoot editing';
        });
        const rawMap = new Map();
        raw.forEach((item) => {
          const key = (item.title || item.name || '').trim().toLowerCase();
          if (key) rawMap.set(key, item);
        });
        fallback.forEach((fb, idx) => {
          const key = (fb.title || fb.name || '').trim().toLowerCase();
          const existing = rawMap.get(key);
          if (existing) {
            existing.order = fb.order ?? (idx + 1);
            existing.description = fb.description;
            existing.features = fb.features;
            existing.category = fb.category;
            // Always ensure the matched professional photo is assigned
            if (fb.image) existing.image = fb.image;
          } else if (key) {
            raw.push({ ...fb, order: fb.order ?? (idx + 1) });
          }
        });
        raw.sort((a, b) => {
          const titleA = (a.title || '').trim().toLowerCase();
          const titleB = (b.title || '').trim().toLowerCase();
          return (serviceCanonicalOrder[titleA] ?? 999) - (serviceCanonicalOrder[titleB] ?? 999);
        });
        localStorage.setItem(`${prefix}${type}`, JSON.stringify(raw));
      } else if (type === 'gallery') {
        const categoryMap = {
          'weddings': 'Wedding',
          'pre wedding': 'Pre-Wedding',
          'pre-wedding': 'Pre-Wedding',
          'portraits': 'Portrait',
          'fashion': 'Retouching',
          'retouch': 'Retouching',
          'skin retouch': 'Retouching',
          'color correction': 'Color Grading',
          'color grading': 'Color Grading',
          'creative': 'Creative Edits',
          'commercial': 'Creative Edits',
          'nature': 'Creative Edits',
          'travel': 'Creative Edits',
          'events': 'Creative Edits',
          'product': 'Creative Edits',
          'baby': 'Portrait',
          'kids': 'Portrait',
          'social': 'Instagram Posts',
          'instagram': 'Instagram Posts',
          'instagram post design': 'Instagram Posts',
          'instagram posts': 'Instagram Posts'
        };
        let updated = false;
        raw = raw.map((item) => {
          const rawCat = (item.category || '').trim().toLowerCase();
          const mapped = categoryMap[rawCat];
          if (mapped && mapped !== item.category) {
            updated = true;
            return { ...item, category: mapped };
          }
          return item;
        });
        const rawTitles = new Set(
          raw.map((item) => (item.title || item.name || '').trim().toLowerCase()).filter(Boolean)
        );
        fallback.forEach((item) => {
          const titleKey = (item.title || item.name || '').trim().toLowerCase();
          if (titleKey && !rawTitles.has(titleKey)) {
            raw.push(item);
            rawTitles.add(titleKey);
            updated = true;
          }
        });
        if (updated) {
          localStorage.setItem(`${prefix}${type}`, JSON.stringify(raw));
        }
      } else {
        const rawNames = new Set(
          raw.map((item) => (item.title || item.name || item.clientName || '').trim().toLowerCase()).filter(Boolean)
        );
        let updated = false;
        fallback.forEach((item) => {
          const nameKey = (item.title || item.name || item.clientName || '').trim().toLowerCase();
          if (nameKey && !rawNames.has(nameKey)) {
            raw.push(item);
            rawNames.add(nameKey);
            updated = true;
          }
        });
        if (updated) {
          localStorage.setItem(`${prefix}${type}`, JSON.stringify(raw));
        }
      }
    }
    const normalized = normalizeRecords(raw, type);
    const deletedIds = getDeletedIds(type);
    return sortRecords(normalized.filter((item) => !deletedIds.includes(String(item.id)) && !deletedIds.includes(String(item._id))), type);
  } catch {
    return sortRecords(normalizeRecords(fallback, type), type);
  }
}

export function saveCollection(type, records) {
  try {
    localStorage.setItem(`${prefix}${type}`, JSON.stringify(records));
    window.dispatchEvent(new CustomEvent('riwaz:data', { detail: { type } }));
  } catch {
    // ignore quota error
  }
}

export function upsertRecord(type, record, fallback = []) {
  const records = loadCollection(type, fallback);
  const nextId = record.id || record._id || `${type}-${Date.now()}`;
  const nextRecord = {
    ...record,
    id: nextId,
    _id: record._id || nextId,
    updatedAt: getIndianTime(record.updatedAt || record.createdAt || new Date(), nextId)
  };
  unmarkDeleted(type, nextId);
  if (record._id) unmarkDeleted(type, record._id);

  const exists = records.some((item) => item.id === nextRecord.id || item._id === nextRecord.id);
  const next = exists
    ? records.map((item) => (item.id === nextRecord.id || item._id === nextRecord.id ? nextRecord : item))
    : [nextRecord, ...records];
  const sorted = sortRecords(next, type);
  saveCollection(type, sorted);
  return sorted;
}

export function deleteRecord(type, id, fallback = []) {
  markDeleted(type, id);
  const next = loadCollection(type, fallback).filter((item) => item.id !== id && item._id !== id);
  saveCollection(type, next);
  return next;
}

export function useApiCollection(type, fallback = [], options = { onlyActive: false }) {
  const [items, setItems] = useState(() => loadCollection(type, fallback));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFromApi = useCallback(async () => {
    const endpoint = apiEndpoints[type];
    if (!endpoint) {
      setLoading(false);
      return;
    }
    try {
      const query = '?limit=100';
      const res = await fetch(`${endpoint}${query}`);
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      const json = await res.json();
      const serverItems = json.data?.items || json.data || [];
      if (Array.isArray(serverItems) && (serverItems.length > 0 || type === 'messages')) {
        const merged = mergeWithLocal(type, serverItems, fallback);
        saveCollection(type, merged);
        setItems(merged);
        setError(null);
      } else if (items.length === 0) {
        setItems(loadCollection(type, fallback));
      }
    } catch (err) {
      if (items.length === 0 && fallback.length === 0) {
        setError(err.message || 'Failed to load dynamic content from server.');
      }
    } finally {
      setLoading(false);
    }
  }, [type, fallback, items.length]);

  useEffect(() => {
    fetchFromApi();
    const refresh = (event) => {
      if (!event.detail?.type || event.detail.type === type) {
        setItems(loadCollection(type, fallback));
      }
    };
    window.addEventListener('storage', refresh);
    window.addEventListener('riwaz:data', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('riwaz:data', refresh);
    };
  }, [type, fetchFromApi, fallback]);

  const displayedItems = options.onlyActive
    ? items.filter((item) => item.status !== 'draft' && item.isActive !== false)
    : items;

  return { items: displayedItems, loading, error, refetch: fetchFromApi };
}

export function useStoredCollection(type, fallback) {
  const { items } = useApiCollection(type, fallback, { onlyActive: false });
  return items;
}
