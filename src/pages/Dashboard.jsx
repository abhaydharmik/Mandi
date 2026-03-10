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
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-16 sm:pb-24">

        {/* Welcome */}
        <div className="mb-8 sm:mb-14">
          <p className="text-orange-500 text-xs tracking-[0.2em] uppercase font-medium mb-2 sm:mb-3">Dashboard</p>
          <h1 className="text-gray-900 dark:text-white text-2xl sm:text-4xl font-bold tracking-tight mb-2">
            Welcome back, {firstName}.
          </h1>
          <p className="text-gray-500 dark:text-neutral-500 text-sm">Your cart and activity at a glance.</p>
        </div>

        {/* Stats — stacks on mobile, row on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:divide-x divide-gray-200 dark:divide-white/6 border border-gray-200 dark:border-white/6 rounded-2xl overflow-hidden mb-4 sm:mb-6">
          {[
            { to: "/cart",     label: "In Cart", value: cartItemsCount, sub: `item${cartItemsCount !== 1 ? "s" : ""}`, cta: "View cart →" },
            { to: "/cart",     label: "Total",   value: `₹${cartTotal.toFixed(0)}`, sub: `.${String(cartTotal.toFixed(2)).split(".")[1]} paise`, cta: "View cart →" },
            { to: "/products", label: "Catalog", value: "All", sub: "products", cta: "Browse →" },
          ].map((s, i) => (
            <Link key={s.label} to={s.to}
              className={`group p-5 sm:p-7 bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/70 transition-colors duration-150 flex sm:block items-center justify-between sm:justify-start gap-4 ${i < 2 ? "border-b sm:border-b-0 border-gray-200 dark:border-white/6" : ""}`}
            >
              <div>
                <p className="text-gray-400 dark:text-neutral-500 text-xs mb-1 sm:mb-4 uppercase tracking-widest">{s.label}</p>
                <p className="text-gray-900 dark:text-white text-3xl sm:text-5xl font-bold tabular-nums mb-0.5 sm:mb-1">{s.value}</p>
                <p className="text-gray-400 dark:text-neutral-600 text-xs">{s.sub}</p>
              </div>
              <span className="sm:block sm:mt-5 text-orange-500 text-xs shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">{s.cta}</span>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 sm:mb-6">
          {[
            { to: "/products", label: "Browse Products", desc: "Explore the catalog", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
            { to: "/cart",     label: "View Cart",        desc: "Review your selections", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
            { to: "/profile",  label: "My Profile",       desc: "Account settings", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
          ].map((a) => (
            <Link key={a.to} to={a.to} className="group flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/6 hover:border-orange-500/40 dark:hover:border-orange-500/25 hover:bg-orange-50/50 dark:hover:bg-neutral-800/50 transition-all duration-150">
              <span className="text-orange-400 shrink-0 group-hover:scale-110 transition-transform duration-150">{a.icon}</span>
              <div>
                <p className="text-gray-900 dark:text-white text-sm font-medium">{a.label}</p>
                <p className="text-gray-500 dark:text-neutral-500 text-xs mt-0.5">{a.desc}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 dark:text-neutral-600 ml-auto shrink-0 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Getting Started */}
        <div className="rounded-xl border border-gray-200 dark:border-white/6 bg-white dark:bg-neutral-900 p-5 sm:p-7">
          <p className="text-gray-900 dark:text-white text-sm font-semibold mb-5 sm:mb-6">How it works</p>

          {/* Horizontal on sm+, vertical on mobile */}
          <div className="hidden sm:flex items-start">
            {["Browse the product catalog", "Add what you want to cart", "Review and place your order"].map((text, i, arr) => (
              <div key={i} className="flex-1 relative">
                {i < arr.length - 1 && <span className="absolute top-3 left-1/2 w-full h-px bg-gray-200 dark:bg-white/6" />}
                <div className="flex flex-col items-center text-center px-4">
                  <span className="relative z-10 w-6 h-6 rounded-full border border-orange-500/40 text-orange-400 text-[10px] font-bold flex items-center justify-center bg-white dark:bg-neutral-900 mb-3">{i + 1}</span>
                  <p className="text-gray-500 dark:text-neutral-400 text-xs leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:hidden">
            {["Browse the product catalog", "Add what you want to cart", "Review and place your order"].map((text, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-full border border-orange-500/40 text-orange-400 text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <p className="text-gray-500 dark:text-neutral-400 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;