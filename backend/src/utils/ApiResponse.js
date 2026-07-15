export default class ApiResponse {
  static send(res, statusCode, message, data = null) {
    return res.status(statusCode).json({ success: true, message, data });
  }

  static ok(res, message = 'Success', data = null) {
    return this.send(res, 200, message, data);
  }

  static created(res, message = 'Created', data = null) {
    return this.send(res, 201, message, data);
  }
}
