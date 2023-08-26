const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
args = process.argv
const currentDir = app.getAppPath()
console.log(currentDir)
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

    // Load your HTML file and pass 'args' as a parameter
    mainWindow.loadFile('src/index.html', { query: { args: JSON.stringify(args), currentDir:currentDir } });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle IPC messages to send raw file data
ipcMain.on('getRawFileData', (event, filePath) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      event.reply('rawFileData', { error: err.message });
    } else {
      event.reply('rawFileData', { data: data });
    }
  });
});
