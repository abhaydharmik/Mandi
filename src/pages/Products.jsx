import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const Products = () => {
  document.title = "Mandi | Products";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => { if (!res.ok) throw new Error("Failed to fetch"); return res.json(); })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setCategories(["all", ...new Set(data.map((p) => p.category))]);
        setLoading(false);
      })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory !== "all") filtered = filtered.filter((p) => p.category === selectedCategory);
    if (searchQuery) filtered = filtered.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-24">

        {/* Header */}
        <div className="mb-10">
          <p className="text-orange-500 text-xs tracking-[0.2em] uppercase font-medium mb-3">Catalog</p>
          <h1 className="text-white text-4xl font-bold tracking-tight">Products</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-white/[0.07] text-white text-sm placeholder:text-neutral-600 outline-none focus:border-orange-500/40 transition-colors"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/[0.07] text-neutral-300 text-sm outline-none focus:border-orange-500/40 transition-colors capitalize appearance-none cursor-pointer min-w-40"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
            ))}
          </select>
        </div>

        {/* Meta */}
        {!loading && !error && (
          <p className="text-neutral-600 text-xs mb-6 tabular-nums">
            {filteredProducts.length} of {products.length} products
          </p>
        )}

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center py-28 gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
            <span className="text-neutral-500 text-sm">Loading products...</span>
          </div>
        )}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-sm">No products match your search.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;