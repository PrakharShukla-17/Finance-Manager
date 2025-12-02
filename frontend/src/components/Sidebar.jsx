import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">Finary</h2>

      <nav>
        <NavLink to="/dashboard" className="link">Overview</NavLink>
        <NavLink to="/transactions" className="link">Transactions</NavLink>
        <NavLink to="/analytics" className="link">Trends & Reports</NavLink>

        {/* Logout button styled like a nav link */}
        <button className="link logout-link" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
}
