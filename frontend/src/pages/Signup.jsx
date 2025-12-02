import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import api from "../api/axios"; // <-- make sure this import exists

export default function Signup() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/signup", {
      userEmail: form.email,
      userPassword: form.password,
      userFirstName: form.firstname,
      userLastName: form.lastname,
    });

    alert("Signup successful!");
    nav("/login");

  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.msg || "Signup failed");
  }
};


  return (
    <div className="auth-form-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />

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

          <button type="submit" className="btn primary">
            Sign Up
          </button>
        </form>

        <p className="swap-text">
          Already have an account?{" "}
          <span onClick={() => nav("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}
