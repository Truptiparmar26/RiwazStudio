import Gallery from '../models/Gallery.js';
import { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import { create, getById, list, remove, update } from './crudFactory.js';

const mapGallery = async (req) => {
  const payload = { ...req.body };
  if (typeof payload.tags === 'string') payload.tags = payload.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
  const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
  if (file) {
    payload.image = await uploadToCloudinary(file, 'riwaz-studio/gallery');
  } else if (typeof payload.image === 'string' && payload.image.trim()) {
    payload.image = { url: payload.image.trim(), publicId: null };
  } else if (typeof payload.url === 'string' && payload.url.trim() && !payload.image) {
    payload.image = { url: payload.url.trim(), publicId: null };
  }
  if (payload.order !== undefined && payload.sortOrder === undefined) payload.sortOrder = payload.order;
  if (payload.sortOrder !== undefined && payload.order === undefined) payload.order = payload.sortOrder;
  if (payload.isActive === true || payload.isActive === 'true') {
    payload.isActive = true;
    payload.status = 'published';
  } else if (payload.isActive === false || payload.isActive === 'false') {
    payload.isActive = false;
    payload.status = 'draft';
  }
  return payload;
};

export const getGallery = list(Gallery, { sortOrder: 1, order: 1, createdAt: -1 });
export const getGalleryById = getById(Gallery, 'Gallery item');
export const createGallery = create(Gallery, 'Gallery item', mapGallery);
export const updateGallery = update(Gallery, 'Gallery item', mapGallery);
export const deleteGallery = remove(Gallery, 'Gallery item');
