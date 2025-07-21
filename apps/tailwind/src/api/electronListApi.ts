import { getStatus, ListItem, ListItemStatus } from '../types';
import { ListApiInterface } from './types';

export default function ElectronListApi(): ListApiInterface {

  const getList = async (): Promise<ListItem[] | undefined> => {
    return await window.api?.getList();
  };

  const addItem = async (data: ListItem) => {
    await window.api?.addItem(data);
  };

  const getItem = async (title: string): Promise<ListItem | undefined> => {
    return await window.api?.getItem(title);
  };

  const updateItem = async (title: string, data: ListItem) => {
    window.api?.updateItem(title, data);
  };

  const deleteItem = async (title: string) => {
    window.api?.deleteItem(title);
  };

  const getItemCount = async (status?: ListItemStatus): Promise<number> => {
    if(status) {
      return (await getList())?.filter(item => getStatus(item) === status).length || 0;
    }
    return (await getList())?.length || 0;
  };

  return { getList, addItem, getItem, updateItem, deleteItem, getItemCount };
};
