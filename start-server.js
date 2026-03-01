const os = require('os');
const { spawn } = require('child_process');
const path = require('path');

// Detect the OS
const isWindows = os.platform() === 'win32';

// Set the path based on the OS
const venvPath = isWindows 
  ? path.join(__dirname, 'server', '.venv', 'Scripts', 'python.exe') 
  : path.join(__dirname, 'server', '.venv', 'bin', 'python');

const serverPath = path.join(__dirname, 'server');

const server = spawn(venvPath, ['-m', 'uvicorn', 'server:app', '--reload', '--host', '127.0.0.1', '--port', '8000'], {
    cwd: serverPath,
    stdio: 'inherit',
    shell: true
});