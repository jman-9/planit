import ListView, { ListViewProps } from "../components/ListView";
//import Modal from "../ui/Modal";
import { ListItem } from "../types";
//import { CursorGlowBlackButton } from "../ui/CursorGlowBlackButton";
//import ItemViewEdit, { ItemFormData, ItemFormProps } from "../components/ItemViewEdit";
//import useListDataManager from "../hooks/useListDataManager";
import { TodoApi } from "../api/todoApi";

export default function ToDoList() {
  //const ldm = useListDataManager(TodoApi).listDataManager;

  // const viewProps: ItemFormProps = {
  //   onSubmit: (d: ItemFormData) => ldm.reflectItem(d, ldm.curViewItem?.oldTitle),
  //   onCancel: () => ldm.setViewEditMode(null),
  // };

  // const listViewProps: ListViewProps = {
  //   list: ldm.getList() ?? [],
  //   onView: (item: ListItem) => ldm.setViewEditMode('view', item),
  //   onEdit: (item: ListItem) => ldm.setViewEditMode("edit", item),
  //   onDelete: (item: ListItem) => {
  //     if(confirm("Are you sure you want to delete this item?"))
  //       ldm.deleteItem(item.title);
  //   }
  // };

  const listViewProps: ListViewProps = {
    list: [ { title: "Test", status: "Done", createdAt: "2021-01-01", startedAt: "2021-01-01", completedAt: "2021-01-01" } ],
    onView: (item: ListItem) => {},
    onEdit: (item: ListItem) => {},
    onDelete: (item: ListItem) => {
      if(confirm("Are you sure you want to delete this item?"))
      {}
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div className="flex justify-end mb-4">
        {/*<CursorGlowBlackButton title="Add" fontSize="0.9rem" glowSize="30px" onClick={() => { ldm.setViewEditMode('add'); }}>➕ Add</CursorGlowBlackButton>*/}
      </div>
      <ListView {...listViewProps} />
      {/*ldm.curViewEditMode !== null && <Modal onClose={() => ldm.setViewEditMode(null) }><ItemViewEdit mode={ldm.curViewEditMode} itemFormProps={{...viewProps, item: ldm.curViewItem?.item}} /></Modal>*/}
    </div>
  );
}
