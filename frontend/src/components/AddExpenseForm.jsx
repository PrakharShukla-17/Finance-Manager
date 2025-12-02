import { useState } from "react";
import api from "../api/axios";
import "./AddExpenseForm.css";

export default function AddExpenseForm({ onAdded }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/expense", form, {
  headers: { token: `Bearer ${token}` }
});


      onAdded(); // refresh parent data
      setForm({ title: "", amount: "", category: "", date: "" });

    } catch (err) {
      alert(err.response?.data?.msg || "Error adding expense");
    }
  };

  return (
    <form className="expense-form" onSubmit={submitHandler}>
      <input name="title" placeholder="Title" value={form.title} required onChange={handleChange} />
      <input name="amount" type="number" placeholder="Amount" value={form.amount} required onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} required onChange={handleChange} />
      <input name="date" type="date" value={form.date} onChange={handleChange} />

      <button type="submit" className="btn primary">Add</button>
    </form>
  );
}
