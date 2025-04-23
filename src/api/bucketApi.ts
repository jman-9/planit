import { store } from '../store/store';
import { addItem, updateItem, deleteItem } from '../store/bucketSlice';
import { ListItem } from '../types';

export const BucketApi = {
  getList: (): ListItem[] => {
    return store.getState().buckets.list;
  },

  addItem: (data: ListItem) => {
    store.dispatch(addItem(data));
  },

  getItem: (title: string): ListItem | undefined => {
    return store.getState().buckets.list.find(item => item.title === title);
  },    

  updateItem: (title: string, data: ListItem) => {
    store.dispatch(updateItem({ title, data }));
  },

  deleteItem: (title: string) => {
    store.dispatch(deleteItem(title));
  },
}; 