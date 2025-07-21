import { useState } from "react";
import { Mode, ItemFormData } from "../components/ItemViewEdit";
import { ListItem } from "../types";
import { ListApiInterface } from "../api/types";


export default function useListDataManager(listApi: ListApiInterface) {
  const [curViewEditMode, setCurViewEditMode] = useState<Mode | null>(null);
  const [curViewItem, setCurViewItem] = useState<{oldTitle: string, item: ItemFormData} | null>(null);
  const [updateFlag, setUpdateFlag] = useState(false);

  const getList = async (): Promise<ListItem[] | undefined> => await listApi.getList();

  const setViewEditMode = (mode: Mode | 'add' |null, item?: ListItem) => {
    let viewData: {oldTitle: string, item: ItemFormData} | null = null;
    if(mode && item) {
      const itemFormData: ItemFormData = {
        title: item.title,
        start: item.startedAt,
        end: item.completedAt,
        desc: item.desc,
      };
      viewData = {oldTitle: item.title, item: itemFormData};
    }

    setCurViewEditMode(mode === 'add' ? 'edit' : mode);
    setCurViewItem(viewData);
    setUpdateFlag(!updateFlag);
  }

  const reflectItem = async (data: ItemFormData, oldTitle?: string) => {
    const newData: ListItem = {
      title: data.title,
      createdAt: new Date(),
      updatedAt: new Date(),
      startedAt: data.start,
      completedAt: data.end,
      desc: data.desc,
    };

    if(!oldTitle) {
      await listApi.addItem(newData);
    } else {
      const item = await listApi.getItem(oldTitle);
      if(!item) {
        console.error("Invalid item title:", oldTitle);
        return;
      }
      newData.createdAt = item.createdAt;
      await listApi.updateItem(oldTitle, newData);
    }

    setViewEditMode(null);
    setUpdateFlag(!updateFlag);
  }

  const deleteItem = async (title: string) => {
    const item = await listApi.getItem(title);
    if(!item) {
      console.error("Invalid item title:", title);
      return;
    }
    await listApi.deleteItem(title);
    setUpdateFlag(!updateFlag);
  }

  return { listDataManager: {getList, curViewItem, curViewEditMode, setViewEditMode, reflectItem, deleteItem} };
}
