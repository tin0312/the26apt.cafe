import React from "react";


export default function Footer() {
    return (
        <footer className="absolute bottom-0 w-full border-t bg-white text-center p-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} The 26 apt Cafe. All rights reserved.
        </footer>
    );
}