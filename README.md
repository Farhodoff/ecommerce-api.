# 🛒 E-Commerce API

Professional darajadagi E-Commerce (Onlayn Do'kon) REST API — Node.js, Express va MongoDB asosida qurilgan.

## ✨ Xususiyatlari

- 🔐 **Authentication** — JWT asosida Register/Login, Access Token
- 📦 **Mahsulotlar CRUD** — Qo'shish, ko'rish, yangilash, o'chirish
- 🔍 **Qidirish & Filtrlash** — Nomi, narxi bo'yicha qidirish, Pagination
- 🛒 **Buyurtmalar** — Savat, buyurtma berish, ombor nazorati
- ⭐ **Sharhlar & Baho** — 1-5 yulduz, o'rtacha reyting avtomatik hisoblanadi
- 📸 **Rasm yuklash** — Multer orqali (jpg/png/webp, max 5MB)
- 📧 **Email** — Nodemailer orqali xush kelibsiz va buyurtma tasdiqlash xatlari
- 💳 **To'lov** — Stripe integratsiyasi
- 📖 **API Docs** — Swagger UI (`/api-docs`)
- 🛡️ **Xavfsizlik** — CORS, Admin/User rollari, markaziy xatolik boshqarish
- 📋 **Logging** — Morgan orqali HTTP so'rovlar loglari

## 🏗️ Arxitektura

```
Client → Routes → Middlewares → Controllers → Services → Models → MongoDB
```

Loyiha **Clean Architecture** (Separation of Concerns) tamoyiliga asoslangan.

## 🚀 O'rnatish

```bash
# Klonlash
git clone https://github.com/YOUR_USERNAME/ecommerce-api.git
cd ecommerce-api

# Kutubxonalarni o'rnatish
npm install

# .env faylini yaratish
cp .env.example .env
# .env ichiga o'z kalitlaringizni yozing

# Ishga tushirish
npm run dev
```

## ⚙️ Environment Variables (.env)

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

## 📡 API Endpoints

### Authentication
| Metod | Marshrut | Vazifasi |
|-------|----------|----------|
| POST | `/api/auth/register` | Ro'yxatdan o'tish |
| POST | `/api/auth/login` | Login (JWT token olish) |

### Products
| Metod | Marshrut | Himoya | Vazifasi |
|-------|----------|--------|----------|
| GET | `/api/products` | ❌ | Barcha mahsulotlar (qidirish, filtr, pagination) |
| GET | `/api/products/:id` | ❌ | Bitta mahsulot |
| POST | `/api/products` | 🔒 Admin | Yangi mahsulot |
| PUT | `/api/products/:id` | 🔒 Admin | Yangilash |
| DELETE | `/api/products/:id` | 🔒 Admin | O'chirish |

### Orders
| Metod | Marshrut | Himoya | Vazifasi |
|-------|----------|--------|----------|
| POST | `/api/orders` | 🔒 User | Buyurtma yaratish |
| GET | `/api/orders/myorders` | 🔒 User | O'z buyurtmalarim |
| GET | `/api/orders/:id` | 🔒 User | Bitta buyurtma |
| PUT | `/api/orders/:id/pay` | 🔒 User | To'lov qilindi |
| GET | `/api/orders` | 🔒 Admin | Barcha buyurtmalar |
| PUT | `/api/orders/:id/status` | 🔒 Admin | Status o'zgartirish |

### Reviews
| Metod | Marshrut | Himoya | Vazifasi |
|-------|----------|--------|----------|
| POST | `/api/reviews/product/:id` | 🔒 User | Sharh qoldirish |
| GET | `/api/reviews/product/:id` | ❌ | Sharhlarni ko'rish |
| DELETE | `/api/reviews/:id` | 🔒 User | O'z sharhini o'chirish |

### Upload & Payment
| Metod | Marshrut | Himoya | Vazifasi |
|-------|----------|--------|----------|
| POST | `/api/upload` | 🔒 Admin | Rasm yuklash |
| POST | `/api/payment/create-payment-intent` | 🔒 User | Stripe to'lov |

## 🛠️ Texnologiyalar

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcryptjs
- **File Upload:** Multer
- **Email:** Nodemailer
- **Payment:** Stripe
- **Docs:** Swagger UI
- **Logging:** Morgan

## 📄 Litsenziya

MIT
