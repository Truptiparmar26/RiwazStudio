import mongoose from 'mongoose';
import Service from '../models/Service.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import { create, list, remove, update } from './crudFactory.js';

const mapService = async (req) => {
  const payload = { ...req.body };
  if (typeof payload.features === 'string') payload.features = payload.features.split(',').map((item) => item.trim()).filter(Boolean);
  const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
  if (file) {
    const uploaded = await uploadToCloudinary(file, 'riwaz-studio/services');
    payload.bannerImage = uploaded;
    payload.image = uploaded;
  } else if (typeof payload.image === 'string' && payload.image.trim()) {
    payload.bannerImage = { url: payload.image.trim(), publicId: null };
    payload.image = payload.bannerImage;
  } else if (typeof payload.bannerImage === 'string' && payload.bannerImage.trim()) {
    payload.bannerImage = { url: payload.bannerImage.trim(), publicId: null };
    payload.image = payload.bannerImage;
  }
  if (payload.order !== undefined && payload.displayOrder === undefined) payload.displayOrder = payload.order;
  if (payload.displayOrder !== undefined && payload.order === undefined) payload.order = payload.displayOrder;
  if (payload.isActive === true || payload.isActive === 'true') {
    payload.isActive = true;
    payload.status = 'published';
  } else if (payload.isActive === false || payload.isActive === 'false') {
    payload.isActive = false;
    payload.status = 'draft';
  }
  return payload;
};

export const getServices = list(Service, { displayOrder: 1, order: 1, createdAt: -1 });
export const createService = create(Service, 'Service', mapService);
export const updateService = update(Service, 'Service', mapService);
export const deleteService = remove(Service, 'Service');

export async function getServiceBySlug(req, res, next) {
  try {
    const param = req.params.slug;
    const query = mongoose.isValidObjectId(param) ? { $or: [{ _id: param }, { slug: param }] } : { slug: param };
    const item = await Service.findOne(query);
    if (!item) throw new ApiError(404, 'Service not found');
    return ApiResponse.ok(res, 'Service fetched', { item });
  } catch (error) {
    next(error);
  }
}
