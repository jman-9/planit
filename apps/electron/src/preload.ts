import { contextBridge, ipcRenderer } from 'electron';
import { ListItem } from '@planit/shared/ListItem';


contextBridge.exposeInMainWorld('env', {
  isElectron: true,
});

contextBridge.exposeInMainWorld('api', {
  getList: () => ipcRenderer.invoke('getList'),
  addItem: (item: ListItem) => ipcRenderer.invoke('addItem', item),
  getItem: (title: string) => ipcRenderer.invoke('getItem', title),
  updateItem: (title: string, data: ListItem) => ipcRenderer.invoke('updateItem', title, data),
  deleteItem: (title: string) => ipcRenderer.invoke('deleteItem', title),
  getItemCount: () => ipcRenderer.invoke('getItemCount'),
});
