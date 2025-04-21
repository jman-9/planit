import ListView from "../components/ListView";
import { ListItem } from "../types/ListItem";
export default function BucketList() {
  const list: ListItem[] = [
    {
      title: "BUCKET 1",
      status: 'todo',
      updatedAt: "2021-01-01",
      createdAt: "2021-01-01",
      startedAt: "2021-01-01",
      completedAt: "2021-01-01",
    },
    {
      title: "BUCKET 2",
      status: 'todo',
      updatedAt: "2021-01-01",
      createdAt: "2021-01-01",
      startedAt: "2021-01-01",
      completedAt: "2021-01-01",
    },
    {
      title: "BUCKET 3",
      status: 'todo',
      updatedAt: "2021-01-01",
      createdAt: "2021-01-01",
      startedAt: "2021-01-01",
      completedAt: "2021-01-01",
    },
  ];
  return (
    <div>
      <h1>Bucket List</h1>
      <ListView list={list} />
    </div>
  );
}
