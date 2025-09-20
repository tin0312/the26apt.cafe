"use client";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cart.map((drink) => (
        <div key={drink.id} className="flex items-center gap-4 my-2">
            <Image
                src={drink.image}
                alt={drink.name}
                width={300}
                height={300}
                className="rounded-xl shadow-lg"
              />
          <p>{drink.name}</p>
          <p>({drink.numberOfOrders})</p>
          <button onClick={() => addToCart(drink)}>+</button>
          <button onClick={() => removeFromCart(drink.id)}>-</button>
        </div>
      ))}
      <button onClick={clearCart} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Clear Cart
      </button>
    </div>
  );
}
