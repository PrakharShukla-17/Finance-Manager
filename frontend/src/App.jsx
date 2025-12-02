import { Routes, Route } from "react-router-dom";
import AuthLanding from "./pages/AuthLanding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import Expenses from "./pages/Expenses";

export default function App() {
  return (
    <Routes>

      {/* Public pages */}
      <Route path="/" element={<AuthLanding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected pages under sidebar layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

    </Routes>
  );
}
