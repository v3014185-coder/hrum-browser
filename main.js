const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'hrum.ico'), // Иконка хомяка
    autoHideMenuBar: true, // Убирает меню File/Edit сверху
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true, // Включает поддержку <webview> для вкладок
      nativeTheme: true // Позволяет сайтам понимать, что тема темная/светлая
    }
  });

  win.loadFile('index.html');
}

// Когда Electron готов, создаем окно
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Закрываем приложение, когда все окна закрыты (кроме macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});