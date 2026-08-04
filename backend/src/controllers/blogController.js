import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import { create, list, remove, update } from './crudFactory.js';

const readingTime = (content = '') => Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length / 220));

const mapBlog = async (req) => {
  const payload = { ...req.body, author: req.admin?._id };
  if (typeof payload.tags === 'string') payload.tags = payload.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
  if (payload.content) {
    payload.readingTime = readingTime(payload.content);
    payload.readTime = payload.readingTime;
  }
  if (payload.readTime !== undefined) payload.readingTime = Number(payload.readTime) || 1;
  const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
  if (file) {
    payload.featuredImage = await uploadToCloudinary(file, 'riwaz-studio/blogs');
  } else if (typeof payload.image === 'string' && payload.image.trim()) {
    payload.featuredImage = { url: payload.image.trim(), publicId: null };
  } else if (typeof payload.featuredImage === 'string' && payload.featuredImage.trim()) {
    payload.featuredImage = { url: payload.featuredImage.trim(), publicId: null };
  }
  if (payload.isActive === true || payload.isActive === 'true' || payload.isPublished === true || payload.isPublished === 'true') {
    payload.isActive = true;
    payload.isPublished = true;
    payload.status = 'published';
  } else if (payload.isActive === false || payload.isActive === 'false' || payload.isPublished === false || payload.isPublished === 'false') {
    payload.isActive = false;
    payload.isPublished = false;
    payload.status = 'draft';
  }
  return payload;
};

export const getBlogs = list(Blog, { publishDate: -1, createdAt: -1 });
export const createBlog = create(Blog, 'Blog', mapBlog);
export const updateBlog = update(Blog, 'Blog', mapBlog);
export const deleteBlog = remove(Blog, 'Blog');

export async function getBlogBySlug(req, res, next) {
  try {
    const param = req.params.slug;
    const query = mongoose.isValidObjectId(param) ? { $or: [{ _id: param }, { slug: param }] } : { slug: param };
    const item = await Blog.findOneAndUpdate(query, { $inc: { views: 1 } }, { new: true });
    if (!item) throw new ApiError(404, 'Blog not found');
    return ApiResponse.ok(res, 'Blog fetched', { item });
  } catch (error) {
    next(error);
  }
}
