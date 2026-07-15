import { useEffect, useState } from 'react';

const prefix = 'riwaz_admin_';

export function normalizeRecords(records, type) {
  return records.map((item, index) => ({
    id: item.id || item._id || `${type}-${index + 1}`,
    status: item.status || 'published',
    featured: Boolean(item.featured),
    updatedAt: item.updatedAt || 'Today',
    ...item
  }));
}

export function loadCollection(type, fallback = []) {
  try {
    const saved = localStorage.getItem(`${prefix}${type}`);
    return saved ? JSON.parse(saved) : normalizeRecords(fallback, type);
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
  const nextRecord = {
    ...record,
    id: record.id || `${type}-${Date.now()}`,
    updatedAt: 'Today'
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
