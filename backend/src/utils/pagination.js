export function getPagination(query) {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Math.max(Number(query.limit || 12), 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function getPagingData(items, total, page, limit) {
  return { items, total, page, pages: Math.max(1, Math.ceil(total / limit)) };
}
