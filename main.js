const { app, BrowserWindow, nativeTheme } = require('electron');
const path = require('path');

// Заставляем Electron думать, что везде тёмная тема
// (сайты, поддерживающие тёмную тему, будут переключаться автоматически)
nativeTheme.themeSource = 'dark';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'hrum.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      nativeTheme: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});