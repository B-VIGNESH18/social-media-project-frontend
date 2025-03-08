
import { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const success = await login(form.email, form.password);
            if (success) {
                navigate("/");
            }
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <Typography className="login-title" variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField 
                        className="login-textfield"
                        name="email" 
                        label="Email" 
                        type="email" 
                        onChange={handleChange} 
                        fullWidth 
                        required 
                    />
                    <TextField 
                        className="login-textfield"
                        name="password" 
                        label="Password" 
                        type="password" 
                        onChange={handleChange} 
                        fullWidth 
                        required 
                    />
                    <Button 
                        className="login-button"
                        type="submit" 
                        variant="contained" 
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
