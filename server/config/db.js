const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB підключено успішно');
  } catch (error) {
    console.error('❌ Помилка підключення до MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
