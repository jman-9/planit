import { store } from '../store/store';
import { getStatus, ListItem, ListItemStatus } from '@planit/shared/ListItem';
import { ListApiInterface } from './types';
import { ListSlice } from '../store/types';


export default function ListApi(listSlice: ListSlice): ListApiInterface {
  const getList = async (): Promise<ListItem[] | undefined> => {
    return (store.getState() as any)[listSlice.name]?.list;
  };

  const addItem = async (data: ListItem) => {
    store.dispatch(listSlice.actions.addItem(data));
  };

  const getItem = async (title: string): Promise<ListItem | undefined> => {
    return (await getList())?.find((item: ListItem) => item.title === title);
  };

  const updateItem = async (title: string, data: ListItem) => {
    store.dispatch(listSlice.actions.updateItem({ title, data }));
  };

  const deleteItem = async (title: string) => {
    store.dispatch(listSlice.actions.deleteItem(title));
  };

  const getItemCount = async (status?: ListItemStatus): Promise<number> => {
    if(status) {
      return (await getList())?.filter(item => getStatus(item) === status).length || 0;
    }
    return (await getList())?.length || 0;
  };

  return { getList, addItem, getItem, updateItem, deleteItem, getItemCount };
};
