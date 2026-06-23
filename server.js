require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./src/config/db');
const swaggerSpec = require('./src/config/swagger');
const swaggerUi = require('swagger-ui-express');
const { notFound, errorHandler } = require('./src/middlewares/errorMiddleware');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // HTTP so'rovlarini konsolga chiqarish (Logging)

// Static folder (yuklangan rasmlar uchun)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');

// Basic Route
app.get('/', (req, res) => {
  res.json({
    message: 'E-Commerce API is running...',
    docs: '/api-docs',
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/payment', paymentRoutes);

// Swagger API Dokumentatsiya (CDN orqali - Vercel uchun)
const swaggerOptions = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-standalone-preset.js',
  ],
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

// Error Handling Middleware (eng oxirda bo'lishi kerak!)
app.use(notFound);
app.use(errorHandler);

// Vercel uchun app'ni export qilish (serverless)
module.exports = app;

// Faqat lokal muhitda (Vercel'da emas) serverni ishga tushirish
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running in development mode on port ${PORT}`);
    console.log(`API Docs: http://localhost:${PORT}/api-docs`);
  });
}
