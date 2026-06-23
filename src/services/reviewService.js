const Review = require('../models/Review');
const Product = require('../models/Product');

const createReview = async (userId, userName, productId, reviewData) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Tekshirish: bu user allaqachon sharh qoldirganmi
  const alreadyReviewed = await Review.findOne({ user: userId, product: productId });
  if (alreadyReviewed) {
    throw new Error('Siz bu mahsulotga allaqachon sharh qoldirgansiz');
  }

  const review = await Review.create({
    user: userId,
    product: productId,
    name: userName,
    rating: Number(reviewData.rating),
    comment: reviewData.comment,
  });

  // Mahsulotning o'rtacha bahosini yangilash
  const reviews = await Review.find({ product: productId });
  product.numReviews = reviews.length;
  product.rating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  await product.save();

  return review;
};

const getProductReviews = async (productId) => {
  return await Review.find({ product: productId }).sort({ createdAt: -1 });
};

const deleteReview = async (reviewId, userId) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }

  if (review.user.toString() !== userId.toString()) {
    throw new Error('Siz faqat o\'z sharhingizni o\'chira olasiz');
  }

  const productId = review.product;
  await review.deleteOne();

  // O'rtacha bahoni qayta hisoblash
  const reviews = await Review.find({ product: productId });
  const product = await Product.findById(productId);
  if (product) {
    product.numReviews = reviews.length;
    product.rating = reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;
    await product.save();
  }

  return { message: 'Review removed' };
};

module.exports = { createReview, getProductReviews, deleteReview };
