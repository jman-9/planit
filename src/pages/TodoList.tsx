import ListView, { ListViewProps } from "../components/ListView";
import { useState } from "react";
import Modal from "../components/ui/Modal";
import ItemForm, { ItemFormData, ItemFormProps } from "../components/forms/ItemForm";
import { ListItem } from "../types/ListItem";


const testList: ListItem[] = [
  {
    title: "TO-DO 1",
    status: "todo",
    updatedAt: new Date("2021-01-01"),
    createdAt: new Date("2021-01-01"),
    startedAt: "2021-01-01",
    completedAt: "2021-01-01",
  },
  {
    title: "TO-DO 2",
    status: "todo",
    updatedAt: new Date("2021-01-01"),
    createdAt: new Date("2021-01-01"),
    startedAt: "2021-01-01",
    completedAt: "2021-01-01",
  },
  {
    title: "TO-DO 3",
    status: "todo",
    updatedAt: new Date("2021-01-01"),
    createdAt: new Date("2021-01-01"),
    startedAt: "2021-01-01",
    completedAt: "2021-01-01",
  },
];

function useHandleListData(data: ListItem[], version: number) {
  const [list, _] = useState(data);
  const [listVersion, setListVersion] = useState(version);

  const addItem = (data: ItemFormData) => {
    const newData: ListItem = {      
      title: data.title,
      createdAt: new Date(),
      updatedAt: new Date(),
      startedAt: data.start,
      completedAt: data.end,
    };
    list.push(newData);
    setListVersion(listVersion + 1);
  }

  const editItem = (data: ItemFormData, index: number) => {
    if(index < 0 || index >= list.length) {
      console.error("Invalid index:", index);
      return;
    }

    const newData: ListItem = { ...list[index],
      title: data.title,
      updatedAt: new Date(),
      startedAt: data.start,
      completedAt: data.end,      
    };
    list[index] = newData;
    setListVersion(listVersion + 1);
  }

  const deleteItem = (index: number) => {
    if(index < 0 || index >= list.length) {
      console.error("Invalid index:", index);
      return;
    }
    list.splice(index, 1);
    setListVersion(listVersion + 1);
  }

  return { list, addItem, editItem, deleteItem };
}

export default function ToDoList() {
  const {list, addItem, editItem, deleteItem} = useHandleListData(testList, 0);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [curEditItem, setCurEditItem] = useState<{item: ItemFormData, index: number} | null>(null);

  const addProps: ItemFormProps = {
    onSubmit: (d: ItemFormData) => { addItem(d); setIsAddOpen(false) }, 
    onCancel: () => setIsAddOpen(false) 
  };

  const editProps: ItemFormProps = {
    onSubmit: (d: ItemFormData) => { editItem(d, curEditItem?.index ?? -1); setCurEditItem(null) }, 
    onCancel: () => setCurEditItem(null) 
  };  

  const listViewProps: ListViewProps = {
    list: list,
    onEdit: (item: ListItem, index: number) => {
      const itemFormData: ItemFormData = {
        title: item.title,
        start: item.startedAt,
        end: item.completedAt,
        desc: "test",
      };
      setCurEditItem({item: itemFormData, index: index});
    },
    onDelete: (_: ListItem, index: number) => {
      if(confirm("Are you sure you want to delete this item?"))
        deleteItem(index);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <button title="Add" onClick={() => setIsAddOpen(true)}>Add</button>
      <ListView {...listViewProps} />
      {isAddOpen && <Modal onClose={() => setIsAddOpen(false)}><ItemForm {...addProps} /></Modal>}
      {curEditItem && <Modal onClose={() => setCurEditItem(null)}><ItemForm {...editProps} item={curEditItem.item} /></Modal>}
    </div>
  );
}
