import { useState, useEffect, useCallback } from "react";

const getCartFromStorage = () => JSON.parse(localStorage.getItem("cart")) || [];

const syncCart = (updated) => {
  localStorage.setItem("cart", JSON.stringify(updated));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const useCart = () => {
  const [cart, setCart] = useState(getCartFromStorage);

  // Stay in sync if cartUpdated fires from another component
  useEffect(() => {
    const onUpdate = () => setCart(getCartFromStorage());
    window.addEventListener("cartUpdated", onUpdate);
    return () => window.removeEventListener("cartUpdated", onUpdate);
  }, []);

  const update = useCallback((updated) => {
    setCart(updated);
    syncCart(updated);
  }, []);

  const addItem = useCallback((product) => {
    const current = getCartFromStorage();
    const existing = current.find((i) => i.id === product.id);
    const updated = existing
      ? current.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...current, { ...product, quantity: 1 }];
    update(updated);
  }, [update]);

  const removeItem = useCallback((id) => {
    update(getCartFromStorage().filter((i) => i.id !== id));
  }, [update]);

  const increaseQuantity = useCallback((id) => {
    update(getCartFromStorage().map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  }, [update]);

  const decreaseQuantity = useCallback((id) => {
    update(getCartFromStorage().map((i) => i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i));
  }, [update]);

  const clearCart = useCallback(() => update([]), [update]);

  const itemCount = cart.reduce((t, i) => t + (i.quantity || 1), 0);
  const subtotal  = cart.reduce((t, i) => t + i.price * i.quantity, 0);
  const tax       = subtotal * 0.1;
  const total     = subtotal + tax;

  return {
    cart,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    itemCount,
    subtotal,
    tax,
    total,
  };
};