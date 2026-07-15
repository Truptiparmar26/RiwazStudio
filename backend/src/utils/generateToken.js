import jwt from 'jsonwebtoken';

export function generateAccessToken(admin) {
  return jwt.sign({ id: admin._id, role: admin.role, email: admin.email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m'
  });
}

export function generateRefreshToken(admin) {
  return jwt.sign({ id: admin._id, tokenVersion: admin.tokenVersion || 0 }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '7d'
  });
}

export function setRefreshTokenCookie(res, token) {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}
