import { createContext, useState, useEffect } from "react";
import API from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await API.get("/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data.user);
            } catch (error) {
                console.error("User verification failed:", error.response?.data || error.message);
                setUser(null);
            }
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        console.log("Attempting login with:", { email, password });

        try {
            const res = await API.post("/auth/login", { email, password });
            console.log("Login success:", res.data);

            setUser(res.data.user);
            localStorage.setItem("token", res.data.token);

            return true; // Indicate success
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            return false; // Indicate failure
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
