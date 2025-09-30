"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  //get total price
  let totalPrice = cart.reduce(
    (sum, drink) => sum + drink.price * drink.numberOfOrders,
    0
  );

  async function handleOrder() {
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, totalPrice }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Order placed! Check your email.");
        clearCart();
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="p-29 flex flex-col items-center h-screen justify-center">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cart.map((drink) => (
        <div
          key={drink.id}
          className="flex items-center justify-center gap-4 my-2"
        >
          <Image
            src={drink.image}
            alt={drink.name}
            width={50}
            height={50}
            className="rounded-xl shadow-lg"
          />
          <p>{drink.name}</p>
          <p>
            (${drink.price} × {drink.numberOfOrders})
          </p>
          <p>({drink.numberOfOrders})</p>
          <button onClick={() => addToCart(drink)}>+</button>
          <button onClick={() => removeFromCart(drink.id)}>-</button>
        </div>
      ))}
      <p>Total: {totalPrice}</p>
      <div className="flex gap-1.5">
        <button
          onClick={clearCart}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
        <button
          onClick={handleOrder}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Order
        </button>
      </div>
    </div>
  );
}
