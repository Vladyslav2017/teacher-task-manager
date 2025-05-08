// Імпортуємо mongoose для створення схеми моделі
const mongoose = require('mongoose');

// Створюємо схему користувача
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // обов'язкове поле
    trim: true      // прибирає пробіли на початку і в кінці
  },
  email: {
    type: String,
    required: true,
    unique: true,   // email має бути унікальним
    lowercase: true // зберігати у нижньому регістрі
  },
  password: {
    type: String,
    required: true,
    minlength: 6    // мінімальна довжина пароля
  }
}, {
  timestamps: true // автоматично додає createdAt і updatedAt
});

// Експортуємо модель
module.exports = mongoose.model('User', userSchema);
