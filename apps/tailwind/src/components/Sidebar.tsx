import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "/" },
    { label: "To-Do List", path: "/todo" },
    { label: "Bucket List", path: "/bucket" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <>
      <Link to="/">
        <h2 className="mb-8">📌 PlanIt</h2>
      </Link>
      <nav className="flex flex-col gap-2">
        {menu.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link className={isActive ? "text-blue-800 font-bold dark:bg-blue-900 dark:text-white" : ""} key={path} to={path} onClick={onItemClick}>
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export default function Sidebar() {
  const [isOverlaySidebarOpen, setIsOverlaySidebarOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:block w-64 bg-gray-100 text-gray-800 p-4 min-h-screen border-r border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
        <SidebarContent />
      </aside>

      <button
        className="fixed top-4 right-4 md:hidden z-60 p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md"
        onClick={() => setIsOverlaySidebarOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        {isOverlaySidebarOpen ? <X className="w-6 h-6 text-gray-800 dark:text-gray-200" /> : <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200" />}
      </button>

      {isOverlaySidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOverlaySidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`fixed md:hidden top-0 left-0 h-full w-64 z-50 bg-gray-100 text-gray-800 p-4 border-r border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 transform transition-transform duration-100 ${isOverlaySidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent onItemClick={() => setIsOverlaySidebarOpen(false)} />
      </aside>
    </>
  );
}
