import React, { useState } from "react";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Added to cart", {
      style: {
        background: "#1a1a1a",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.08)",
        fontSize: "13px",
      },
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const stars = Math.round(product.rating?.rate || 0);

  return (
    <div className="group flex flex-col bg-neutral-900 border border-white/6 rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl">

      {/* Image */}
      <div className="relative aspect-square bg-white p-5 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {/* Category pill */}
        <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-500 bg-neutral-950/80 border border-white/6 px-2.5 py-1 rounded-full backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Title */}
        <h3 className="text-white text-sm font-medium leading-snug line-clamp-2 min-h-10">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                className={`w-3 h-3 ${s <= stars ? "text-orange-400" : "text-neutral-700"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-neutral-400 text-xs tabular-nums">
            {product.rating?.rate}
          </span>
          <span className="text-neutral-600 text-xs tabular-nums">
            ({product.rating?.count || 0})
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-white text-xl font-bold tabular-nums">
            ₹{product.price}
          </span>

          <button
            onClick={addToCart}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95 ${
              added
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                : "bg-orange-500 hover:bg-orange-400 text-white"
            }`}
          >
            {added ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;