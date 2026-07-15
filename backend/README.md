# Riwaz Studio Backend

Production-ready MERN backend for Riwaz Studio.

## Run

```bash
npm install
npm run dev --workspace backend
```

## Admin

```txt
Email: admin@riwazstudio.com
Password: RiwazStudioo
```

## Modules

- Auth: login, logout, refresh token, forgot/reset password, change password, profile update
- Gallery CRUD with image upload, compression, Cloudinary support, search, pagination
- Before & After CRUD
- Services CRUD
- Blog CRUD with slug, views, reading time
- Testimonials CRUD
- Contact form, admin messages, mark read, reply
- Newsletter subscribe, unsubscribe, admin list/delete
- Settings single document
- Dashboard totals, recent items, analytics data

## Deployment

Set `.env` values for MongoDB Atlas, Cloudinary, SMTP, JWT secrets, and frontend URL before deploying to Render.
