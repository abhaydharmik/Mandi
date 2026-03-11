import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";

const EyeIcon = ({ open }) => open ? (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
) : (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const Register = () => {
  document.title = "Mandi | Register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
              { label: "Full Name", type: "text", placeholder: "Your Full Name", onChange: setName },
              { label: "Email", type: "email", placeholder: "Your Email", onChange: setEmail },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-wider block mb-2">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className={inputClass} onChange={(e) => f.onChange(e.target.value)} />
              </div>
            ))}

            {/* Password with eye toggle */}
            <div>
              <label className="text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-wider block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your Password"
                  className={`${inputClass} pr-10`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-500 hover:text-gray-700 dark:hover:text-neutral-300 transition-colors"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

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