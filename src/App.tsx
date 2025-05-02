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
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <main style={{ flex: 1, padding: "2rem" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bucket" element={<BucketList />} />
              <Route path="/todo" element={<TodoList />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <footer style={{ padding: "1rem", textAlign: "center", background: "none", fontSize: "1.2rem", color: "#555" }}>
            <p>© {new Date().getFullYear()} JMAN — MIT License · Krafted with React, RTK Store Persistence, styled-components · <span style={{ fontSize: "0.8rem", color: "#555" }}>🐙 </span>View on <a href="https://github.com/jman-9/planit" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}
