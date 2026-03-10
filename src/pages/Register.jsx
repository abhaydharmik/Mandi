import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  document.title = "Mandi | Register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isDark, toggle } = useTheme();
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/[0.07] text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-neutral-600 outline-none focus:border-orange-500/60 dark:focus:border-orange-500/40 transition-colors";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex items-center justify-center px-4">
      <button onClick={toggle} className="fixed top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-neutral-900 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200" aria-label="Toggle theme">
        {isDark ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        )}
      </button>

      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-10">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-gray-900 dark:text-white font-bold text-xl tracking-tight">Mandi</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/6 rounded-2xl p-8">
          <h1 className="text-gray-900 dark:text-white text-2xl font-bold tracking-tight mb-1">Create account</h1>
          <p className="text-gray-500 dark:text-neutral-500 text-sm mb-8">Get started with Mandi today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Full Name", type: "text", placeholder: "John Doe", onChange: setName },
              { label: "Email", type: "email", placeholder: "you@example.com", onChange: setEmail },
              { label: "Password", type: "password", placeholder: "••••••••", onChange: setPassword },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-wider block mb-2">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className={inputClass} onChange={(e) => f.onChange(e.target.value)} />
              </div>
            ))}
            <button type="submit" className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors duration-150 mt-2">
              Create Account
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 dark:text-neutral-600 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;