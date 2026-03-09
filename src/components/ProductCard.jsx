import React from "react";

const ProductCard = ({ product }) => {
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product Added!!")
  };

  return (
    <div className="border-2  rounded-lg text-center flex flex-col justify-around items-center p-6">
      <div className="flex justify-center">
        <img src={product.image} alt="product-img" className="h-40" />
      </div>

      <div className="mt-4">
        <h3 className="font-bold px-4">{product.title}</h3>
        <p className="text-blue-500 font-medium text-lg">₹{product.price}</p>
      </div>
      <button
        onClick={addToCart}
        className="px-2 py-2 mt-4 w-30 rounded text-sm bg-black text-white hover:scale-95 cursor-pointer transition"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
