import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TodoList from "./pages/TodoList";
import BucketList from "./pages/BucketList";
import Settings from "./pages/Settings";
import { store } from "./store/store";

const Router = _USE_ELECTRON_ ? HashRouter : BrowserRouter;

export default function App() {
  useEffect(() => {
    const theme = (store.getState() as any)?.settings?.theme ?? "light";
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <Router>
      <div className="flex min-h-screen dark:bg-gray-950 dark:text-gray-100">
        <Sidebar />
        <div className="min-w-0 max-w-[900px] flex flex-1 flex-col">
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
    </Router>
  );
}
