import Testimonial from '../models/Testimonial.js';
import { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import { create, list, remove, update } from './crudFactory.js';

const mapTestimonial = async (req) => {
  const payload = { ...req.body };
  if (req.file) payload.image = await uploadToCloudinary(req.file, 'riwaz-studio/testimonials');
  return payload;
};

export const getTestimonials = list(Testimonial, { featured: -1, createdAt: -1 });
export const createTestimonial = create(Testimonial, 'Testimonial', mapTestimonial);
export const updateTestimonial = update(Testimonial, 'Testimonial', mapTestimonial);
export const deleteTestimonial = remove(Testimonial, 'Testimonial');
