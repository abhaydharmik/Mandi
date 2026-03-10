import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  document.title = "Mandi | Register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    navigate("/");
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/[0.07] text-white text-sm placeholder:text-neutral-600 outline-none focus:border-orange-500/40 transition-colors";

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-10">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-white font-bold text-xl tracking-tight">Mandi</span>
        </div>

        <div className="bg-neutral-900 border border-white/6 rounded-2xl p-8">
          <h1 className="text-white text-2xl font-bold tracking-tight mb-1">Create account</h1>
          <p className="text-neutral-500 text-sm mb-8">Get started with Mandi today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-2">Full Name</label>
              <input type="text" placeholder="John Doe" className={inputClass} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-2">Email</label>
              <input type="email" placeholder="you@example.com" className={inputClass} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-2">Password</label>
              <input type="password" placeholder="••••••••" className={inputClass} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors duration-150 mt-2">
              Create Account
            </button>
          </form>
        </div>

        <p className="text-center text-neutral-600 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;