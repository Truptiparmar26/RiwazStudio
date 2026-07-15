import ApiError from '../utils/ApiError.js';

export function adminOnly(req, _res, next) {
  if (req.admin?.role !== 'admin') return next(new ApiError(403, 'Admin access required'));
  next();
}
