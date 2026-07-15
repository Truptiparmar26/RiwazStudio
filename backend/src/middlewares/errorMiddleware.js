export function notFound(req, _res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorMiddleware(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
    errors: error.errors || undefined,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
  });
}
