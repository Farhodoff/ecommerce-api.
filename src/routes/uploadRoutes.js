const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Rasm yuklanmadi' });
  }
  res.json({
    message: 'Rasm muvaffaqiyatli yuklandi',
    image: `/${req.file.path}`,
  });
});

module.exports = router;
