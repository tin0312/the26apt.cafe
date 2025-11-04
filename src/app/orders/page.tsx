"use client";
import React, {useEffect} from "react";

export default function Orders() {
    // when the component mounts, fetch the latest order status from the server
    useEffect(() => {
        async function fetchOrderStatus() {
            try {
                const res = await fetch("/api/order/status");
                const data = await res.json();
                console.log("Latest order status:", data);
            } catch (err) {
                console.error("Failed to fetch order status:", err);
            }
        }

        fetchOrderStatus();
    }, []);
    return (
        <div className="p-29 flex flex-col items-center h-screen justify-center">
            <h1>Order status</h1>
            <button> Reload for latest updates </button>
            <ul>
                <li>Order #1: Product A - $10.00</li>
                <li>Order #2: Product B - $15.00</li>
                <li>Order #3: Product C - $20.00</li>
            </ul>
        </div>
    )
}