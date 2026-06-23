const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Barcha marshrutlar himoyalangan (faqat login qilgan userlar)
router.route('/')
  .post(protect, orderController.createOrder)
  .get(protect, admin, orderController.getAllOrders);

router.route('/myorders')
  .get(protect, orderController.getMyOrders);

router.route('/:id')
  .get(protect, orderController.getOrderById);

router.route('/:id/pay')
  .put(protect, orderController.markOrderAsPaid);

router.route('/:id/status')
  .put(protect, admin, orderController.updateOrderStatus);

module.exports = router;
