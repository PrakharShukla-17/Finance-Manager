import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseService";
import "./Dashboard.css";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [topCategory, setTopCategory] = useState("—");

  const loadData = async () => {
    const data = await getExpenses();
    setExpenses(data);

    // Calculate total spending
    const total = data.reduce((sum, exp) => sum + Number(exp.amount), 0);
    setTotalSpent(total);

    // Find top category
    const categoryTotals = {};
    data.forEach((exp) => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + Number(exp.amount);
    });

    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    setTopCategory(sortedCategories[0]?.[0] || "—");
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="dashboard">
      
      <h2>Overview</h2>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="card">
          <p>Total Spent</p>
          <h3>₹{totalSpent}</h3>
        </div>

        <div className="card">
          <p>Top Category</p>
          <h3>{topCategory}</h3>
        </div>

        <div className="card">
          <p>Transactions</p>
          <h3>{expenses.length}</h3>
        </div>
      </div>

      {/* Recent Transactions */}
      <h3 style={{ marginTop: "25px" }}>Recent Activity</h3>

      <div className="recent-list">
        {expenses.slice(0, 5).map((exp) => (
          <div className="recent-item" key={exp._id}>
            <span>{exp.title}</span>
            <span className="amount">₹{exp.amount}</span>
          </div>
        ))}

        {expenses.length === 0 && <p className="empty">No recent activity.</p>}
      </div>

      {/* Chart placeholder (for Step D) */}
      <div className="chart-placeholder">
        📊 Graphs & Insights Coming Next...
      </div>
    </div>
  );
}
