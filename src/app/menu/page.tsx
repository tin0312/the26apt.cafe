"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useCart, Drink } from "../context/CartContext"; 


const drinksData: Drink[] = [
  { id: 1, name: "Matcha Latte", image: "/images/matcha-latte.jpg", numberOfOrders: 0, price: 5 },
  { id: 2, name: "Creamy Matcha", image: "/images/creamy-matcha.jpg", numberOfOrders: 0, price: 6 },
  { id: 3, name: "Coco Matcha", image: "/images/coco-matcha.jpg", numberOfOrders: 0  , price: 5.5},
  { id: 4, name: "Grass Jelly Coffee", image: "/images/grass-jelly-coffee.jpg", numberOfOrders: 0, price: 5.5 },
  { id: 5, name: "Almond Coffee", image: "/images/almond-coffee.jpg", numberOfOrders: 0, price: 5.5 },
];

export default function ShowMenu() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart } = useCart();


  const getDrinkCount = (id: number) => {
    const drinkInCart = cart.find((d) => d.id === id);
    return drinkInCart ? drinkInCart.numberOfOrders : 0;
  };
  // Calculate cart count (sum of all orders)
  let cartCount = cart.reduce(
    (sum, drink) => sum + drink.numberOfOrders,
    0
  );

  return (
    <div className="mb-12 flex flex-col items-center gap-6 p-6">
      {/* Cart button with badge */}
      <div className="fixed right-10 top-6">
        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-bag"
          >
            <path d="M16 10a4 4 0 0 1-8 0" />
            <path d="M3.103 6.034h17.794" />
            <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
          </svg>
          {cartCount > 0 && (
            <span
              className="
                absolute -top-2 -right-2
                bg-red-600 text-white
                text-xs font-bold
                rounded-full
                h-5 w-5
                flex items-center justify-center
                shadow
              "
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
      <h1 className="text-2xl font-bold mt-40">Our Drinks</h1>

      <div className="flex flex-col gap-8">
        {drinksData.map((drink) => (
          <div key={drink.id} className="flex flex-col items-center">
            <Image
              src={drink.image}
              alt={drink.name}
              width={300}
              height={300}
              className="rounded-xl shadow-lg"
            />
            <div className="flex mt-2 text-lg font-medium items-center gap-2">
              {drink.name}
              <p className="flex items-center gap-1 px-2 py-1 rounded">
                <svg
                  onClick={() => addToCart(drink)}
                  className="hover:cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                ({getDrinkCount(drink.id)})
                <svg
                  onClick={() => removeFromCart(drink.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-minus-icon lucide-minus hover:cursor-pointer"
                >
                  <path d="M5 12h14" />
                </svg>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
