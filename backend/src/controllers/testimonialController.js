import Testimonial from '../models/Testimonial.js';
import { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import { create, getById, list, remove, update } from './crudFactory.js';

const mapTestimonial = async (req) => {
  const payload = { ...req.body };
  const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
  if (file) {
    const uploaded = await uploadToCloudinary(file, 'riwaz-studio/testimonials');
    payload.image = uploaded;
    payload.profileImage = uploaded;
  } else if (typeof payload.image === 'string' && payload.image.trim()) {
    payload.image = { url: payload.image.trim(), publicId: null };
    payload.profileImage = payload.image;
  } else if (typeof payload.profileImage === 'string' && payload.profileImage.trim()) {
    payload.image = { url: payload.profileImage.trim(), publicId: null };
    payload.profileImage = payload.image;
  } else if (typeof payload.url === 'string' && payload.url.trim() && !payload.image) {
    payload.image = { url: payload.url.trim(), publicId: null };
    payload.profileImage = payload.image;
  }
  if (!payload.message && payload.review) payload.message = payload.review;
  if (!payload.review && payload.message) payload.review = payload.message;
  if (!payload.designation && payload.profession) payload.designation = payload.profession;
  if (!payload.profession && payload.designation) payload.profession = payload.designation;
  if (payload.isActive === true || payload.isActive === 'true') {
    payload.isActive = true;
    payload.status = 'published';
  } else if (payload.isActive === false || payload.isActive === 'false') {
    payload.isActive = false;
    payload.status = 'draft';
  }
  return payload;
};

export const getTestimonials = list(Testimonial, { order: 1, featured: -1, createdAt: -1 });
export const getTestimonialById = getById(Testimonial, 'Testimonial');
export const createTestimonial = create(Testimonial, 'Testimonial', mapTestimonial);
export const updateTestimonial = update(Testimonial, 'Testimonial', mapTestimonial);
export const deleteTestimonial = remove(Testimonial, 'Testimonial');
