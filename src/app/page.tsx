"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
    </div>
  );
}
