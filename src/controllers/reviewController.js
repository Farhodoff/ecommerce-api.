const reviewService = require('../services/reviewService');

const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(
      req.user._id,
      req.user.name,
      req.params.productId,
      req.body
    );
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getProductReviews(req.params.productId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const result = await reviewService.deleteReview(req.params.id, req.user._id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createReview, getProductReviews, deleteReview };
