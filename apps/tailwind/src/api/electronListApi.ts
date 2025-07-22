import { getStatus, ListItem, ListItemStatus } from '@planit/shared/ListItem';
import { ListApiInterface } from './types';

export default function ElectronListApi(api: any): ListApiInterface {

  const getList = async (): Promise<ListItem[] | undefined> => {
    return await api?.getList();
  };

  const addItem = async (data: ListItem) => {
    await api?.addItem(data);
  };

  const getItem = async (title: string): Promise<ListItem | undefined> => {
    return await api?.getItem(title);
  };

  const updateItem = async (title: string, data: ListItem) => {
    api?.updateItem(title, data);
  };

  const deleteItem = async (title: string) => {
    api?.deleteItem(title);
  };

  const getItemCount = async (status?: ListItemStatus): Promise<number> => {
    if(status) {
      return (await getList())?.filter(item => getStatus(item) === status).length || 0;
    }
    return (await getList())?.length || 0;
  };

  return { getList, addItem, getItem, updateItem, deleteItem, getItemCount };
};
