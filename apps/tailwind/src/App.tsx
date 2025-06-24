import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TodoList from "./pages/TodoList";
import BucketList from "./pages/BucketList";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-1 flex-col dark:bg-gray-950 dark:text-gray-100">
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bucket" element={<BucketList />} />
              <Route path="/todo" element={<TodoList />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <footer className="p-4 text-center bg-none text-xl text-gray-600 dark:text-gray-100">
            <p>© {new Date().getFullYear()} JMAN — MIT License · Krafted with React, RTK Store Persistence, styled-components · <span className="text-sm text-gray-600">🐙 </span>View on <a href="https://github.com/jman-9/planit" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}
