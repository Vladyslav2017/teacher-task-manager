// Імпортуємо mongoose для створення схеми
const mongoose = require('mongoose');

// Створюємо схему задачі
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Назва обов'язкова
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date, // Дата дедлайну (необов'язково)
  },
  completed: {
    type: Boolean,
    default: false, // За замовчуванням задача не виконана
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Зв'язок з користувачем
    required: true,
  },
}, {
  timestamps: true // Автоматично додає createdAt і updatedAt
});

// Експортуємо модель Task на основі схеми
module.exports = mongoose.model('Task', taskSchema);
