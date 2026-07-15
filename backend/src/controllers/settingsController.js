import Settings from '../models/Settings.js';
import { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import ApiResponse from '../utils/ApiResponse.js';

export async function getSettings(_req, res, next) {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    return ApiResponse.ok(res, 'Settings fetched', { settings });
  } catch (error) {
    next(error);
  }
}

export async function updateSettings(req, res, next) {
  try {
    const payload = { ...req.body };
    if (req.files?.logo?.[0]) payload.logo = await uploadToCloudinary(req.files.logo[0], 'riwaz-studio/settings');
    if (req.files?.favicon?.[0]) payload.favicon = await uploadToCloudinary(req.files.favicon[0], 'riwaz-studio/settings');
    const settings = await Settings.findOneAndUpdate({}, payload, { new: true, upsert: true, runValidators: true });
    return ApiResponse.ok(res, 'Settings updated', { settings });
  } catch (error) {
    next(error);
  }
}
