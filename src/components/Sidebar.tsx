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
    <aside
      style={{
        width: "240px",
        backgroundColor: "#f5f5f5",  // 밝은 배경
        color: "#333",               // 어두운 글자색
        padding: "1rem",
        minHeight: "100vh",
        borderRight: "1px solid #ccc", // 구분선 느낌
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2 style={{ marginBottom: "2rem" }}>📌 PlanIt</h2>
      </Link>
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {menu.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              style={{
                color: isActive ? "#1e40af" : "#333",
                fontWeight: isActive ? "bold" : "normal",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
