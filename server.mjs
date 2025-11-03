import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const __filename = import.meta.url;
const __dirname = path.dirname(new URL(__filename).pathname);

const dbPath = path.join(__dirname, 'db.json');

// Helper function to read users from db.json
const readUsers = () => {
  if (!fs.existsSync(dbPath)) {
    return [];
  }
  const dbRaw = fs.readFileSync(dbPath);
  return JSON.parse(dbRaw);
};

// Helper function to write users to db.json
const writeUsers = (users) => {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
};

// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const users = readUsers();
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: 'User created successfully.' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const users = readUsers();
  const user = users.find(user => user.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  res.status(200).json({ message: 'Login successful.', user });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
