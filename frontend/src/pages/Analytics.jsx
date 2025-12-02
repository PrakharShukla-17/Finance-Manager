// src/pages/Analytics.jsx
import { useEffect, useState } from "react";
import axios from "../services/api";
import "./Analytics.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("/analytics", {
        headers: { token: `Bearer ${token}` },
      });
      setAnalytics(res.data);
    } catch (err) {
      console.error("Analytics Fetch Error:", err);
    }
  };

  if (!analytics) return <p className="loading">Loading analytics...</p>;

  const trendData = analytics.charts.trend || [];
  const categoryBreakdown = analytics.charts.categoryBreakdown || [];
  const topCategories = analytics.topCategories || [];

  return (
    <div className="analytics-container">

      <h2 className="analytics-title">Financial Analytics</h2>

      {/* Spending Trend */}
      <div className="analytics-card">
        <h3>Monthly Spending Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#4F8FF7" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown */}
      <div className="analytics-card">
        <h3>Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={categoryBreakdown}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4F8FF7" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TOP CATEGORIES SECTION (NEW) */}
      <div className="analytics-card">
        <h3>Top Expense Categories</h3>

        {topCategories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          topCategories.map((cat, index) => (
            <div key={cat._id} className="top-category-item">
              <span className="rank">{index + 1}. {cat._id}</span>
              <span className="bar">
                <div
                  className="fill"
                  style={{
                    width: `${(cat.total / topCategories[0].total) * 100}%`,
                  }}
                ></div>
              </span>
              <strong className="amount">₹{cat.total}</strong>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
