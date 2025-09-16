"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const initialDrinks = [
  { id: 1, name: "Matcha Latte", image: "/images/matcha-latte.jpg", numberOfOrders: 0 },
  { id: 2, name: "Creamy Matcha", image: "/images/creamy-matcha.jpg", numberOfOrders: 0 },
  { id: 3, name: "Coco Matcha", image: "/images/coco-matcha.jpg", numberOfOrders: 0 },
  { id: 4, name: "Grass Jelly Coffee", image: "/images/grass-jelly-coffee.jpg", numberOfOrders: 0 },
  { id: 5, name: "Almond Coffee", image: "/images/almond-coffee.jpg", numberOfOrders: 0 },
];

export default function ShowMenu() {
  const router = useRouter();
  const [drinks, setDrinks] = React.useState(initialDrinks);

  function handleClick(id: number) {
    setDrinks(prevDrinks =>
      prevDrinks.map(drink =>
        drink.id === id
          ? { ...drink, numberOfOrders: drink.numberOfOrders + 1 }
          : drink
      )
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <button className="flex fixed left-10" type="button" onClick={() => router.push("/")}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-left-icon lucide-move-left cursor-pointer mr-1.5"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>Home
      </button>
      <button type="button" onClick={() => router.push("/cart")}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag-icon lucide-shopping-bag flex fixed right-10"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg></button>
      <h1 className="text-2xl font-bold mt-40">Our Drinks</h1>

      <div className="flex flex-col gap-8">
        {drinks.map((drink) => (
          <div key={drink.id} className="flex flex-col items-center">
            <Image
              src={drink.image}
              alt={drink.name}
              width={300}
              height={300}
              className="rounded-xl shadow-lg"
            />
            <p className="flex mt-2 text-lg font-medium items-center gap-2">
              {drink.name}
              <button
                className="flex items-center gap-1 px-2 py-1 rounded"
                onClick={() => handleClick(drink.id)}
              >
                <svg
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
                ({drink.numberOfOrders})
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
