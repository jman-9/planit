import ListView, { ListViewProps } from "../components/ListView";
import Modal from "../ui/Modal";
import { ItemFormData, ItemFormProps } from "../components/forms/ItemForm";
import { ListItem } from "../types";
import { CursorGlowBlackButton } from "../ui/CursorGlowBlackButton";
import ItemViewEdit from "../components/ItemViewEdit";
import useListDataManager from "../hooks/useListDataManager";

export default function ToDoList() {
  const ldm = useListDataManager().listDataManager;

  const viewProps: ItemFormProps = {
    onSubmit: (d: ItemFormData) => ldm.reflectItem(d, ldm.curViewItem?.oldTitle),
    onCancel: () => ldm.setViewEditMode(null),
  };

  const listViewProps: ListViewProps = {
    list: ldm.getList(),
    onView: (item: ListItem) => ldm.setViewEditMode('view', item),
    onEdit: (item: ListItem) => ldm.setViewEditMode("edit", item),
    onDelete: (item: ListItem) => {
      if(confirm("Are you sure you want to delete this item?"))
        ldm.deleteItem(item.title);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <CursorGlowBlackButton title="Add" fontSize="0.9rem" glowSize="30px" onClick={() => { ldm.setViewEditMode('add'); }}>➕ Add</CursorGlowBlackButton>
      </div>
      <ListView {...listViewProps} />
      {ldm.curViewEditMode !== null && <Modal onClose={() => ldm.setViewEditMode(null) }><ItemViewEdit mode={ldm.curViewEditMode} itemFormProps={{...viewProps, item: ldm.curViewItem?.item}} /></Modal>}
    </div>
  );
}
