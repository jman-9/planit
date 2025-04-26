import ListView, { ListViewProps } from "../components/ListView";
import { useState } from "react";
import Modal from "../ui/Modal";
import { ItemFormData, ItemFormProps } from "../components/forms/ItemForm";
import { ListItem } from "../types";
import { TodoApi } from "../api/todoApi";
import { CursorGlowBlackButton } from "../ui/CursorGlowBlackButton";
import ItemViewEdit from "../components/ItemViewEdit";


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
      desc: data.desc,
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
      desc: data.desc,
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
  const [curViewEditMode, setCurViewEditMode] = useState<"view" | "edit" | null>(null);
  const [curViewItem, setCurViewItem] = useState<{oldTitle: string, item: ItemFormData} | null>(null);

  const viewProps: ItemFormProps = {
    onSubmit: (d: ItemFormData) => {
      if(curViewItem) {
        editItem(curViewItem.oldTitle, d);
      } else {
        addItem(d);
      }
      setCurViewEditMode(null);
    },
    onCancel: () => {
      setCurViewEditMode(null);
    }
  };

  const listViewProps: ListViewProps = {
    list: getList(),
    onView: (item: ListItem) => {
      const itemFormData: ItemFormData = {
        title: item.title,
        start: item.startedAt,
        end: item.completedAt,
        desc: item.desc,
      };
      setCurViewEditMode("view");
      setCurViewItem({oldTitle: item.title, item: itemFormData});
    },
    onEdit: (item: ListItem) => {
      const itemFormData: ItemFormData = {
        title: item.title,
        start: item.startedAt,
        end: item.completedAt,
        desc: item.desc,
      };
      setCurViewEditMode("edit");
      setCurViewItem({oldTitle: item.title, item: itemFormData});
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
        <CursorGlowBlackButton title="Add" fontSize="0.9rem" glowSize="30px" onClick={() => { setCurViewItem(null); setCurViewEditMode("edit"); }}>➕ Add</CursorGlowBlackButton>
      </div>
      <ListView {...listViewProps} />
      {curViewEditMode !== null && <Modal onClose={() => setCurViewEditMode(null)}><ItemViewEdit mode={curViewEditMode} itemFormProps={{...viewProps, item: curViewItem?.item}} /></Modal>}
    </div>
  );
}
