import Newsletter from '../models/Newsletter.js';
import ApiResponse from '../utils/ApiResponse.js';
import { getPagination, getPagingData } from '../utils/pagination.js';

export async function subscribeNewsletter(req, res, next) {
  try {
    const subscriber = await Newsletter.findOneAndUpdate(
      { email: req.body.email.toLowerCase() },
      { email: req.body.email.toLowerCase(), status: 'subscribed' },
      { new: true, upsert: true, runValidators: true }
    );
    return ApiResponse.created(res, 'Subscribed successfully', { subscriber });
  } catch (error) {
    next(error);
  }
}

export async function getNewsletter(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const [items, total] = await Promise.all([
      Newsletter.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Newsletter.countDocuments()
    ]);
    return ApiResponse.ok(res, 'Subscribers fetched', getPagingData(items, total, page, limit));
  } catch (error) {
    next(error);
  }
}

export async function unsubscribeNewsletter(req, res, next) {
  try {
    await Newsletter.findOneAndUpdate({ email: req.body.email?.toLowerCase() }, { status: 'unsubscribed' });
    return ApiResponse.ok(res, 'Unsubscribed successfully');
  } catch (error) {
    next(error);
  }
}

export async function deleteNewsletter(req, res, next) {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    return ApiResponse.ok(res, 'Subscriber deleted');
  } catch (error) {
    next(error);
  }
}
