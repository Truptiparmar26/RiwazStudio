import { useEffect, useState, useCallback } from 'react';

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

function sortRecords(items) {
  return [...items].sort((a, b) => {
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
    if (!deletedIds.includes(id) && !deletedIds.includes(String(item._id))) {
      map.set(id, item);
      if (nameKey) existingNames.add(nameKey);
    }
  });

  // 2. Append server records if not already present by ID or exact title/name duplicate
  serverNormalized.forEach((item) => {
    const id = String(item.id || item._id);
    const nameKey = (item.title || item.name || item.clientName || '').trim().toLowerCase();
    if (!map.has(id) && !deletedIds.includes(id) && !deletedIds.includes(String(item._id))) {
      if (!nameKey || !existingNames.has(nameKey)) {
        map.set(id, item);
        if (nameKey) existingNames.add(nameKey);
      }
    }
  });

  return sortRecords(Array.from(map.values()));
}

export function loadCollection(type, fallback = []) {
  try {
    const saved = localStorage.getItem(`${prefix}${type}`);
    let raw = saved ? JSON.parse(saved) : fallback;
    if (!Array.isArray(raw) || (raw.length === 0 && fallback.length > 0 && type !== 'messages')) {
      raw = fallback;
      localStorage.setItem(`${prefix}${type}`, JSON.stringify(raw));
    }
    const normalized = normalizeRecords(raw, type);
    const deletedIds = getDeletedIds(type);
    return sortRecords(normalized.filter((item) => !deletedIds.includes(String(item.id)) && !deletedIds.includes(String(item._id))));
  } catch {
    return sortRecords(normalizeRecords(fallback, type));
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
  const sorted = sortRecords(next);
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
