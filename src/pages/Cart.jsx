import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Cart = () => {

  document.title = "Mandi | Cart"

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(items);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-6">
        {cart.map((item)=> (
          <div key={item.id} className="border p-3 mb-3">
            <img src={item.image} alt="item-img" className="h-25" />
            <p>{item.title}</p>
            <span>₹{item.price}</span>
          </div>
        ))}
        </div>
    </div>
  );
};

export default Cart;
