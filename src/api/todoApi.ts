import { store } from '../store/store';
import { addItem, updateItem, deleteItem } from '../store/todoSlice';
import { ListItem } from '../types';

export const TodoAPI = {
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
};
