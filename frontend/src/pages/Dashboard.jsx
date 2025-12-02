import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseService";
import "./Dashboard.css";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const data = await getExpenses();
    if (data) setExpenses(data);
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="dashboard-container">
      <div className="summary-card">
        <h3>Total Spent</h3>
        <p className="amount">₹{total}</p>
      </div>

      <h2>Recent Transactions</h2>
      {recentExpenses.length === 0 && <p>No transactions yet.</p>}

      {recentExpenses.map((item) => (
        <div key={item._id} className="transaction-item">
          <span>{item.title}</span>
          <span className="amt">₹{item.amount}</span>
        </div>
      ))}
    </div>
  );
}
