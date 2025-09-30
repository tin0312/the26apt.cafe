"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { update } = useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const router = useRouter();

    async function handleSaveUserData() {
        await update({
          name,
          phone,
          email,
        });
        router.push("/");
      }

  return <div>
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Complete Your Profile</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border p-2 rounded w-full mb-2"
              required
            />
            <input
              type="tel"
              onChange={(event)=> setPhone(event.target.value)}
              value={phone}
              className="border-none p-2 w-full mb-2 bg-gray-100 "
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="border p-2 rounded w-full mb-4"
            />
            <button
              onClick={handleSaveUserData}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
  </div>;
}