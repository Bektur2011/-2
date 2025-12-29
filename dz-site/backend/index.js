const express = require('express');
const cors = require('cors');
const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, login: 'admin1', password: 'password', role: 'admin', gender: 'male' },
  { id: 2, login: 'admin2', password: 'password', role: 'admin', gender: 'female' },
  { id: 3, login: 'admin3', password: 'password', role: 'admin', gender: 'male' },
  { id: 4, login: 'admin4', password: 'password', role: 'admin', gender: 'female' },
  { id: 5, login: 'admin5', password: 'password', role: 'admin', gender: 'male' },
  { id: 6, login: 'student1', password: 'password', role: 'student', gender: 'male' },
  { id: 7, login: 'student2', password: 'password', role: 'student', gender: 'female' },
  { id: 8, login: 'student3', password: 'password', role: 'student', gender: 'male' },
  { id: 9, login: 'student4', password: 'password', role: 'student', gender: 'female' },
  { id: 10, login: 'student5', password: 'password', role: 'student', gender: 'male' },
  { id: 11, login: 'student6', password: 'password', role: 'student', gender: 'female' },
  { id: 12, login: 'student7', password: 'password', role: 'student', gender: 'male' },
  { id: 13, login: 'student8', password: 'password', role: 'student', gender: 'female' },
  { id: 14, login: 'student9', password: 'password', role: 'student', gender: 'male' },
  { id: 15, login: 'student10', password: 'password', role: 'student', gender: 'female' },
  { id: 16, login: 'student11', password: 'password', role: 'student', gender: 'male' },
  { id: 17, login: 'student12', password: 'password', role: 'student', gender: 'female' },
  { id: 18, login: 'student13', password: 'password', role: 'student', gender: 'male' },
  { id: 19, login: 'student14', password: 'password', role: 'student', gender: 'female' },
  { id: 20, login: 'student15', password: 'password', role: 'student', gender: 'male' },
  { id: 21, login: 'student16', password: 'password', role: 'student', gender: 'female' },
  { id: 22, login: 'student17', password: 'password', role: 'student', gender: 'male' },
  { id: 23, login: 'student18', password: 'password', role: 'student', gender: 'female' },
  { id: 24, login: 'student19', password: 'password', role: 'student', gender: 'male' },
  { id: 25, login: 'student20', password: 'password', role: 'student', gender: 'female' },
  { id: 26, login: 'student21', password: 'password', role: 'student', gender: 'male' },
  { id: 27, login: 'student22', password: 'password', role: 'student', gender: 'female' },
  { id: 28, login: 'student23', password: 'password', role: 'student', gender: 'male' },
  { id: 29, login: 'student24', password: 'password', role: 'student', gender: 'female' },
  { id: 30, login: 'student25', password: 'password', role: 'student', gender: 'male' },
  { id: 31, login: 'student26', password: 'password', role: 'student', gender: 'female' }
];

let homeworks = [];

app.get('/', (req, res) => {
  res.send('Привет от backend dz-site!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.login === username && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Неверные учетные данные' });
  }
});

app.get('/homeworks', (req, res) => {
  res.json(homeworks);
});

app.post('/homeworks', (req, res) => {
  const homework = req.body;
  homeworks.push(homework);
  res.json({ success: true, homework });
});

app.delete('/homeworks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  homeworks = homeworks.filter(h => h.id !== id);
  res.json({ success: true });
});

const fs = require('fs');
const path = require('path');

const adminMessagePath = path.join(__dirname, 'adminMessage.json');

app.get('/admin-message', (req, res) => {
  fs.readFile(adminMessagePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read message' });
    }
    const message = JSON.parse(data).message;
    res.json({ message });
  });
});

app.post('/admin-message', (req, res) => {
  const { message } = req.body;
  fs.writeFile(adminMessagePath, JSON.stringify({ message }), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save message' });
    }
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
