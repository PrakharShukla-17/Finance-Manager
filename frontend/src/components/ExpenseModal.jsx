import { useEffect, useState } from "react";
import { addExpense, updateExpense } from "../services/expenseService";
import "./ExpenseModal.css";

export default function ExpenseModal({ isOpen, onClose, expense, onSaved }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: ""
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title,
        amount: expense.amount.toString(),
        category: expense.category,
        date: expense.date?.slice(0, 10) || "",
        notes: expense.notes || ""
      });
    } else {
      setFormData({ title: "", amount: "", category: "", date: "", notes: "" });
    }
  }, [expense]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (expense) await updateExpense(expense._id, formData);
    else await addExpense(formData);

    onSaved();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{expense ? "Edit Expense" : "Add Expense"}</h2>

        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <input name="amount" placeholder="Amount" value={formData.amount} type="number" onChange={handleChange} required />
          <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
          <input name="date" type="date" value={formData.date} onChange={handleChange} />
          <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">{expense ? "Save Changes" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
