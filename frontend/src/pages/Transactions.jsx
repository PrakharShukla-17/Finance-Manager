import { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../services/expenseService";
import ExpenseModal from "../components/ExpenseModal";
import "./Transactions.css";

export default function Transactions() {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    const deleted = await deleteExpense(id);
    if (deleted) fetchExpenses();
  };

  return (
    <div className="transactions-container">
      <div className="transaction-header">
        <h2>Transactions</h2>
        <button
          className="add-btn"
          onClick={() => {
            setSelectedExpense(null);
            setModalOpen(true);
          }}
        >
          + Add
        </button>
      </div>

      {expenses.length === 0 && <p className="empty">No transactions yet.</p>}

      {expenses.map((exp) => (
        <div key={exp._id} className="transaction-row">
          <div className="info">
            <strong>{exp.title}</strong>
            <p className="date">{new Date(exp.date).toLocaleDateString()}</p>
          </div>

          <div className="actions">
            <span className="amount">₹{exp.amount}</span>

            <button
              className="icon-btn"
              onClick={() => {
                setSelectedExpense(exp);
                setModalOpen(true);
              }}
            >
              ✏️
            </button>

            <button className="icon-btn delete" onClick={() => handleDelete(exp._id)}>
              🗑️
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        expense={selectedExpense}
        onSaved={fetchExpenses}
      />
    </div>
  );
}
