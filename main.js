const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
});

const getNodeModulesFolder = require('./lib/getNodeModulesFolders');
const deleteFolders = require('./lib/deleteFolders');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 736, height: 512, titleBarStyle: 'hiddenInset' });
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('selectFolder', (event, { folderPath, depth }) => {
  const folders = getNodeModulesFolder(folderPath, depth);
  event.sender.send('nodeFoldersFound', folders);
});

ipcMain.on('deleteFolders', (event, { foldersToDelete }) => {
  deleteFolders(foldersToDelete);
})