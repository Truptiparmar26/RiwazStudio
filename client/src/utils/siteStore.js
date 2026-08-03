import { useEffect, useState } from 'react';

const prefix = 'riwaz_admin_';

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

export function normalizeRecords(records, type) {
  return records.map((item, index) => {
    const id = item.id || item._id || `${type}-${index + 1}`;
    const updatedAt = getIndianTime(item.updatedAt || item.createdAt, id);
    const rawImg = item.image || item.bannerImage || item.featuredImage || item.url || '';
    const imgStr = typeof rawImg === 'object' && rawImg !== null ? (rawImg.url || rawImg.src || '') : (rawImg || '');
    return {
      ...item,
      id,
      status: item.status || 'published',
      featured: Boolean(item.featured),
      image: imgStr || (typeof item.image === 'string' ? item.image : '') || '',
      bannerImage: imgStr || (typeof item.bannerImage === 'string' ? item.bannerImage : '') || '',
      featuredImage: imgStr || (typeof item.featuredImage === 'string' ? item.featuredImage : '') || '',
      updatedAt
    };
  });
}

export function loadCollection(type, fallback = []) {
  try {
    const saved = localStorage.getItem(`${prefix}${type}`);
    let raw = saved ? JSON.parse(saved) : fallback;
    if (!Array.isArray(raw) || (raw.length === 0 && fallback.length > 0 && type !== 'messages')) {
      raw = fallback;
      localStorage.setItem(`${prefix}${type}`, JSON.stringify(raw));
    }
    return normalizeRecords(raw, type);
  } catch {
    return normalizeRecords(fallback, type);
  }
}

export function saveCollection(type, records) {
  localStorage.setItem(`${prefix}${type}`, JSON.stringify(records));
  window.dispatchEvent(new CustomEvent('riwaz:data', { detail: { type } }));
}

export function upsertRecord(type, record, fallback = []) {
  const records = loadCollection(type, fallback);
  const nextId = record.id || `${type}-${Date.now()}`;
  const nextRecord = {
    ...record,
    id: nextId,
    updatedAt: getIndianTime(record.updatedAt || record.createdAt || new Date(), nextId)
  };
  const exists = records.some((item) => item.id === nextRecord.id);
  const next = exists ? records.map((item) => (item.id === nextRecord.id ? nextRecord : item)) : [nextRecord, ...records];
  saveCollection(type, next);
  return next;
}

export function deleteRecord(type, id, fallback = []) {
  const next = loadCollection(type, fallback).filter((item) => item.id !== id);
  saveCollection(type, next);
  return next;
}

export function useStoredCollection(type, fallback) {
  const [records, setRecords] = useState(() => loadCollection(type, fallback));

  useEffect(() => {
    const refresh = (event) => {
      if (!event.detail?.type || event.detail.type === type) setRecords(loadCollection(type, fallback));
    };
    window.addEventListener('storage', refresh);
    window.addEventListener('riwaz:data', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('riwaz:data', refresh);
    };
  }, [fallback, type]);

  return records;
}
