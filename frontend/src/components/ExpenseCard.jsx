import "./ExpenseCard.css";

export default function ExpenseCard({ expense }) {
  return (
    <div className="expense-card">
      <div>
        <h3>{expense.title}</h3>
        <p className="expense-category">{expense.category}</p>
      </div>

      <div className="expense-right">
        <p className="expense-amount">₹{expense.amount}</p>
        <p className="expense-date">{new Date(expense.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
