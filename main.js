const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process'); // Import child_process

let serverProcess; // Variable to store the server process

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Start the Node.js server
  startServer();

  // mainWindow.webContents.openDevTools();
}

function startServer() {
  const serverPath = path.join(__dirname, 'js', 'server.js');
  serverProcess = spawn('node', [serverPath]);

  serverProcess.stdout.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server stderr: ${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });
}

// Ensure the server is stopped when the Electron app quits
function stopServer() {
  if (serverProcess) {
    serverProcess.kill();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', stopServer); // Stop the server when the app quits