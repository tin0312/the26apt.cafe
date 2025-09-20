"use client";
import React from "react";

export default function CartPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <p className="text-lg">Your cart is currently empty.</p>
    </div>
  );
}