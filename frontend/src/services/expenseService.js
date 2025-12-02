import axios from "axios";

const API = "https://finance-manager-0fv5.onrender.com";

export const getExpenses = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(API, {
      headers: { token: `Bearer ${token}` }
    });

    return res.data.expenses;
  } catch (error) {
    console.error("❌ Error fetching expenses:", error.response?.data || error);
    return [];
  }
};


// 🔹 Add Expense (Formatted to match backend Zod schema)
export const addExpense = async (expenseData) => {
  try {
    const token = localStorage.getItem("token");

    const formattedData = {
      title: expenseData.title || "",
      amount: expenseData.amount?.toString() || "0",
      category: expenseData.category || "",
      date: expenseData.date || new Date().toISOString(),
      notes: expenseData.notes || ""
    };

    console.log("📤 Sending to backend:", formattedData);

    const res = await axios.post(API, formattedData, {
      headers: { token: `Bearer ${token}` }
    });

    return res.data;
  } catch (error) {
    console.error("❌ Error adding expense:", error.response?.data || error);
    return null;
  }
};


// 🔹 Update Expense (also must match schema)
export const updateExpense = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("token");

    const formattedData = {
      title: updatedData.title || "",
      amount: updatedData.amount?.toString() || "0",
      category: updatedData.category || "",
      date: updatedData.date || new Date().toISOString(),
      notes: updatedData.notes || ""
    };

    const res = await axios.put(`${API}/${id}`, formattedData, {
      headers: { token: `Bearer ${token}` }
    });

    return res.data;
  } catch (error) {
    console.error("❌ Error updating expense:", error.response?.data || error);
    return null;
  }
};


// 🔹 Delete Expense
export const deleteExpense = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${API}/${id}`, {
      headers: { token: `Bearer ${token}` }
    });

    return true;
  } catch (error) {
    console.error("❌ Error deleting expense:", error.response?.data || error);
    return false;
  }
};
