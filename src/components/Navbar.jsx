import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { SESSION_DURATION } from "../routes/ProtectedRoute";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggle } = useTheme();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const logout = () => { localStorage.removeItem("session"); navigate("/"); };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((total, item) => total + (item.quantity || 1), 0));
  };

  // Session countdown
  useEffect(() => {
    const tick = () => {
      const session = localStorage.getItem("session");
      if (!session) { setTimeLeft(null); return; }

      const remaining = SESSION_DURATION - (Date.now() - Number(session));

      if (remaining <= 0) {
        localStorage.removeItem("session");
        navigate("/");
        return;
      }

      setTimeLeft(remaining);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/products", label: "Products" },
    { to: "/profile", label: "Profile" },
  ];

  const linkClass = (path) =>
    `relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? "bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white"
        : "text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
    }`;

  // Format ms → "14:32"
  const formatTime = (ms) => {
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60).toString().padStart(2, "0");
    const s = (total % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Warning when < 2 minutes left
  const isWarning = timeLeft !== null && timeLeft < 2 * 60 * 1000;

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-white/[0.06] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">

          <Link to="/dashboard" className="flex items-center gap-2 group shrink-0">
            <span className="w-2 h-2 rounded-full bg-orange-500 group-hover:scale-125 transition-transform duration-200" />
            <span className="font-bold text-gray-900 dark:text-white text-base sm:text-lg tracking-tight">Mandi</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={linkClass(to)}>
                {label}
                {isActive(to) && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-500 rounded-full" />}
              </Link>
            ))}
            <Link to="/cart" className={`${linkClass("/cart")} flex items-center gap-1.5`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full">{cartCount}</span>
              )}
              {isActive("/cart") && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-500 rounded-full" />}
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Session Timer */}
            {timeLeft !== null && (
              <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium transition-colors duration-300 ${
                isWarning
                  ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-500 dark:text-red-400"
                  : "bg-gray-50 dark:bg-white/[0.04] border-gray-200 dark:border-white/[0.08] text-gray-400 dark:text-neutral-500"
              }`}>
                <svg className={`w-3 h-3 ${isWarning ? "text-red-400 dark:text-red-400" : "text-gray-400 dark:text-neutral-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTime(timeLeft)}
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggle}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200"
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

            {/* Logout */}
            <button
              onClick={logout}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-white/50 border border-gray-200 dark:border-white/10 hover:text-red-500 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-500/40 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-gray-900 dark:bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gray-900 dark:bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gray-900 dark:bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden border-t border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-neutral-900 transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 py-3" : "max-h-0"}`}>
        <div className="flex flex-col px-4 gap-1">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive(to) ? "bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white" : "text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"}`}
            >{label}</Link>
          ))}
          <Link to="/cart" onClick={() => setMenuOpen(false)}
            className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive("/cart") ? "bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white" : "text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"}`}
          >
            Cart
            {cartCount > 0 && <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-full">{cartCount}</span>}
          </Link>

          {/* Timer in mobile menu */}
          {timeLeft !== null && (
            <div className={`mx-0 mt-1 flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-mono font-medium ${
              isWarning
                ? "bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400"
                : "bg-gray-100 dark:bg-white/[0.04] text-gray-400 dark:text-neutral-500"
            }`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Session: {formatTime(timeLeft)}
            </div>
          )}

          <button onClick={logout} className="mt-2 text-left px-4 py-3 rounded-lg text-sm font-medium text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all">
            ↩ Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;