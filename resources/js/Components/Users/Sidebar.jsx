import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { FaFolder, FaChartPie } from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Dapatkan path URL saat ini
    const currentPath = window.location.pathname;

    // Fungsi untuk menentukan apakah link aktif
    const isActive = (path) => currentPath === path;

    return (
        <div>
            {/* Mobile dropdown toggle */}
            <div className="lg:hidden bg-[#c1292e] text-white p-4 shadow-md rounded-md">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center text-lg font-bold focus:outline-none"
                >
                    Menu
                    <svg
                        className={`h-6 w-6 transform ${
                            isOpen ? "rotate-180" : "rotate-0"
                        } transition-transform`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                <div
                    className={`${isOpen ? "block" : "hidden"} mt-4 space-y-2`}
                >
                    {/* <Link
                        href="/bidang"
                        className={`flex items-center py-3 px-4 ${
                            isActive("/bidang")
                                ? "bg-[#0e79b2] shadow-md"
                                : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                        } rounded-md transition-all`}
                    >
                        <FaFolder className="mr-2" /> Bidang
                    </Link> */}
                    <Link
                        href="/realisasi"
                        className={`flex items-center py-3 px-4 ${
                            isActive("/realisasi")
                                ? "bg-[#0e79b2] shadow-md"
                                : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                        } rounded-md transition-all`}
                    >
                        <FaChartPie className="mr-2" /> Realisasi
                    </Link>
                </div>
            </div>

            {/* Sidebar for desktop */}
            <div className="hidden lg:block w-60 bg-[#c1292e] text-white p-5 shadow-lg rounded-md">
                <h2 className="text-2xl font-bold mb-6">Menu</h2>
                <ul className="space-y-3">
                    {/* <li>
                        <Link
                            href="/bidang"
                            className={`flex items-center py-3 px-4 ${
                                isActive("/bidang")
                                    ? "bg-[#0e79b2] shadow-md"
                                    : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                            } transition-all rounded-md shadow-sm`}
                        >
                            <FaFolder className="mr-2" /> Bidang
                        </Link>
                    </li> */}
                    <li>
                        <Link
                            href="/realisasi"
                            className={`flex items-center py-3 px-4 ${
                                isActive("/realisasi")
                                    ? "bg-[#0e79b2] shadow-md"
                                    : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                            } transition-all rounded-md shadow-sm`}
                        >
                            <FaChartPie className="mr-2" /> Realisasi
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
