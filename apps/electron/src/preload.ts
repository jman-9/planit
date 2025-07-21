import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('env', {
  isElectron: true,
});

contextBridge.exposeInMainWorld('api', {
  getList: () => ipcRenderer.invoke('getList'),
  addItem: () => ipcRenderer.invoke('addItem'),
  getItem: () => ipcRenderer.invoke('getItem'),
  updateItem: () => ipcRenderer.invoke('updateItem'),
  deleteItem: () => ipcRenderer.invoke('deleteItem'),
});
