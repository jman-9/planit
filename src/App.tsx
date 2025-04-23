import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import BucketList from "./pages/BucketList";
import ToDoList from "./pages/ToDoList";
import Settings from "./pages/Settings";
import { TodoAPI } from "./api/todoApi";
import { useEffect } from "react";
import { BucketApi } from "./api/bucketApi";

export default function App() {

  useEffect(() => {
    TodoAPI.addItem({
      title: "TO-DO 1",
      status: "todo",
      updatedAt: new Date("2021-01-01"),
      createdAt: new Date("2021-01-01"),
      startedAt: "2021-01-01",
      completedAt: "2021-01-01",
    });
    TodoAPI.addItem(  {
      title: "TO-DO 2",
      status: "todo",
      updatedAt: new Date("2021-01-01"),
      createdAt: new Date("2021-01-01"),
      startedAt: "2021-01-01",
      completedAt: "2021-01-01",
    });
    TodoAPI.addItem(  {
    title: "TO-DO 3",
    status: "todo",
    updatedAt: new Date("2021-01-01"),
    createdAt: new Date("2021-01-01"),
    startedAt: "2021-01-01",
      completedAt: "2021-01-01",
    });
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

  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bucket" element={<BucketList />} />
            <Route path="/todo" element={<ToDoList />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
