import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("session");
    navigate("/");
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartCount(totalItems);
  };

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
    `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? "bg-white/10 text-white"
        : "text-white/50 hover:text-white hover:bg-white/10"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-neutral-950 border-b border-white/6 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 group"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 group-hover:scale-125 transition-transform duration-200" />
            <span className="font-bold text-white text-lg tracking-tight">
              Mandi
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={linkClass(to)}>
                {label}
                {isActive(to) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-500 rounded-full" />
                )}
              </Link>
            ))}

            {/* Cart */}
            <Link to="/cart" className={`${linkClass("/cart")} flex items-center gap-1.5`}>
              <svg
                className="w-4 h-4"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-4.5 h-4.5 px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full">
                  {cartCount}
                </span>
              )}
              {isActive("/cart") && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-500 rounded-full" />
              )}
            </Link>
          </div>

          {/* Right — Logout + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/50 border border-white/10 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-white/10 transition gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden border-t border-white/6 bg-neutral-900 transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 py-3" : "max-h-0"}`}>
        <div className="flex flex-col px-4 gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive(to) ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          ))}

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              isActive("/cart") ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            Cart
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={logout}
            className="mt-2 text-left px-4 py-3 rounded-lg text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all"
          >
            ↩ Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;