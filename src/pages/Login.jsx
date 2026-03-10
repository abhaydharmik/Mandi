import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  document.title = "Mandi | Login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("session", Date.now());
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/[0.07] text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-neutral-600 outline-none focus:border-orange-500/60 dark:focus:border-orange-500/40 transition-colors";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex items-center justify-center px-4">

      {/* Theme toggle */}
      <button
        onClick={toggle}
        className="fixed top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-neutral-900 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-10">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-gray-900 dark:text-white font-bold text-xl tracking-tight">Mandi</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/6 rounded-2xl p-8">
          <h1 className="text-gray-900 dark:text-white text-2xl font-bold tracking-tight mb-1">Welcome back</h1>
          <p className="text-gray-500 dark:text-neutral-500 text-sm mb-8">Sign in to your account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-wider block mb-2">Email</label>
              <input type="email" placeholder="you@example.com" className={inputClass} onChange={(e) => { setEmail(e.target.value); setError(""); }} />
            </div>
            <div>
              <label className="text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-wider block mb-2">Password</label>
              <input type="password" placeholder="••••••••" className={inputClass} onChange={(e) => { setPassword(e.target.value); setError(""); }} />
            </div>
            {error && (
              <p className="text-red-500 dark:text-red-400 text-xs flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-red-500 dark:bg-red-400 inline-block" />
                {error}
              </p>
            )}
            <button type="submit" className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors duration-150 mt-2">
              Sign in
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 dark:text-neutral-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;