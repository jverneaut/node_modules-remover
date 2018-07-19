const { app, dialog, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
});

const isDev = require('electron-is-dev');

const getNodeModulesFolder = require('./lib/getNodeModulesFolders');
const moveFoldersToTrash = require('./lib/moveFoldersToTrash');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 736, height: 512, titleBarStyle: 'hiddenInset' });
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

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

ipcMain.on('trashFolders', async (event, { foldersToTrash }) => {
  try {
    await moveFoldersToTrash(foldersToTrash, ipcMain);
    const options = {
      type: 'info',
      title: 'All folders moved to trash.',
      message: "All done, enjoy your free space.",
      buttons: ['Thanks!']
    }
    dialog.showMessageBox(options);
    event.sender.send('foldersMovedToTrash');
  } catch (err) {
    console.log(err);
  }
})

ipcMain.on('open-confirm-dialog', event => {
  const options = {
    type: 'info',
    title: 'Move selected folders to trash?',
    message: "Are you sure you want to move the selected folders to trash? Make sure to check them all before proceeding.",
    buttons: ['Yes', 'No']
  }
  dialog.showMessageBox(options, index => {
    event.sender.send('confirm-dialog-selection', index)
  })
});
