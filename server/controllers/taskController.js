const Task = require('../models/Task');

// Отримати всі задачі користувача
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }); // ← ОНОВЛЕНО
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// Створити нову задачу
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({
      user: req.user.userId, // ← ОНОВЛЕНО
      title,
      description
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Помилка при створенні задачі:', err); // ← додай лог
    res.status(500).json({ message: 'Не вдалося створити задачу' });
  }
};

// Оновити задачу
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.userId }, // ← ОНОВЛЕНО
      { title, description },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Задачу не знайдено' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося оновити задачу' });
  }
};

// Видалити задачу
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: req.user.userId }); // ← ОНОВЛЕНО

    if (!task) return res.status(404).json({ message: 'Задачу не знайдено' });

    res.json({ message: 'Задачу видалено' });
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося видалити задачу' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
