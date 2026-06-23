const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (userId, orderData) => {
  const { orderItems, shippingAddress } = orderData;

  if (!orderItems || orderItems.length === 0) {
    throw new Error('No order items');
  }

  // Verify products exist and calculate total price
  let totalPrice = 0;
  const verifiedItems = [];

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new Error(`Product not found: ${item.product}`);
    }
    if (product.countInStock < item.qty) {
      throw new Error(`${product.name} omborda yetarli emas. Mavjud: ${product.countInStock}`);
    }

    verifiedItems.push({
      product: product._id,
      name: product.name,
      qty: item.qty,
      price: product.price,
    });

    totalPrice += product.price * item.qty;

    // Reduce stock count
    product.countInStock -= item.qty;
    await product.save();
  }

  const order = new Order({
    user: userId,
    orderItems: verifiedItems,
    shippingAddress,
    totalPrice,
  });

  return await order.save();
};

const getOrderById = async (id) => {
  const order = await Order.findById(id).populate('user', 'name email');
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

const getMyOrders = async (userId) => {
  return await Order.find({ user: userId }).sort({ createdAt: -1 });
};

const getAllOrders = async () => {
  return await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
};

const updateOrderStatus = async (id, status) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new Error('Order not found');
  }

  order.status = status;

  if (status === 'delivered') {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }

  return await order.save();
};

const markOrderAsPaid = async (id) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new Error('Order not found');
  }

  order.isPaid = true;
  order.paidAt = Date.now();

  return await order.save();
};

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  markOrderAsPaid,
};
