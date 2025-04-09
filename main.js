const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const path = require('path');
const { spawn } = require('child_process'); 

let mainWindow;
let serverProcess;

function createWindow() {
  mainWindow = new BrowserWindow({ 
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

const contextMenu = new Menu();

// Add items to the context menu
contextMenu.append(new MenuItem({
  label: 'View Profile',
  click: () => {
    console.log('View Profile clicked');
    if (mainWindow && mainWindow.webContents) { 
      mainWindow.webContents.executeJavaScript(`
        window.location.href = './profile.html';
      `).catch(err => console.error('Profile navigation error:', err));
    } else {
      console.error('mainWindow or mainWindow.webContents is not defined.');
    }
  }
}));

contextMenu.append(new MenuItem({ type: 'separator' }));

contextMenu.append(new MenuItem({
  label: 'Log Out',
  click: () => {
    console.log('Log Out clicked');
    if (mainWindow && mainWindow.webContents) { 
      mainWindow.webContents.executeJavaScript(`
        localStorage.removeItem('user');
        window.location.href = './login.html';
      `).catch(err => console.error('Logout error:', err));
    } else {
      console.error('mainWindow or mainWindow.webContents is not defined.');
    }
  }
}));

contextMenu.append(new MenuItem({ type: 'separator' }));

contextMenu.append(new MenuItem({
  label: 'Select Charities',
  click: () => {
    console.log('Select Charities clicked');
    if (mainWindow && mainWindow.webContents) { 
      mainWindow.webContents.executeJavaScript(`
        window.location.href = './selection.html';
      `).catch(err => console.error('Cant switch error:', err));
    } else {
      console.error('mainWindow or mainWindow.webContents is not defined.');
    }
  }
}));


app.whenReady().then(() => {
  createWindow(); // 
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.on('context-menu', (event, params) => {
      contextMenu.popup({ window: mainWindow, x: params.x, y: params.y });
    });
  } else {
    console.error('mainWindow or mainWindow.webContents is not defined after app.whenReady.');
  }
});


function stopServer() {
  if (serverProcess) {
    serverProcess.kill();
  }
}

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

app.on('will-quit', stopServer);