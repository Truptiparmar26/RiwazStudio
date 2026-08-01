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
  let optimized = await sharp(file.buffer)
    .rotate()
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6, smartSubsample: true })
    .toBuffer();

  // Ensure image filesize strictly stays well within small KBs while preserving high studio clarity
  if (optimized.length > 250 * 1024) {
    optimized = await sharp(file.buffer)
      .rotate()
      .resize({ width: 1080, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6, smartSubsample: true })
      .toBuffer();
  }

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
