import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import api from "../api/axios";
import ExpenseCard from "../components/ExpenseCard";
import AddExpenseForm from "../components/AddExpenseForm";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/expense", {
        headers: { token: `Bearer ${token}` },
      });
      
      setExpenses(response.data.expenses);
    } catch {
      alert("Error fetching expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <AppLayout>
      <h2>Your Expenses</h2>

      <AddExpenseForm onAdded={fetchExpenses} />

      <div style={{ marginTop: "20px" }}>
        {expenses.length === 0 ? (
          <p>No expenses recorded yet.</p>
        ) : (
          expenses.map((exp) => (
            <ExpenseCard key={exp._id} expense={exp} />
          ))
        )}
      </div>
    </AppLayout>
  );
}
