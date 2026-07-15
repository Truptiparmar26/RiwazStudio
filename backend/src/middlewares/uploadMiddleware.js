import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import cloudinary, { hasCloudinaryConfig } from '../config/cloudinary.js';
import ApiError from '../utils/ApiError.js';

const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) return cb(new ApiError(400, 'Only jpg, jpeg, png, and webp images are allowed'));
    cb(null, true);
  }
});

export async function uploadToCloudinary(file, folder = 'riwaz-studio') {
  if (!file) return undefined;
  const optimized = await sharp(file.buffer).rotate().resize({ width: 2200, withoutEnlargement: true }).webp({ quality: 84 }).toBuffer();

  if (!hasCloudinaryConfig()) {
    return { url: `local-preview://${uuid()}-${file.originalname}`, publicId: null };
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, public_id: uuid(), resource_type: 'image' }, (error, result) => {
      if (error) reject(error);
      else resolve({ url: result.secure_url, publicId: result.public_id });
    });
    stream.end(optimized);
  });
}
