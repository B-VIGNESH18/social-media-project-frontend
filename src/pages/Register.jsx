
import React, { useState } from "react";
import { TextField, Button, Typography, Alert } from "@mui/material";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <Typography className="register-title" variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            className="register-textfield"
            name="username"
            label="Username"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            className="register-textfield"
            name="email"
            label="Email"
            type="email"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            className="register-textfield"
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            fullWidth
            required
          />
          <Button
            className="register-button"
            type="submit"
            variant="contained"
            fullWidth
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
