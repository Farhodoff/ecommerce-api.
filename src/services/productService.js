const Product = require('../models/Product');

const getProducts = async (query = {}) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // Qidirish filtri
  const filter = {};
  if (query.keyword) {
    filter.name = { $regex: query.keyword, $options: 'i' };
  }
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  // Saralash
  let sort = {};
  if (query.sortBy === 'price_asc') sort = { price: 1 };
  else if (query.sortBy === 'price_desc') sort = { price: -1 };
  else if (query.sortBy === 'rating') sort = { rating: -1 };
  else sort = { createdAt: -1 };

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return {
    products,
    page,
    pages: Math.ceil(total / limit),
    total,
  };
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

const createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

const updateProduct = async (id, updateData) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }

  product.name = updateData.name || product.name;
  product.description = updateData.description || product.description;
  product.price = updateData.price || product.price;
  product.countInStock = updateData.countInStock || product.countInStock;

  return await product.save();
};

const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  await product.deleteOne();
  return { message: 'Product removed' };
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
