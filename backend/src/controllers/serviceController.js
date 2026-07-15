import Service from '../models/Service.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import { create, list, remove, update } from './crudFactory.js';

const mapService = async (req) => {
  const payload = { ...req.body };
  if (typeof payload.features === 'string') payload.features = payload.features.split(',').map((item) => item.trim()).filter(Boolean);
  if (req.file) payload.bannerImage = await uploadToCloudinary(req.file, 'riwaz-studio/services');
  return payload;
};

export const getServices = list(Service, { displayOrder: 1, createdAt: -1 });
export const createService = create(Service, 'Service', mapService);
export const updateService = update(Service, 'Service', mapService);
export const deleteService = remove(Service, 'Service');

export async function getServiceBySlug(req, res, next) {
  try {
    const item = await Service.findOne({ slug: req.params.slug });
    if (!item) throw new ApiError(404, 'Service not found');
    return ApiResponse.ok(res, 'Service fetched', { item });
  } catch (error) {
    next(error);
  }
}
