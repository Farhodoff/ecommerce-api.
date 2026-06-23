const nodemailer = require('nodemailer');

// Transporter yaratish (hozircha Ethereal test email ishlatamiz)
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: process.env.EMAIL_PORT || 587,
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || '',
    },
  });
};

const sendWelcomeEmail = async (toEmail, userName) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: '"E-Commerce Do\'kon" <noreply@ecommerce.uz>',
    to: toEmail,
    subject: 'Xush kelibsiz!',
    html: `
      <h1>Salom, ${userName}!</h1>
      <p>Bizning E-Commerce do'konimizga xush kelibsiz.</p>
      <p>Endi siz mahsulotlarni ko'rishingiz va xarid qilishingiz mumkin.</p>
      <hr>
      <p><small>Bu avtomatik xabar. Javob bermang.</small></p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email yuborishda xatolik:', error.message);
  }
};

const sendOrderConfirmationEmail = async (toEmail, userName, orderId, totalPrice) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: '"E-Commerce Do\'kon" <noreply@ecommerce.uz>',
    to: toEmail,
    subject: `Buyurtma #${orderId} qabul qilindi`,
    html: `
      <h1>Rahmat, ${userName}!</h1>
      <p>Sizning buyurtmangiz muvaffaqiyatli qabul qilindi.</p>
      <table border="1" cellpadding="8" cellspacing="0">
        <tr><td><strong>Buyurtma ID:</strong></td><td>${orderId}</td></tr>
        <tr><td><strong>Umumiy narx:</strong></td><td>$${totalPrice}</td></tr>
        <tr><td><strong>Holat:</strong></td><td>Kutilmoqda (Pending)</td></tr>
      </table>
      <p>Buyurtmangiz holati o'zgarsa, sizga xabar beramiz.</p>
      <hr>
      <p><small>Bu avtomatik xabar. Javob bermang.</small></p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email yuborishda xatolik:', error.message);
  }
};

module.exports = { sendWelcomeEmail, sendOrderConfirmationEmail };
