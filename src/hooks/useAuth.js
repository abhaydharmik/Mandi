import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getUser = () => JSON.parse(localStorage.getItem("user"));

  const login = (email, password) => {
    setLoading(true);
    setError("");

    const storedUser = getUser();

    if (storedUser && email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("session", Date.now());
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  const register = (name, email, password) => {
    setLoading(true);
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    setLoading(false);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("session");
    navigate("/");
  };

  const updateProfile = (updates, onSuccess) => {
    setLoading(true);
    setTimeout(() => {
      const current = getUser();
      localStorage.setItem("user", JSON.stringify({ ...current, ...updates }));
      onSuccess?.();
      setLoading(false);
    }, 800);
  };

  const isLoggedIn = () => !!localStorage.getItem("session");

  return { login, register, logout, updateProfile, getUser, isLoggedIn, error, setError, loading };
};