const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/product/:productId')
  .post(protect, reviewController.createReview)
  .get(reviewController.getProductReviews);

router.route('/:id')
  .delete(protect, reviewController.deleteReview);

module.exports = router;
