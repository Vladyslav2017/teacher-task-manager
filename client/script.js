// client/script.js

// Отримання форм з DOM
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// URL бекенду
const API_URL = 'http://localhost:5000/api';

// ======== Форма реєстрації ========
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const user = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) registerForm.reset();
  } catch (err) {
    alert('Помилка реєстрації');
  }
});

// ======== Форма входу ========
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Успішний вхід');
      loginForm.reset();
      fetchTasks(); // Завантажити задачі після входу
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert('Помилка входу');
  }
});

// ======== Форма задач ========
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(taskForm);
  const task = {
    title: formData.get('title'),
    description: formData.get('description')
  };

  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();
    if (res.ok) {
      alert('Задачу додано');
      taskForm.reset();
      fetchTasks(); // Перезавантажити список задач
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert('Помилка при додаванні задачі');
  }
});

// ======== Отримати всі задачі ========
async function fetchTasks() {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await fetch(`${API_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const tasks = await res.json();
    taskList.innerHTML = '';

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${task.title}</strong>: ${task.description}`;
      taskList.appendChild(li);
    });
  } catch (err) {
    console.error('Помилка при отриманні задач:', err);
  }
}

// Автоматично завантажити задачі, якщо токен є
if (localStorage.getItem('token')) {
  fetchTasks();
}
