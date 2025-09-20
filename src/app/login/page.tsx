"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");

  async function handleSendOtp() {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber: phone }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) setOtpSent(true);
  }

  async function handleVerifyOtp() {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber: phone, otp }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      setUserId(data.userId);
      alert("Phone verified!");
      // redirect or set session
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center p-8 mt-50">
      <h1 className="text-2xl font-bold">Login</h1>

      {/* Google login */}
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => signIn("google", { callbackUrl: "/"})}
      >
        Continue with Google
      </button>

      <div className="mt-6 w-full max-w-sm">
        {!otpSent ? (
          <>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleSendOtp}
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleVerifyOtp}
              className="mt-2 w-full bg-green-600 text-white py-2 rounded"
            >
              Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
}
