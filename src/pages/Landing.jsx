import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-title">👋 Welcome to Social Media Feed</div>
      <div className="landing-subtitle">Connect. Share. Inspire. 🚀</div>
      <div className="landing-buttons">
        <button className="landing-button" onClick={() => navigate("/login")}>
          🔑 Login
        </button>
        <button className="landing-button" onClick={() => navigate("/register")}>
          📝 Register
        </button>
      </div>
    </div>
  );
};

export default Landing;

