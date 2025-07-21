import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { ListItem } from '@planit/shared/ListItem';


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

let _list: ListItem[] = [
  { title: 'i1', updatedAt: new Date().toISOString(), createdAt: new Date().toISOString(), desc: 'd1' },
  { title: 'i2', updatedAt: new Date().toISOString(), createdAt: new Date().toISOString(), desc: 'd2' },
  { title: 'i3', updatedAt: new Date().toISOString(), createdAt: new Date().toISOString(), desc: 'd3' },
];

ipcMain.handle('getList', () => {
  return _list;
});

ipcMain.handle('addItem', (_evt, item: ListItem) => {
  _list.push(item);
  return 'Hello from Main Process!';
});

ipcMain.handle('getItem', (_evt, title: string) => {
  return _list.find((item: ListItem) => item.title === title);
});

ipcMain.handle('updateItem', (_evt, title: string, data: ListItem) => {
  const index = _list.findIndex(item => item.title === title);
  if (index !== -1) {
    _list[index] = data;
  }
});

ipcMain.handle('deleteItem', (_evt, title: string) => {
  _list = _list.filter(item => item.title !== title);
});

ipcMain.handle('getItemCount', () => {
  return _list.length;
});


app.whenReady().then(createWindow);
