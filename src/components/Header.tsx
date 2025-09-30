"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [userDropDown, showUserDropdown] = useState(false);
  const { data: session } = useSession();
  return (
    <header className="fixed z-100 w-full border-b bg-white p-4 text-lg font-semibold text-gray-700">
      <svg
        onClick={() => router.push("/")}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-coffee-icon lucide-coffee"
      >
        <path d="M10 2v2" />
        <path d="M14 2v2" />
        <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
        <path d="M6 2v2" />
      </svg>
      <span>The 26 apt Cafe</span>
      {session?.user ? (
          <span className="flex fixed top-6.5 right-6.5 ">
            <svg
              onClick={() => showUserDropdown(true)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down-icon lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
            Hello, {session.user.name}
            {userDropDown ? (
              <div className="absolute top-10 right-0 bg-white border border-gray-300 rounded shadow-md p-4 z-10">
                <button
                  onClick={() => showUserDropdown(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x-icon lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => {
                        router.push("/profile");
                        showUserDropdown(false);
                      }}
                      className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        router.push("/cart");
                        showUserDropdown(false);
                      }}
                      className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
                    >
                      Orders
                    </button>
                  </li>
                </ul>
              </div>
            ) : null}
            <span className="pl-2 align-text-top">
              <button onClick={() => signOut({ callbackUrl: "/" })}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-out-icon lucide-log-out cursor-pointer"
                >
                  <path d="m16 17 5-5-5-5" />
                  <path d="M21 12H9" />
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                </svg>
              </button>
            </span>
          </span>
        ) : (
          <button onClick={() => router.push("/login")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-in-icon lucide-log-in fixed top-6.5 right-6.5 cursor-pointer"
            >
              <path d="m10 17 5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            </svg>
          </button>
        )}
    </header>
  );
}
