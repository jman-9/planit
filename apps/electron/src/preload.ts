import { contextBridge, ipcRenderer } from 'electron';


function wrapCommands(channel: string, commands: string[]) {
  return Object.fromEntries(
    commands.map((command) => [
      command,
      (...args: any[]) => ipcRenderer.invoke(channel, command, ...args)
    ])
  );
}

const cmds = [
  'getList',
  'addItem',
  'getItem',
  'updateItem',
  'deleteItem',
  'getItemCount'
];

contextBridge.exposeInMainWorld('elecPlanit', {
  todo: wrapCommands('todo', cmds),
  bucket: wrapCommands('bucket', cmds),
});
