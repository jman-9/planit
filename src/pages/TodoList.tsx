import ListView, { ListViewProps } from "../components/ListView";
import { useState } from "react";
import Modal from "../ui/Modal";
import ItemForm, { ItemFormData, ItemFormProps } from "../components/forms/ItemForm";
import { ListItem } from "../types";
import { TodoApi } from "../api/todoApi";
import { CursorGlowBlackButton } from "../ui/CursorGlowBlackButton";


function useHandleListData() {
  const getList = (): ListItem[] => {
    return TodoApi.getList();
  }

  const addItem = (data: ItemFormData) => {
    const newData: ListItem = {
      title: data.title,
      createdAt: new Date(),
      updatedAt: new Date(),
      startedAt: data.start,
      completedAt: data.end,
    };
    TodoApi.addItem(newData);
  }

  const editItem = (oldTitle: string, data: ItemFormData) => {
    const item = TodoApi.getItem(oldTitle);
    if(!item) {
      console.error("Invalid item title:", oldTitle);
      return;
    }

    const newData: ListItem = { ...item,
      title: data.title,
      updatedAt: new Date(),
      startedAt: data.start,
      completedAt: data.end,
    };
    TodoApi.updateItem(oldTitle, newData);
  }

  const deleteItem = (title: string) => {
    const item = TodoApi.getItem(title);
    if(!item) {
      console.error("Invalid item title:", title);
      return;
    }
    TodoApi.deleteItem(title);
  }

  return { getList, addItem, editItem, deleteItem };
}

export default function ToDoList() {
  const {getList, addItem, editItem, deleteItem} = useHandleListData();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [curEditItem, setCurEditItem] = useState<{oldTitle: string, item: ItemFormData} | null>(null);

  const addProps: ItemFormProps = {
    onSubmit: (d: ItemFormData) => { addItem(d); setIsAddOpen(false) },
    onCancel: () => setIsAddOpen(false)
  };

  const editProps: ItemFormProps = {
    onSubmit: (d: ItemFormData) => { editItem(curEditItem?.oldTitle ?? "", d); setCurEditItem(null) },
    onCancel: () => setCurEditItem(null)
  };

  const listViewProps: ListViewProps = {
    list: getList(),
    onEdit: (item: ListItem) => {
      const itemFormData: ItemFormData = {
        title: item.title,
        start: item.startedAt,
        end: item.completedAt,
        desc: "test",
      };
      setCurEditItem({oldTitle: item.title, item: itemFormData});
    },
    onDelete: (item: ListItem) => {
      if(confirm("Are you sure you want to delete this item?"))
        deleteItem(item.title);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <CursorGlowBlackButton title="Add" fontSize="0.9rem" glowSize="30px" onClick={() => setIsAddOpen(true)}>➕ Add</CursorGlowBlackButton>
      </div>
      <ListView {...listViewProps} />
      {isAddOpen && <Modal onClose={() => setIsAddOpen(false)}><ItemForm {...addProps} /></Modal>}
      {curEditItem && <Modal onClose={() => setCurEditItem(null)}><ItemForm {...editProps} item={curEditItem.item} /></Modal>}
    </div>
  );
}
