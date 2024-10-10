import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import {
    FaTasks,
    FaListAlt,
    FaMoneyCheckAlt,
    FaClipboardList,
    FaFolder,
    FaChartPie, // New icon for Absorption
} from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Mobile dropdown toggle */}
            <div className="lg:hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md">
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
                    <Link
                        href="/bidang"
                        className="flex items-center py-2 px-4 bg-blue-600 rounded hover:bg-blue-500 transition-all"
                    >
                        <FaFolder className="mr-2" /> Bidang
                    </Link>
                    <Link
                        href="/programs"
                        className="flex items-center py-2 px-4 bg-blue-600 rounded hover:bg-blue-500 transition-all"
                    >
                        <FaTasks className="mr-2" /> Program
                    </Link>
                    <Link
                        href="/kegiatan"
                        className="flex items-center py-2 px-4 bg-blue-600 rounded hover:bg-blue-500 transition-all"
                    >
                        <FaClipboardList className="mr-2" /> Kegiatan
                    </Link>
                    <Link
                        href="/subkegiatan"
                        className="flex items-center py-2 px-4 bg-blue-600 rounded hover:bg-blue-500 transition-all"
                    >
                        <FaListAlt className="mr-2" /> Sub Kegiatan
                    </Link>
                    <Link
                        href="/anggaran"
                        className="flex items-center py-2 px-4 bg-blue-600 rounded hover:bg-blue-500 transition-all"
                    >
                        <FaMoneyCheckAlt className="mr-2" /> Anggaran
                    </Link>
                    <Link
                        href="/penyerapan" // New route for absorption
                        className="flex items-center py-2 px-4 bg-blue-600 rounded hover:bg-blue-500 transition-all"
                    >
                        <FaChartPie className="mr-2" /> Penyerapan
                    </Link>
                </div>
            </div>

            {/* Sidebar for desktop */}
            <div className="hidden lg:block w-64 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Menu</h2>
                <ul className="space-y-4">
                    <li>
                        <Link
                            href="/bidang"
                            className="flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-500 transition-all rounded shadow-md"
                        >
                            <FaFolder className="mr-2" /> Bidang
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/programs"
                            className="flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-500 transition-all rounded shadow-md"
                        >
                            <FaTasks className="mr-2" /> Program
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/kegiatan"
                            className="flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-500 transition-all rounded shadow-md"
                        >
                            <FaClipboardList className="mr-2" /> Kegiatan
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/subkegiatan"
                            className="flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-500 transition-all rounded shadow-md"
                        >
                            <FaListAlt className="mr-2" /> Sub Kegiatan
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/anggaran"
                            className="flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-500 transition-all rounded shadow-md"
                        >
                            <FaMoneyCheckAlt className="mr-2" /> Anggaran
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/penyerapan" // New route for absorption
                            className="flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-500 transition-all rounded shadow-md"
                        >
                            <FaChartPie className="mr-2" /> Penyerapan
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
