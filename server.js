const { spawn } = require('child_process');
const path = require('path');

// Define colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Function to log with timestamp and color
function log(message, color = colors.reset) {
  const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${color}${message}${colors.reset}`);
}

// Start backend server
function startBackend() {
  log('Starting backend server...', colors.cyan);
  
  const backendProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'server'),
    shell: true,
    stdio: 'pipe',
  });

  backendProcess.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => log(`[Backend] ${line}`, colors.cyan));
  });

  backendProcess.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => log(`[Backend] ${line}`, colors.red));
  });

  backendProcess.on('close', (code) => {
    if (code !== 0) {
      log(`Backend process exited with code ${code}`, colors.red);
    }
  });

  return backendProcess;
}

// Start frontend server
function startFrontend() {
  log('Starting frontend server...', colors.green);
  
  const frontendProcess = spawn('npm', ['run', 'dev'], {
    cwd: __dirname,
    shell: true,
    stdio: 'pipe',
  });

  frontendProcess.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => log(`[Frontend] ${line}`, colors.green));
  });

  frontendProcess.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => log(`[Frontend] ${line}`, colors.yellow));
  });

  frontendProcess.on('close', (code) => {
    if (code !== 0) {
      log(`Frontend process exited with code ${code}`, colors.red);
    }
  });

  return frontendProcess;
}

// Handle process termination
function setupProcessHandlers(processes) {
  const terminateAll = () => {
    log('Shutting down all servers...', colors.magenta);
    processes.forEach(process => {
      if (!process.killed) {
        process.kill();
      }
    });
  };

  // Handle termination signals
  process.on('SIGINT', terminateAll);
  process.on('SIGTERM', terminateAll);
  process.on('exit', terminateAll);
}

// Main function to start all servers
async function main() {
  log('Starting development environment...', colors.bright);
  
  try {
    const processes = [];
    
    // Start backend first
    const backendProcess = startBackend();
    processes.push(backendProcess);
    
    // Wait a bit for backend to initialize before starting frontend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Start frontend
    const frontendProcess = startFrontend();
    processes.push(frontendProcess);
    
    // Setup handlers for graceful shutdown
    setupProcessHandlers(processes);
    
    log('All servers started successfully!', colors.bright + colors.green);
    log('Press Ctrl+C to stop all servers', colors.bright);
  } catch (error) {
    log(`Error starting servers: ${error.message}`, colors.red);
    process.exit(1);
  }
}

// Run the main function
main();