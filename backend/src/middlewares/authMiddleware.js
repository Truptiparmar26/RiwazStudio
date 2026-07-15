import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import ApiError from '../utils/ApiError.js';

export async function protect(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new ApiError(401, 'Authentication token is required');

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password -refreshTokenHash -resetPasswordToken');
    if (!admin || !admin.isActive) throw new ApiError(401, 'Admin account is inactive or missing');

    req.admin = admin;
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired token'));
  }
}
