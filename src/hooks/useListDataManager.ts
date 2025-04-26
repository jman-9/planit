import { useState } from "react";
import { Mode } from "../components/ItemViewEdit";
import { ListItem } from "../types";
import { ItemFormData } from "../components/forms/ItemForm";
import { ListApiInterface } from "../api/types";


export default function useListDataManager(listApi: ListApiInterface) {
  const [curViewEditMode, setCurViewEditMode] = useState<Mode | null>(null);
  const [curViewItem, setCurViewItem] = useState<{oldTitle: string, item: ItemFormData} | null>(null);

  const getList = (): ListItem[] | undefined => listApi.getList();

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
  }

  const reflectItem = (data: ItemFormData, oldTitle?: string) => {
    const newData: ListItem = {
      title: data.title,
      createdAt: new Date(),
      updatedAt: new Date(),
      startedAt: data.start,
      completedAt: data.end,
      desc: data.desc,
    };

    if(!oldTitle) {
      listApi.addItem(newData);
    } else {
      const item = listApi.getItem(oldTitle);
      if(!item) {
        console.error("Invalid item title:", oldTitle);
        return;
      }
      listApi.updateItem(oldTitle, newData);
    }

    setViewEditMode(null);
  }

  const deleteItem = (title: string) => {
    const item = listApi.getItem(title);
    if(!item) {
      console.error("Invalid item title:", title);
      return;
    }
    listApi.deleteItem(title);
  }

  return { listDataManager: {getList, curViewItem, curViewEditMode, setViewEditMode, reflectItem, deleteItem} };
}
