"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { update } = useSession();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSendOtp() {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber: phone }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) setOtpSent(true);
  }

  async function handleVerifyOtp() {
     const result = await signIn("credentials", {
        redirect: false,
        phone,
        otp,
      });
     if (result?.ok) {
      setShowModal(true)
  } else {
     console.log(result)
  }
  }

  async function handleSaveUserData() {
     await update({
      name,
      phone,
      email,
    });
    setShowModal(false);
    router.push("/");
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

      {/* Modal */}
      {showModal && (
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
              value={phone}
              disabled
              className="border p-2 rounded w-full mb-2 bg-gray-100"
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
      )}

    </div>
  );
}
