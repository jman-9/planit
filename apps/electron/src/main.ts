import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
//import { ListItem } from '@planit/shared/ListItem';
import { ListItem } from '../../../packages/shared/ListItem';

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

ipcMain.handle('getList', () => {
  let list: ListItem[] = [
    { title: 'i1', updatedAt: new Date(), createdAt: new Date(), desc: 'd1' },
    { title: 'i2', updatedAt: new Date(), createdAt: new Date(), desc: 'd2' },
    { title: 'i3', updatedAt: new Date(), createdAt: new Date(), desc: 'd3' },
  ];
  return list;
});

ipcMain.handle('addItem', () => {
  return 'Hello from Main Process!';
});

ipcMain.handle('getItem', () => {
  return 'Hello from Main Process!';
});

ipcMain.handle('updateItem', () => {
  return 'Hello from Main Process!';
});

ipcMain.handle('deleteItem', () => {
  return 'Hello from Main Process!';
});

ipcMain.handle('getItemCount', () => {
  return 'Hello from Main Process!';
});


app.whenReady().then(createWindow);
