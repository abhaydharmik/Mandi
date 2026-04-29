import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  document.title = "Mandi | Cart";

  const { cart, removeItem, increaseQuantity, decreaseQuantity, clearCart, subtotal, tax, total } = useCart();

  const handleClearCart = () => { if (window.confirm("Clear cart?")) clearCart(); };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-16 sm:pb-24">
        <div className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <p className="text-orange-500 text-xs tracking-[0.2em] uppercase font-medium mb-2 sm:mb-3">Checkout</p>
            <h1 className="text-gray-900 dark:text-white text-2xl sm:text-4xl font-bold tracking-tight">Your Cart</h1>
            <p className="text-gray-500 dark:text-neutral-500 text-sm mt-1">{cart.length} {cart.length === 1 ? "item" : "items"}</p>
          </div>
          {cart.length > 0 && (
            <button onClick={handleClearCart} className="text-xs text-gray-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 border border-gray-200 dark:border-white/6 hover:border-red-300 dark:hover:border-red-500/30 px-3 py-2 rounded-lg transition-all duration-150">
              Clear all
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-28 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/6 flex items-center justify-center mb-5 sm:mb-6">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-300 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-900 dark:text-white font-semibold mb-2">Your cart is empty</p>
            <p className="text-gray-500 dark:text-neutral-500 text-sm mb-6">Add some products to get started</p>
            <Link to="/products" className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium transition-colors">Browse Products</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="lg:col-span-2 space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/6 rounded-2xl p-4 sm:p-5 hover:border-gray-300 dark:hover:border-white/10 transition-colors duration-150">
                  <div className="flex gap-3 sm:gap-5">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-50 dark:bg-white flex items-center justify-center shrink-0 p-2 border border-gray-100 dark:border-0">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 mb-1">
                        <p className="text-gray-900 dark:text-white text-sm font-medium line-clamp-2 leading-snug">{item.title}</p>
                        <button onClick={() => removeItem(item.id)} className="text-gray-300 dark:text-neutral-600 hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                      <p className="text-gray-400 dark:text-neutral-600 text-xs capitalize mb-3">{item.category}</p>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => decreaseQuantity(item.id)} className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-white text-sm flex items-center justify-center transition-colors">−</button>
                          <span className="text-gray-900 dark:text-white text-sm font-semibold w-5 text-center tabular-nums">{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item.id)} className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-white text-sm flex items-center justify-center transition-colors">+</button>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 dark:text-neutral-500 text-xs">₹{item.price} × {item.quantity}</p>
                          <p className="text-gray-900 dark:text-white font-bold text-sm sm:text-base">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/6 rounded-2xl p-5 sm:p-6 lg:sticky lg:top-20">
                <h2 className="text-gray-900 dark:text-white font-semibold mb-5 sm:mb-6">Order Summary</h2>
                <div className="space-y-3 mb-4 sm:mb-5">
                  {[
                    { label: "Subtotal", value: `₹${subtotal.toFixed(2)}` },
                    { label: "Shipping", value: "Free", green: true },
                    { label: "Tax (10%)", value: `₹${tax.toFixed(2)}` },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-neutral-500">{row.label}</span>
                      <span className={row.green ? "text-emerald-500 dark:text-emerald-400 font-medium" : "text-gray-700 dark:text-neutral-300"}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 dark:border-white/6 pt-4 flex justify-between items-center mb-5 sm:mb-6">
                  <span className="text-gray-900 dark:text-white font-semibold">Total</span>
                  <span className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold tabular-nums">₹{total.toFixed(2)}</span>
                </div>
                <button className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors duration-150 mb-3">Proceed to Checkout</button>
                <Link to="/products" className="block text-center py-2.5 rounded-xl border border-gray-200 dark:border-white/6 text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/15 text-sm transition-all duration-150">Continue Shopping</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;