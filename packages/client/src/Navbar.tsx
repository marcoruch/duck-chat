import React from "react";



export default function Navbar() {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-cyan-500 mb-3 p-5">
                <a
                    className="text-sm p-5 text-left font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                >
                    Duck Chat 🦆
                </a>

            </nav>
        </>
    );
}