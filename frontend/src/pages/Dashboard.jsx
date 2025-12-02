// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "../services/api.js";
import "./Dashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [todayExpenses, setTodayExpenses] = useState([]);
  const token = localStorage.getItem("token");

  const COLORS = ["#4F8FF7", "#7DB9F5", "#A7C9FF", "#3A74D2", "#2D4B8E"];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("/expense", {
        headers: { token: `Bearer ${token}` },
      });

      setExpenses(res.data.expenses);

      // ---- Filter data for TODAY only ----
      const todayString = new Date().toDateString();
      const filtered = res.data.expenses.filter(
        (e) => new Date(e.date).toDateString() === todayString
      );

      setTodayExpenses(filtered);

    } catch (err) {
      console.log("Dashboard Fetch Error:", err);
    }
  };

  // Group spending by category (for pie chart)
  const categoryTotals = todayExpenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  const pieData = Object.entries(categoryTotals).map(([category, value]) => ({
    name: category,
    value,
  }));

  // Today's total spent
  const totalToday = pieData.reduce((sum, obj) => sum + obj.value, 0);

  // Most recent 3 expenses (doesn't have to be only today)
  const recent = expenses.slice(0, 3);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">
        Today’s Snapshot &nbsp;|&nbsp; {new Date().toDateString()}
      </h2>

      <div className="dashboard-top">
        <div className="chart-wrapper">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: "center", color: "#777" }}>
              No spending recorded today.
            </p>
          )}

          {/* Simple Legend */}
          {pieData.length > 0 && (
            <div className="legend">
              {pieData.map((item, i) => (
                <div key={i} className="legend-item">
                  <span
                    className="legend-dot"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  ></span>
                  {item.name} — ₹{item.value}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="stats-box">
          <p className="stats-label">Total Spent Today</p>
          <h1 className="stats-value">₹{totalToday}</h1>
        </div>
      </div>

      <hr />

      <h3 className="section-title">Recent Activity</h3>

      <div className="recent-section">
        {recent.length === 0 ? (
          <p className="empty">No recent expenses.</p>
        ) : (
          recent.map((item) => (
            <div key={item._id} className="recent-item">
              <span>
                {new Date(item.date).toLocaleDateString()} | {item.title}
              </span>
              <strong className="amount">₹{item.amount}</strong>
            </div>
          ))
        )}
      </div>

      {/* Coming Soon Message */}
      <div className="coming-soon">
        {/* <img src="/mobile.svg" className="coming-icon" alt="mobile" /> */}
        <div>
          <h3>Mobile App</h3>
          <p>
            Track spending on the go. <br /> Coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
