import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
 import api from "../api/axios"; // <-- must be added

export default function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", {
      userEmail: form.email,
      userPassword: form.password,
    });

    localStorage.setItem("token", response.data.token);

    alert("Login successful!");
    nav("/dashboard");

  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.msg || "Login failed");
  }
};


  return (
    <div className="auth-form-wrapper">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn primary">Login</button>
        </form>

        <p className="swap-text">
          Don't have an account?{" "}
          <span onClick={() => nav("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
