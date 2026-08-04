import slugify from 'slugify';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { getPagination, getPagingData } from '../utils/pagination.js';

export function list(Model, defaultSort = { createdAt: -1 }) {
  return async (req, res, next) => {
    try {
      const { page, limit, skip } = getPagination(req.query);
      const query = {};
      if (req.query.status) query.status = req.query.status;
      if (req.query.category && req.query.category !== 'All') query.category = req.query.category;
      if (req.query.featured) query.featured = req.query.featured === 'true';
      if (req.query.isActive !== undefined) {
        if (req.query.isActive === 'true') {
          query.$or = [{ isActive: true }, { status: 'published' }, { isActive: { $exists: false }, status: { $ne: 'draft' } }];
        } else {
          query.$or = [{ isActive: false }, { status: 'draft' }];
        }
      }
      if (req.query.isPublished !== undefined) {
        if (req.query.isPublished === 'true') {
          query.$or = [{ isPublished: true }, { status: 'published' }, { isPublished: { $exists: false }, status: { $ne: 'draft' } }];
        } else {
          query.$or = [{ isPublished: false }, { status: 'draft' }];
        }
      }
      if (req.query.search) query.$text = { $search: req.query.search };
      const [items, total] = await Promise.all([
        Model.find(query).sort(defaultSort).skip(skip).limit(limit).lean(),
        Model.countDocuments(query)
      ]);
      return ApiResponse.ok(res, 'Records fetched', getPagingData(items, total, page, limit));
    } catch (error) {
      next(error);
    }
  };
}

export function getById(Model, label) {
  return async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) throw new ApiError(404, `${label} not found`);
      return ApiResponse.ok(res, 'Record fetched', { item });
    } catch (error) {
      next(error);
    }
  };
}

export function create(Model, label, mapper = (req) => req.body) {
  return async (req, res, next) => {
    try {
      const payload = await mapper(req);
      if (payload.title && !payload.slug) payload.slug = slugify(payload.title, { lower: true, strict: true });
      const item = await Model.create(payload);
      return ApiResponse.created(res, `${label} created`, { item });
    } catch (error) {
      next(error);
    }
  };
}

export function update(Model, label, mapper = (req) => req.body) {
  return async (req, res, next) => {
    try {
      const payload = await mapper(req);
      if (payload.title && !payload.slug) payload.slug = slugify(payload.title, { lower: true, strict: true });
      const item = await Model.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
      if (!item) throw new ApiError(404, `${label} not found`);
      return ApiResponse.ok(res, `${label} updated`, { item });
    } catch (error) {
      next(error);
    }
  };
}

export function remove(Model, label) {
  return async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) throw new ApiError(404, `${label} not found`);
      return ApiResponse.ok(res, `${label} deleted`);
    } catch (error) {
      next(error);
    }
  };
}
