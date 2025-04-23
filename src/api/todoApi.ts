import { store } from '../store/store';
import { addItem, updateItem, deleteItem } from '../store/todoSlice';
import { ListItem } from '../types';

export const TodoApi = {
  getList: (): ListItem[] => {
    return store.getState().todos.list;
  },

  addItem: (data: ListItem) => {
    store.dispatch(addItem(data));
  },

  getItem: (title: string): ListItem | undefined => {
    return store.getState().todos.list.find(item => item.title === title);
  },    

  updateItem: (title: string, data: ListItem) => {
    store.dispatch(updateItem({ title, data }));
  },

  deleteItem: (title: string) => {
    store.dispatch(deleteItem(title));
  },

  getItemCount: (status?: 'todo' | 'in-progress' | 'completed'): number => {
    if(status) {
      return TodoApi.getList().filter(item => item.status === status).length;
    }
    return TodoApi.getList().length;
  },
};
