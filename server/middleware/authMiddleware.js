// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Перевірка наявності токена
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Немає токена авторизації' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Перевірка токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Додаємо інформацію про користувача в запит
    next();
  } catch (err) {
    res.status(401).json({ message: 'Недійсний токен' });
  }
};

module.exports = authMiddleware;
