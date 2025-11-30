import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware'; // Import proxy middleware

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Proxy requests to Python backend for /python-api
app.use('/python-api', createProxyMiddleware({ 
  target: 'http://localhost:5000', 
  changeOrigin: true,
  pathRewrite: { '^/python-api': '' } // remove /python-api prefix when forwarding
}));

const dbFile = 'users.json';
const freelancersDbFile = 'freelancers.json'; // Define freelancers DB file

// Helper function to read the database
async function readDB() {
  try {
    const data = await fs.readFile(dbFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []; // Return empty array if file doesn't exist
    }
    throw error;
  }
}

// Helper function to write to the database
async function writeDB(data) {
  await fs.writeFile(dbFile, JSON.stringify(data, null, 2), 'utf8');
}

// Helper functions for freelancers.json
async function readFreelancersDB() {
  try {
    const data = await fs.readFile(freelancersDbFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []; // Return empty array if file doesn't exist
    }
    throw error;
  }
}

async function writeFreelancersDB(data) {
  await fs.writeFile(freelancersDbFile, JSON.stringify(data, null, 2), 'utf8');
}

// Hash password function
function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

app.post('/api/signup', async (req, res) => {
  const { email, password, fullName, role } = req.body;

  if (!email || !password || !fullName || !role) {
    return res.status(400).json({ message: 'Email, password, full name, and role are required.' });
  }

  const db = await readDB();
  const existingUser = db.find(user => user.email === email);

  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists.' });
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashPassword(password),
    fullName,
    role,
  };

  db.push(newUser);
  await writeDB(db);

  // Return user without password
  const { password: _, ...userToReturn } = newUser;
  res.status(201).json(userToReturn);
});

app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const db = await readDB();
  const user = db.find(user => user.email === email);

  if (!user || user.password !== hashPassword(password)) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  // Return user without password
  const { password: _, ...userToReturn } = user;
  res.status(200).json(userToReturn);
});

// New endpoint for freelancer profile submission
app.post('/api/freelancer-profile', async (req, res) => {
  const { userId, skills, documentName, yearsExperience, coBuildLink } = req.body;

  if (!userId || !skills || !yearsExperience) {
    return res.status(400).json({ message: 'User ID, skills, and years of experience are required.' });
  }

  try {
    const freelancers = await readFreelancersDB();
    const existingProfileIndex = freelancers.findIndex(profile => profile.userId === userId);

    const newProfile = {
      id: Date.now().toString(), // Unique ID for the profile entry
      userId,
      skills,
      documentName,
      yearsExperience,
      coBuildLink,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (existingProfileIndex > -1) {
      // Update existing profile
      freelancers[existingProfileIndex] = { ...freelancers[existingProfileIndex], ...newProfile };
    } else {
      // Add new profile
      freelancers.push(newProfile);
    }
    
    await writeFreelancersDB(freelancers);
    res.status(200).json({ message: 'Freelancer profile saved successfully', profile: newProfile });
  } catch (error) {
    console.error('Failed to save freelancer profile:', error);
    res.status(500).json({ message: 'Failed to save freelancer profile.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
