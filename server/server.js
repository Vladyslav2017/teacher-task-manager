require('dotenv').config(); // ← Це ОК

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// ❌ ЦЕ ПОТРІБНО ВИДАЛИТИ:
// dotenv.config();

connectDB();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на порті ${PORT}`);
});
