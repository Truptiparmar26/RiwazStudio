import multer from 'multer';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import cloudinary, { hasCloudinaryConfig } from '../config/cloudinary.js';
import ApiError from '../utils/ApiError.js';

const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const docTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!imageTypes.includes(file.mimetype)) return cb(new ApiError(400, 'Only jpg, jpeg, png, and webp images are allowed'));
    cb(null, true);
  }
});

export const uploadAny = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!imageTypes.includes(file.mimetype) && !docTypes.includes(file.mimetype)) {
      return cb(new ApiError(400, 'Only images, PDFs, and Word documents are allowed'));
    }
    cb(null, true);
  }
});

export async function uploadToCloudinary(file, folder = 'riwaz-studio') {
  if (!file) return undefined;
  
  const isImage = imageTypes.includes(file.mimetype);
  let uploadBuffer = file.buffer;
  let resourceType = 'auto';

  if (isImage) {
    let optimized = await sharp(file.buffer)
      .rotate()
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6, smartSubsample: true })
      .toBuffer();

    if (optimized.length > 250 * 1024) {
      optimized = await sharp(file.buffer)
        .rotate()
        .resize({ width: 1080, withoutEnlargement: true })
        .webp({ quality: 72, effort: 6, smartSubsample: true })
        .toBuffer();
    }
    uploadBuffer = optimized;
    resourceType = 'image';
  } else {
    resourceType = 'raw';
  }

  if (!hasCloudinaryConfig()) {
    return { url: `local-preview://${uuid()}-${file.originalname}`, publicId: null };
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, public_id: uuid() + '-' + file.originalname.replace(/[^a-zA-Z0-9.]/g, ''), resource_type: resourceType }, 
      (error, result) => {
        if (error) reject(error);
        else resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(uploadBuffer);
  });
}
