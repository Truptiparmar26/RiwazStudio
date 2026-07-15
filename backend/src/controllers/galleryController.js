import Gallery from '../models/Gallery.js';
import { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import { create, getById, list, remove, update } from './crudFactory.js';

const mapGallery = async (req) => {
  const payload = { ...req.body };
  if (typeof payload.tags === 'string') payload.tags = payload.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
  if (req.file) payload.image = await uploadToCloudinary(req.file, 'riwaz-studio/gallery');
  return payload;
};

export const getGallery = list(Gallery, { sortOrder: 1, createdAt: -1 });
export const getGalleryById = getById(Gallery, 'Gallery item');
export const createGallery = create(Gallery, 'Gallery item', mapGallery);
export const updateGallery = update(Gallery, 'Gallery item', mapGallery);
export const deleteGallery = remove(Gallery, 'Gallery item');
