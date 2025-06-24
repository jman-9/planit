import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "/" },
    { label: "To-Do List", path: "/todo" },
    { label: "Bucket List", path: "/bucket" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-gray-100 text-gray-800 p-4 min-h-screen border-r border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
      <Link to="/">
        <h2 className="mb-8">📌 PlanIt</h2>
      </Link>
      <nav className="flex flex-col gap-2">
        {menu.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link className={isActive ? "text-blue-800 font-bold dark:bg-blue-900 dark:text-white" : ""} key={path} to={path}>
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
