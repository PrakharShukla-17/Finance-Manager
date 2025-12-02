import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseService";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./Analytics.css";

const COLORS = ["#4a8cff", "#7b6cff", "#ff7f50", "#22c55e", "#ffa500", "#ff3333"];

export default function Analytics() {
  const [expenses, setExpenses] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [filter, setFilter] = useState("Monthly"); // default filter

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [expenses, filter]);

  const loadData = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  const applyFilter = () => {
    if (filter === "Daily") generateDailyTrend();
    else if (filter === "Yearly") generateYearlyTrend();
    else if (filter === "All") generateAllTimeTrend();
    else generateMonthlyTrend();

    generateCategoryBreakdown();
  };

  // ------------ TREND CALCULATIONS --------------

  const generateMonthlyTrend = () => {
    const monthlyTotals = {};

    expenses.forEach((item) => {
      const d = new Date(item.date);
      const key = `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;
      monthlyTotals[key] = (monthlyTotals[key] || 0) + Number(item.amount);
    });

    setTrendData(Object.entries(monthlyTotals).map(([month, total]) => ({ month, total })));
  };

  const generateYearlyTrend = () => {
    const yearlyTotals = {};

    expenses.forEach((item) => {
      const year = new Date(item.date).getFullYear();
      yearlyTotals[year] = (yearlyTotals[year] || 0) + Number(item.amount);
    });

    setTrendData(Object.entries(yearlyTotals).map(([year, total]) => ({ month: year, total })));
  };

  const generateDailyTrend = () => {
    const dailyTotals = {};

    expenses.forEach((item) => {
      const d = new Date(item.date);
      const key = d.toLocaleDateString();
      dailyTotals[key] = (dailyTotals[key] || 0) + Number(item.amount);
    });

    setTrendData(Object.entries(dailyTotals).map(([day, total]) => ({ month: day, total })));
  };

  const generateAllTimeTrend = () => {
    const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    setTrendData([{ month: "Total", total }]);
  };

  // -------- CATEGORY PIE CHART --------
  const generateCategoryBreakdown = () => {
    const totals = {};

    expenses.forEach((item) => {
      totals[item.category] = (totals[item.category] || 0) + Number(item.amount);
    });

    setCategoryData(
      Object.entries(totals).map(([name, value]) => ({
        name,
        value,
        percentage: ((value / Object.values(totals).reduce((a,b)=>a+b,0)) * 100).toFixed(1)
      }))
    );
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Spending Analytics</h2>

        <select className="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>Daily</option>
          <option>Monthly</option>
          <option>Yearly</option>
          <option>All</option>
        </select>
      </div>


      {/* ---- BAR CHART ---- */}
      <div className="chart-box">
        <h3>{filter} Spending Trend</h3>
        {trendData.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#4a8cff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="placeholder">Not enough data.</p>
        )}
      </div>


      {/* ---- PIE CHART ---- */}
      <div className="chart-box">
        <h3>Category Breakdown</h3>

        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label={({ name, percentage }) =>
                  `${name} (${percentage}%)`
                }
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="placeholder">No categorized data yet.</p>
        )}
      </div>
    </div>
  );
}
