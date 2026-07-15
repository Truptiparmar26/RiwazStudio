import Blog from '../models/Blog.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import { create, list, remove, update } from './crudFactory.js';

const readingTime = (content = '') => Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length / 220));

const mapBlog = async (req) => {
  const payload = { ...req.body, author: req.admin?._id };
  if (typeof payload.tags === 'string') payload.tags = payload.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
  if (payload.content) payload.readingTime = readingTime(payload.content);
  if (req.file) payload.featuredImage = await uploadToCloudinary(req.file, 'riwaz-studio/blogs');
  return payload;
};

export const getBlogs = list(Blog, { publishDate: -1, createdAt: -1 });
export const createBlog = create(Blog, 'Blog', mapBlog);
export const updateBlog = update(Blog, 'Blog', mapBlog);
export const deleteBlog = remove(Blog, 'Blog');

export async function getBlogBySlug(req, res, next) {
  try {
    const item = await Blog.findOneAndUpdate({ slug: req.params.slug }, { $inc: { views: 1 } }, { new: true });
    if (!item) throw new ApiError(404, 'Blog not found');
    return ApiResponse.ok(res, 'Blog fetched', { item });
  } catch (error) {
    next(error);
  }
}
