import BeforeAfter from '../models/BeforeAfter.js';
import { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import { create, list, remove, update } from './crudFactory.js';

const mapBeforeAfter = async (req) => {
  const payload = { ...req.body };
  if (req.files?.originalImage?.[0]) payload.originalImage = await uploadToCloudinary(req.files.originalImage[0], 'riwaz-studio/before-after/original');
  if (req.files?.editedImage?.[0]) payload.editedImage = await uploadToCloudinary(req.files.editedImage[0], 'riwaz-studio/before-after/edited');
  return payload;
};

export const getBeforeAfter = list(BeforeAfter);
export const createBeforeAfter = create(BeforeAfter, 'Before after item', mapBeforeAfter);
export const updateBeforeAfter = update(BeforeAfter, 'Before after item', mapBeforeAfter);
export const deleteBeforeAfter = remove(BeforeAfter, 'Before after item');
