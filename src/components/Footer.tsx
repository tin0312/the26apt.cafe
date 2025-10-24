import React from "react";


export default function Footer() {
    return (
        <footer className="bg-black z-10 fixed bottom-0 w-full [box-shadow:0_-2px_8px_rgb(250_242_242_/_10%)] text-center p-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} The 26 apt Cafe. All rights reserved.
        </footer>
    );
}