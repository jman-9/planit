import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent, Menu } from 'electron';
import Store from 'electron-store';
import path from 'path';
import { ListItem } from '@planit/shared/ListItem';

declare global {
  const MODE: string;
}

app.setName('jman.planit');
const store = new Store({ name: 'db' });
const isDev = MODE !== 'build';

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

  if(isDev) {
    win.loadURL('http://localhost:5173');
  }
  else {
    Menu.setApplicationMenu(null);
    win.loadFile(path.join(__dirname, 'renderer/index.html'));
  }
}

interface List {
  name: string,
  list: ListItem[],
};

let _todoList: List = { name:'todo', list:[] };
let _bucketList: List = { name:'bucket', list:[] };

async function listHandler(list: List, cmd:string, ...args:any[]) {
  switch(cmd) {
    case 'getList': {
      if(list.list.length == 0)
        list.list = store.get(list.name) as ListItem[] ?? [];
      return list.list;
    }

    case 'addItem': {
      const [ item ] = args as [ListItem];
      list.list.push(item);
      store.set(list.name, list.list);
      return;
    }

    case 'getItem': {
      const [ title ] = args as [string];
      return list.list.find((item: ListItem) => item.title === title);
    }

    case 'updateItem': {
      const [ title, data ] = args as [string, ListItem];
      const index = list.list.findIndex(item => item.title === title);
      if (index !== -1) {
        list.list[index] = data;
        store.set(list.name, list.list);
      }
      return;
    }

    case 'deleteItem': {
      const [ title ] = args as [string];
      list.list = list.list.filter(item => item.title !== title);
      store.set(list.name, list.list);
      return;
    }

    case 'getItemCount': {
      return list.list.length;
    }
  }
};

ipcMain.handle('todo', async (_evt:IpcMainInvokeEvent, cmd:string, ...args:any[]) => {
  return await listHandler(_todoList, cmd, ...args);
});

ipcMain.handle('bucket', async (_evt:IpcMainInvokeEvent, cmd, ...args) => {
  return await listHandler(_bucketList, cmd, ...args);
});

app.whenReady().then(createWindow);
