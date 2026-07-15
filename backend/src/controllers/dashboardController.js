import Blog from '../models/Blog.js';
import Contact from '../models/Contact.js';
import Gallery from '../models/Gallery.js';
import Newsletter from '../models/Newsletter.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';
import ApiResponse from '../utils/ApiResponse.js';

export async function getDashboard(_req, res, next) {
  try {
    const [totalGalleryImages, totalServices, totalBlogs, totalTestimonials, unreadMessages, newsletterSubscribers, recentMessages, recentGalleryUploads, monthlyAnalytics] = await Promise.all([
      Gallery.countDocuments(),
      Service.countDocuments(),
      Blog.countDocuments(),
      Testimonial.countDocuments(),
      Contact.countDocuments({ status: 'unread' }),
      Newsletter.countDocuments({ status: 'subscribed' }),
      Contact.find().sort({ createdAt: -1 }).limit(6).lean(),
      Gallery.find().sort({ createdAt: -1 }).limit(8).lean(),
      Contact.aggregate([
        { $match: { createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) } } },
        { $group: { _id: { month: { $month: '$createdAt' } }, messages: { $sum: 1 } } },
        { $sort: { '_id.month': 1 } }
      ])
    ]);

    return ApiResponse.ok(res, 'Dashboard fetched', {
      totalGalleryImages,
      totalServices,
      totalBlogs,
      totalTestimonials,
      unreadMessages,
      newsletterSubscribers,
      recentMessages,
      recentGalleryUploads,
      monthlyAnalytics,
      chartsData: monthlyAnalytics
    });
  } catch (error) {
    next(error);
  }
}
