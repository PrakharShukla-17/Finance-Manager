import "./Sidebar.css";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Finance</h2>

      <nav>
        <NavLink to="/dashboard" className="link">Overview</NavLink>
        <NavLink to="/transactions" className="link">Transactions</NavLink>
        <NavLink to="/analytics" className="link">Trends & Reports</NavLink>
        <NavLink to="/settings" className="link">Settings</NavLink>
      </nav>
    </div>
  );
}
