import ListView from "../components/ListView";
import { useState } from "react";
import Modal from "../components/ui/Modal";
import ItemForm, { ItemFormData, ItemFormProps, ItemFormSubmit } from "../components/forms/ItemForm";
import { ListItem } from "../types/ListItem";


export default function ToDoList() {
  const list: ListItem[] = [
    {
      title: "TO-DO 1",
      status: "todo",
      updatedAt: "2021-01-01",
      createdAt: "2021-01-01",
      startedAt: "2021-01-01",
      completedAt: "2021-01-01",
    },
    {
      title: "TO-DO 2",
      status: "todo",
      updatedAt: "2021-01-01",
      createdAt: "2021-01-01",
      startedAt: "2021-01-01",
      completedAt: "2021-01-01",
    },
    {
      title: "TO-DO 3",
      status: "todo",
      updatedAt: "2021-01-01",
      createdAt: "2021-01-01",
      startedAt: "2021-01-01",
      completedAt: "2021-01-01",
    },
  ];

  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleSubmit: ItemFormSubmit = (data: ItemFormData) => {
    console.log(data);
    setIsAddOpen(false);
  };

  const props: ItemFormProps = { onSubmit: handleSubmit, onCancel: () => setIsAddOpen(false) };

  return (
    <div>
      <h1>To-Do List</h1>
      <button title="Add" onClick={() => setIsAddOpen(true)}>Add</button>
      <ListView list={list} />
      {isAddOpen && <Modal onClose={() => setIsAddOpen(false)}><ItemForm {...props} /></Modal>}
    </div>
  );
}
