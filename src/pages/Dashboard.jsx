import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  document.title = "Mandi | Dashboard";

  const user = JSON.parse(localStorage.getItem("user"));
  const firstName = user?.name?.split(" ")[0] ?? "there";

  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemsCount(cart.reduce((t, i) => t + (i.quantity || 1), 0));
    setCartTotal(cart.reduce((t, i) => t + i.price * (i.quantity || 1), 0));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-14 pb-24">

        {/* Welcome */}
        <div className="mb-14">
          <p className="text-orange-500 text-xs tracking-[0.2em] uppercase font-medium mb-3">
            Dashboard
          </p>
          <h1 className="text-white text-4xl font-bold tracking-tight mb-2">
            Welcome back, {firstName}.
          </h1>
          <p className="text-neutral-500 text-sm">
            Your cart and activity at a glance.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-white/6 border border-white/6 rounded-2xl overflow-hidden mb-6">

          {/* Cart count */}
          <Link to="/cart" className="group p-7 bg-neutral-900 hover:bg-neutral-800/70 transition-colors duration-150">
            <p className="text-neutral-500 text-xs mb-4 uppercase tracking-widest">In Cart</p>
            <p className="text-white text-5xl font-bold tabular-nums mb-1">
              {cartItemsCount}
            </p>
            <p className="text-neutral-600 text-xs">
              item{cartItemsCount !== 1 ? "s" : ""}
            </p>
            <span className="block mt-5 text-orange-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              View cart →
            </span>
          </Link>

          {/* Cart total */}
          <Link to="/cart" className="group p-7 bg-neutral-900 hover:bg-neutral-800/70 transition-colors duration-150">
            <p className="text-neutral-500 text-xs mb-4 uppercase tracking-widest">Total</p>
            <p className="text-white text-5xl font-bold tabular-nums mb-1">
              ₹{cartTotal.toFixed(0)}
            </p>
            <p className="text-neutral-600 text-xs">.{String(cartTotal.toFixed(2)).split(".")[1]} paise</p>
            <span className="block mt-5 text-orange-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              View cart →
            </span>
          </Link>

          {/* Catalog */}
          <Link to="/products" className="group p-7 bg-neutral-900 hover:bg-neutral-800/70 transition-colors duration-150">
            <p className="text-neutral-500 text-xs mb-4 uppercase tracking-widest">Catalog</p>
            <p className="text-white text-5xl font-bold mb-1">All</p>
            <p className="text-neutral-600 text-xs">products</p>
            <span className="block mt-5 text-orange-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              Browse →
            </span>
          </Link>

        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { to: "/products", label: "Browse Products", desc: "Explore the catalog", icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            )},
            { to: "/cart", label: "View Cart", desc: "Review your selections", icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )},
            { to: "/profile", label: "My Profile", desc: "Account settings", icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )},
          ].map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group flex items-start gap-4 p-5 rounded-xl bg-neutral-900 border border-white/6 hover:border-orange-500/25 hover:bg-neutral-800/50 transition-all duration-150"
            >
              <span className="mt-0.5 text-orange-400 shrink-0 group-hover:scale-110 transition-transform duration-150">
                {a.icon}
              </span>
              <div>
                <p className="text-white text-sm font-medium">{a.label}</p>
                <p className="text-neutral-500 text-xs mt-0.5">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Getting Started */}
        <div className="rounded-xl border border-white/6 bg-neutral-900 p-7">
          <p className="text-white text-sm font-semibold mb-6">How it works</p>
          <div className="flex items-start gap-0">
            {[
              { n: "01", text: "Browse the product catalog" },
              { n: "02", text: "Add what you want to cart" },
              { n: "03", text: "Review and place your order" },
            ].map((s, i) => (
              <div key={i} className="flex-1 relative">
                {/* Connector line */}
                {i < 2 && (
                  <span className="absolute top-3 left-1/2 w-full h-px bg-white/6" />
                )}
                <div className="flex flex-col items-center text-center px-4">
                  <span className="relative z-10 w-6 h-6 rounded-full border border-orange-500/40 text-orange-400 text-[10px] font-bold flex items-center justify-center bg-neutral-900 mb-3">
                    {i + 1}
                  </span>
                  <p className="text-neutral-400 text-xs leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;