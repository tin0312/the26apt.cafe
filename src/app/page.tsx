"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("Session:", session);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="relative top-75 flex flex-col gap-[32px] items-center justify-center">
        <Image
          src="/shop-logo.png"
          alt="The 26 apt Cafe Logo"
          width={200}
          height={200}
          className="rounded-full m-auto"
        />
        {session?.user ? (
          <p className="fixed top-6.5 right-6.5 ">
            Hello, {session.user.name}
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
          </p>
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
        <h1 className="text-4xl font-bold text-center">
          Welcome to The 26apt Cafe
        </h1>
        <p className="text-lg ext-center max-w-xl">
          Your go-to Viet coffee shop, serving authentic flavors and a cozy
          atmosphere. Enjoy our signature brews and delicious treats made with
          love. Whether you're catching up with friends or need a quiet spot to
          work, we've got you covered.
        </p>
        <button
          onClick={() => router.push("/menu")}
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition cursor-pointer"
        >
          Browser Menu
        </button>
      </main>
      <footer className="text-stone-400 fixed bottom-4.5 row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        © 2025 The 26Apt Café. All rights reserved.
      </footer>
    </div>
  );
}
