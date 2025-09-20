"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// A drink object
export type Drink = {
  id: number;
  name: string;
  image: string;
  numberOfOrders: number;
};

type CartContextType = {
  cart: Drink[]; // an array of drink objects 
  addToCart: (drink: Drink) => void;
  removeFromCart: (drinkId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [cart, setCart] = useState<Drink[]>([]);

  const storageKey = session?.user?.id ? `cart-${session.user.id}` : "cart-anonymous";

  // Load cart from localStorage
  useEffect(() => {
    if (!session) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setCart(JSON.parse(saved));
  }, [session]);

  // Save cart whenever it changes
  useEffect(() => {
    if (!session) return;
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storageKey]);

  const addToCart = (drink: Drink) => {
    setCart((prev) => {
      const exists = prev.find((d) => d.id === drink.id);
      if (exists) {
        return prev.map((d) =>
          d.id === drink.id ? { ...d, numberOfOrders: d.numberOfOrders + 1 } : d
        );
      } else {
        return [...prev, { ...drink, numberOfOrders: 1 }];
      }
    });
  };
  
  const removeFromCart = (drinkId: number) => {
    setCart((prev) =>
      prev.map((d) =>
        d.id === drinkId && d.numberOfOrders > 0
          ? { ...d, numberOfOrders: d.numberOfOrders - 1 }
          : d
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
