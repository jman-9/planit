import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)<{$isActive: boolean}>`&& {
  color: ${({ $isActive }) => $isActive ? "#1e40af" : "inherit"};
  font-weight: ${({ $isActive }) => $isActive ? "bold" : "inherit"};
}`;

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
        backgroundColor: "#f5f5f5",
        color: "#333",
        padding: "1rem",
        minHeight: "100vh",
        borderRight: "1px solid #ccc",
      }}
    >
      <Link to="/">
        <h2 style={{ marginBottom: "2rem" }}>📌 PlanIt</h2>
      </Link>
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {menu.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <SidebarLink
              key={path}
              to={path}
              $isActive={isActive}
            >
              {label}
            </SidebarLink>
          );
        })}
      </nav>
    </aside>
  );
}
