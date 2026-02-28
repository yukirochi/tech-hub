const { spawn } = require('child_process');
const path = require('path');

const venvPath = path.join(__dirname, 'server', '.venv', 'Scripts', 'python.exe');
const serverPath = path.join(__dirname, 'server');

const server = spawn(venvPath, ['-m', 'uvicorn', 'server:app', '--reload', '--host', '127.0.0.1', '--port', '8000'], {
  cwd: serverPath,
  stdio: 'inherit',
  shell: true
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

server.on('exit', (code) => {
  process.exit(code);
});
