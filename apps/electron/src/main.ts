import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

const isDev = process.env.MODE !== 'build';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if(isDev)
    win.loadURL('http://localhost:5173');
  else
    win.loadFile(path.join(__dirname, 'renderer/index.html'));
}


ipcMain.handle('say-hello', async () => {
  return 'Hello from Main Process!';
});


app.whenReady().then(createWindow);
