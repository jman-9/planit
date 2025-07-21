import ListView, { ListViewProps } from "../components/ListView";
import Modal from "../ui/Modal";
import { ListItem } from "@planit/shared/ListItem";
import { CursorGlowBlackButton } from "../ui/CursorGlowBlackButton";
import ItemViewEdit, { ItemFormData, ItemFormProps } from "../components/ItemViewEdit";
import useListDataManager from "../hooks/useListDataManager";
import { BucketApi } from "../api/bucketApi";
import { useEffect, useState } from "react";

export default function BucketList() {
  const ldm = useListDataManager(BucketApi).listDataManager;
  const [bucketList, setBucketList] = useState<ListItem[]>([]);

  useEffect(() => { ldm.getList().then((list) => setBucketList(list ?? [])); }, [ldm]);

  const viewProps: ItemFormProps = {
    onSubmit: (d: ItemFormData) => ldm.reflectItem(d, ldm.curViewItem?.oldTitle),
    onCancel: () => ldm.setViewEditMode(null),
  };

  const listViewProps: ListViewProps = {
    list: bucketList,
    onView: (item: ListItem) => ldm.setViewEditMode('view', item),
    onEdit: (item: ListItem) => ldm.setViewEditMode("edit", item),
    onDelete: (item: ListItem) => {
      if(confirm("Are you sure you want to delete this item?"))
        ldm.deleteItem(item.title);
    }
  };

  return (
    <div>
      <h1>Bucket List</h1>
      <div className="flex justify-end mb-4">
        <CursorGlowBlackButton title="Add" fontSize="0.9rem" glowSize="30px" onClick={() => { ldm.setViewEditMode('add'); }}>➕ Add</CursorGlowBlackButton>
      </div>
      <ListView {...listViewProps} />
      {ldm.curViewEditMode !== null && <Modal onClose={() => ldm.setViewEditMode(null) }><ItemViewEdit mode={ldm.curViewEditMode} itemFormProps={{...viewProps, item: ldm.curViewItem?.item}} /></Modal>}
    </div>
  );
}
