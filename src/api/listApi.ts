import { store } from '../store/store';
import { ListItem } from '../types';
import { ListApiInterface } from './types';
import { ListSlice } from '../store/types';

export default function ListApi(listSlice: ListSlice): ListApiInterface {
  const getList = (): ListItem[] | undefined => {
    return (store.getState() as any)[listSlice.name]?.list;
  };

  const addItem = (data: ListItem) => {
    store.dispatch(listSlice.actions.addItem(data));
  };

  const getItem = (title: string): ListItem | undefined => {
    return getList()?.find((item: ListItem) => item.title === title);
  };

  const updateItem = (title: string, data: ListItem) => {
    store.dispatch(listSlice.actions.updateItem({ title, data }));
  };

  const deleteItem = (title: string) => {
    store.dispatch(listSlice.actions.deleteItem(title));
  };

  const getItemCount = (status?: 'todo' | 'in-progress' | 'completed'): number => {
    if(status) {
      return getList()?.filter(item => item.status === status).length || 0;
    }
    return getList()?.length || 0;
  };

  return { getList, addItem, getItem, updateItem, deleteItem, getItemCount };
};
