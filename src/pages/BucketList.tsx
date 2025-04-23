import ListView, { ListViewProps } from "../components/ListView";
import { useEffect, useState } from "react";
import Modal from "../components/ui/Modal";
import ItemForm, { ItemFormData, ItemFormProps } from "../components/forms/ItemForm";
import { ListItem } from "../types";
import { BucketApi } from "../api/bucketApi";

function useHandleListData() {
  const getList = (): ListItem[] => {
    return BucketApi.getList();
  }

  const addItem = (data: ItemFormData) => {
    const newData: ListItem = {      
      title: data.title,
      createdAt: new Date(),
      updatedAt: new Date(),
      startedAt: data.start,
      completedAt: data.end,
    };
    BucketApi.addItem(newData);
  }

  const editItem = (oldTitle: string, data: ItemFormData) => {
    const item = BucketApi.getItem(oldTitle);
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
    BucketApi.updateItem(oldTitle, newData);
  }

  const deleteItem = (title: string) => {
    const item = BucketApi.getItem(title);
    if(!item) {
      console.error("Invalid item title:", title);
      return;
    }
    BucketApi.deleteItem(title);
  }

  return { getList, addItem, editItem, deleteItem };
}

export default function BucketList() {
  const {getList, addItem, editItem, deleteItem} = useHandleListData();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [curEditItem, setCurEditItem] = useState<{oldTitle: string, item: ItemFormData} | null>(null);

  useEffect(() => {
    BucketApi.addItem({
      title: "BUCKET 1",
      status: "todo",
      updatedAt: new Date("2021-01-01"),
      createdAt: new Date("2021-01-01"),
      startedAt: "2021-01-01",
      completedAt: "2021-01-01",
    });
    BucketApi.addItem({
      title: "BUCKET 2",
      status: "todo",
      updatedAt: new Date("2021-01-01"),
      createdAt: new Date("2021-01-01"),
      startedAt: "2021-01-01",
      completedAt: "2021-01-01",
    });
    BucketApi.addItem({
      title: "BUCKET 3",
      status: "todo",
      updatedAt: new Date("2021-01-01"),
      createdAt: new Date("2021-01-01"),
      startedAt: "2021-01-01",
      completedAt: "2021-01-01",
    });
  }, []);

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
      <h1>Bucket List</h1>
      <button title="Add" onClick={() => setIsAddOpen(true)}>Add</button>
      <ListView {...listViewProps} />
      {isAddOpen && <Modal onClose={() => setIsAddOpen(false)}><ItemForm {...addProps} /></Modal>}
      {curEditItem && <Modal onClose={() => setCurEditItem(null)}><ItemForm {...editProps} item={curEditItem.item} /></Modal>}
    </div>
  );
}
