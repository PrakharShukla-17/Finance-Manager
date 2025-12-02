import { NavLink, useNavigate } from "react-router-dom";
import "./AppLayout.css";

export default function AppLayout({ children }) {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <div className="layout-wrapper">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="brand">FINARY</h2>

        <nav className="menu">
          <NavLink to="/dashboard" className="menu-item">Dashboard</NavLink>
          <NavLink to="/expenses" className="menu-item">Expenses</NavLink>
          <NavLink to="/analytics" className="menu-item">Analytics</NavLink>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>


      {/* MAIN CONTENT AREA */}
      <main className="content-area">
        {children}
      </main>
    </div>
  );
}
