import React, { useEffect, useState, useCallback, useRef } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const LIMIT = 20;

// Skeleton that mirrors ProductCard layout
const SkeletonCard = () => (
  <div className="flex flex-col bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/6 rounded-2xl overflow-hidden">
    <div className="aspect-square bg-gray-100 dark:bg-neutral-800 animate-pulse" />
    <div className="flex flex-col flex-1 p-3 sm:p-4 gap-3">
      <div className="h-3 bg-gray-100 dark:bg-neutral-800 rounded-full animate-pulse w-full" />
      <div className="h-3 bg-gray-100 dark:bg-neutral-800 rounded-full animate-pulse w-2/3" />
      <div className="flex items-center gap-1.5 mt-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-sm bg-gray-100 dark:bg-neutral-800 animate-pulse" />
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="h-5 w-14 bg-gray-100 dark:bg-neutral-800 rounded-full animate-pulse" />
        <div className="h-8 w-14 bg-gray-100 dark:bg-neutral-800 rounded-xl animate-pulse" />
      </div>
    </div>
  </div>
);

const Products = () => {
  document.title = "Mandi | Products";

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const sentinelRef = useRef(null);
  const skipRef = useRef(0);
  const totalRef = useRef(0);
  const isFetchingRef = useRef(false);

  const buildUrl = (category, search, currentSkip) => {
    if (search)
      return `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${LIMIT}&skip=${currentSkip}`;
    if (category !== "all")
      return `https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${currentSkip}`;
    return `https://dummyjson.com/products?limit=${LIMIT}&skip=${currentSkip}`;
  };

  const fetchMore = useCallback((category, search, currentSkip, isReset) => {
    if (isFetchingRef.current) return;
    if (!isReset && currentSkip >= totalRef.current && totalRef.current !== 0) return;

    isFetchingRef.current = true;
    isReset ? setLoading(true) : setLoadingMore(true);

    fetch(buildUrl(category, search, currentSkip))
      .then((res) => { if (!res.ok) throw new Error("Failed to fetch"); return res.json(); })
      .then((data) => {
        totalRef.current = data.total;
        setTotal(data.total);
        setProducts((prev) => isReset ? data.products : [...prev, ...data.products]);
        const newSkip = currentSkip + data.products.length;
        skipRef.current = newSkip;
        setSkip(newSkip);
        isReset ? setLoading(false) : setLoadingMore(false);
        isFetchingRef.current = false;
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setLoadingMore(false);
        isFetchingRef.current = false;
      });
  }, []);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories([{ slug: "all", name: "All Categories" }, ...data]))
      .catch(() => setCategories([{ slug: "all", name: "All Categories" }]));
  }, []);

  useEffect(() => {
    skipRef.current = 0;
    totalRef.current = 0;
    setSkip(0);
    setProducts([]);
    const timer = setTimeout(() => {
      fetchMore(selectedCategory, searchQuery, 0, true);
    }, searchQuery ? 300 : 0);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, fetchMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetchingRef.current &&
          skipRef.current < totalRef.current
        ) {
          fetchMore(selectedCategory, searchQuery, skipRef.current, false);
        }
      },
      { rootMargin: "200px" }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [selectedCategory, searchQuery, fetchMore]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-16 sm:pb-24">

        <div className="mb-6 sm:mb-10">
          <p className="text-orange-500 text-xs tracking-[0.2em] uppercase font-medium mb-2 sm:mb-3">Catalog</p>
          <h1 className="text-gray-900 dark:text-white text-2xl sm:text-4xl font-bold tracking-tight">Products</h1>
        </div>

        <div className="flex flex-col gap-3 mb-4 sm:mb-6">
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/[0.07] text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-neutral-600 outline-none focus:border-orange-500/60 dark:focus:border-orange-500/40 transition-colors"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-48 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/[0.07] text-gray-700 dark:text-neutral-300 text-sm outline-none focus:border-orange-500/60 dark:focus:border-orange-500/40 transition-colors capitalize appearance-none cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>

        {!loading && !error && (
          <p className="text-gray-400 dark:text-neutral-600 text-xs mb-4 sm:mb-6 tabular-nums">
            Showing {products.length} of {total} products
          </p>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {!error && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">

            {/* Real cards */}
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* Skeleton cards — shown on first load AND on load-more */}
            {(loading || loadingMore) &&
              [...Array(LIMIT)].map((_, i) => <SkeletonCard key={`sk-${i}`} />)
            }
          </div>
        )}

        {/* Sentinel — triggers next fetch when scrolled into view */}
        <div ref={sentinelRef} className="w-full" />

        {!loading && !error && !loadingMore && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-neutral-500 text-sm">No products match your search.</p>
          </div>
        )}

        {!loading && !loadingMore && products.length >= total && total > 0 && (
          <p className="text-center text-gray-400 dark:text-neutral-600 text-xs pt-8">
            All {total} products loaded
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;