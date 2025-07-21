import { BucketApi } from "../api/bucketApi";
import { TodoApi } from "../api/todoApi";
import OverviewCard from "../components/OverviewCard";
import RecentListCard from "../components/RecentListCard";
import { ListItem } from "../types";
import useListDataManager from "../hooks/useListDataManager";
import Modal from "../ui/Modal";
import ItemViewEdit, { ItemFormData, ItemFormProps } from "../components/ItemViewEdit";
import { useEffect, useState } from "react";


interface Data {
  todoTotalCount: number;
  bucketTotalCount: number;
  todoCompletedCount: number;
  bucketCompletedCount: number;
  recentTodoList: ListItem[] | undefined;
  recentBucketList: ListItem[] | undefined;
}
function DefaultData(): Data { return { todoTotalCount: 0, bucketTotalCount: 0, todoCompletedCount: 0, bucketCompletedCount: 0, recentTodoList: [], recentBucketList: [],}};

export default function Dashboard() {
  const [data, setData] = useState(DefaultData());

  const fetcher = async () => {
    let newData: Data = DefaultData();

    newData.todoTotalCount = await TodoApi.getItemCount();
    newData.bucketTotalCount = await BucketApi.getItemCount();

    newData.todoCompletedCount = await TodoApi.getItemCount('Done');
    newData.bucketCompletedCount = await BucketApi.getItemCount('Done');

    newData.recentTodoList = (await TodoApi.getList())?.slice(0, 3) ?? [];
    newData.recentBucketList = (await BucketApi.getList())?.slice(0, 3) ?? [];
    return newData;
  };

  useEffect(() => { fetcher().then((newData) => setData(newData)); }, []);

  const todoLdm = useListDataManager(TodoApi).listDataManager;
  const bucketLdm = useListDataManager(BucketApi).listDataManager;
  const todoViewProps: ItemFormProps = {
   onSubmit: (d: ItemFormData) => todoLdm.reflectItem(d, todoLdm.curViewItem?.oldTitle),
   onCancel: () => todoLdm.setViewEditMode(null),
  };
  const bucketViewProps: ItemFormProps = {
   onSubmit: (d: ItemFormData) => bucketLdm.reflectItem(d, bucketLdm.curViewItem?.oldTitle),
   onCancel: () => bucketLdm.setViewEditMode(null),
  };
  const todoHandleItemClick = (item: ListItem) => {
   todoLdm.setViewEditMode('view', item);
  }
  const bucketHandleItemClick = (item: ListItem) => {
   bucketLdm.setViewEditMode('view', item);
  }

  return (
    <div className="p-8 max-w-full mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-4 min-[500px]:flex-row min-[500px]:gap-8 min-[500px]:[&>*]:flex-1">
        <OverviewCard title="To-Do List" titleLink="/todo" done={data.todoCompletedCount} total={data.todoTotalCount} />
        <OverviewCard title="Bucket List" titleLink="/bucket" done={data.bucketCompletedCount} total={data.bucketTotalCount} />
      </div>
      <RecentListCard title="Recent To-Do List" titleLink="/todo" list={data.recentTodoList || []} onItemClick={todoHandleItemClick} />
      <RecentListCard title="Recent Bucket List" titleLink="/bucket" list={data.recentBucketList || []} onItemClick={bucketHandleItemClick} />
      {todoLdm.curViewEditMode !== null && <Modal onClose={() => todoLdm.setViewEditMode(null) }><ItemViewEdit mode={todoLdm.curViewEditMode} itemFormProps={{...todoViewProps, item: todoLdm.curViewItem?.item}} /></Modal>}
      {bucketLdm.curViewEditMode !== null && <Modal onClose={() => bucketLdm.setViewEditMode(null) }><ItemViewEdit mode={bucketLdm.curViewEditMode} itemFormProps={{...bucketViewProps, item: bucketLdm.curViewItem?.item}} /></Modal>}
    </div>
  );
}
