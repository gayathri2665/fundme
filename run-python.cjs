const { spawn } = require('child_process');
const os = require('os');

const isWindows = os.platform() === 'win32';
const pythonExecutable = isWindows ? 'python-backend/venv/Scripts/python.exe' : 'python-backend/venv/bin/python';
const scriptPath = 'python-backend/app.py';

if (!process.env.GOOGLE_API_KEY) {
  console.error('Error: GOOGLE_API_KEY environment variable is not set.');
  console.error('Please set it before running the application.');
  console.error('For example: set GOOGLE_API_KEY=YOUR_API_KEY && npm run dev (on Windows)');
  console.error('Or: export GOOGLE_API_KEY=YOUR_API_KEY && npm run dev (on macOS/Linux)');
  process.exit(1);
}

const pythonProcess = spawn(pythonExecutable, [scriptPath], {
  stdio: 'inherit',
  env: { ...process.env, GOOGLE_API_KEY: process.env.GOOGLE_API_KEY },
});

pythonProcess.on('close', (code) => {
  console.log(`Python process exited with code ${code}`);
});
