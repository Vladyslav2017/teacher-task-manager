const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

// 🔐 Усі маршрути захищені авторизацією

// 📌 Створити нову задачу
router.post('/', authMiddleware, taskController.createTask);

// 📋 Отримати всі задачі користувача
router.get('/', authMiddleware, taskController.getTasks);

// ✏️ Оновити задачу
router.put('/:id', authMiddleware, taskController.updateTask);

// 🗑️ Видалити задачу
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
