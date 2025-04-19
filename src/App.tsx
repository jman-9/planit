import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import BucketList from "./pages/BucketList";
import TodoList from "./pages/TodoList";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bucket" element={<BucketList />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
