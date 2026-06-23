const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Iltimos barcha maydonlarni to`ldiring' });
    }

    const userData = await authService.registerUser(name, email, password);
    res.status(201).json(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email va parolni kiriting' });
    }

    const userData = await authService.loginUser(email, password);
    res.status(200).json(userData);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
