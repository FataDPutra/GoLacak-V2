import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import {
    FaTasks,
    FaListAlt,
    FaMoneyCheckAlt,
    FaClipboardList,
    FaFolder,
    FaChartPie,
} from "react-icons/fa";

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
                    <Link
                        href="/bidang"
                        className={`flex items-center py-3 px-4 ${
                            isActive("/bidang")
                                ? "bg-[#0e79b2] shadow-md"
                                : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                        } rounded-md transition-all`}
                    >
                        <FaFolder className="mr-2" /> Bidang
                    </Link>
                    <Link
                        href="/programs"
                        className={`flex items-center py-3 px-4 ${
                            isActive("/programs")
                                ? "bg-[#0e79b2] shadow-md"
                                : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                        } rounded-md transition-all`}
                    >
                        <FaTasks className="mr-2" /> Program
                    </Link>
                    <Link
                        href="/kegiatan"
                        className={`flex items-center py-3 px-4 ${
                            isActive("/kegiatan")
                                ? "bg-[#0e79b2] shadow-md"
                                : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                        } rounded-md transition-all`}
                    >
                        <FaClipboardList className="mr-2" /> Kegiatan
                    </Link>
                    <Link
                        href="/subkegiatan"
                        className={`flex items-center py-3 px-4 ${
                            isActive("/subkegiatan")
                                ? "bg-[#0e79b2] shadow-md"
                                : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                        } rounded-md transition-all`}
                    >
                        <FaListAlt className="mr-2" /> Sub Kegiatan
                    </Link>
                    <Link
                        href="/anggaran"
                        className={`flex items-center py-3 px-4 ${
                            isActive("/anggaran")
                                ? "bg-[#0e79b2] shadow-md"
                                : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                        } rounded-md transition-all`}
                    >
                        <FaMoneyCheckAlt className="mr-2" /> Anggaran
                    </Link>
                    <Link
                        href="/penyerapan"
                        className={`flex items-center py-3 px-4 ${
                            isActive("/penyerapan")
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
                    <li>
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
                    </li>
                    <li>
                        <Link
                            href="/programs"
                            className={`flex items-center py-3 px-4 ${
                                isActive("/programs")
                                    ? "bg-[#0e79b2] shadow-md"
                                    : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                            } transition-all rounded-md shadow-sm`}
                        >
                            <FaTasks className="mr-2" /> Program
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/kegiatan"
                            className={`flex items-center py-3 px-4 ${
                                isActive("/kegiatan")
                                    ? "bg-[#0e79b2] shadow-md"
                                    : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                            } transition-all rounded-md shadow-sm`}
                        >
                            <FaClipboardList className="mr-2" /> Kegiatan
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/subkegiatan"
                            className={`flex items-center py-3 px-4 ${
                                isActive("/subkegiatan")
                                    ? "bg-[#0e79b2] shadow-md"
                                    : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                            } transition-all rounded-md shadow-sm`}
                        >
                            <FaListAlt className="mr-2" /> Sub Kegiatan
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/anggaran"
                            className={`flex items-center py-3 px-4 ${
                                isActive("/anggaran")
                                    ? "bg-[#0e79b2] shadow-md"
                                    : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                            } transition-all rounded-md shadow-sm`}
                        >
                            <FaMoneyCheckAlt className="mr-2" /> Anggaran
                        </Link>
                    </li>
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
                    <li>
                        <Link
                            href="/users"
                            className={`flex items-center py-3 px-4 ${
                                isActive("/users")
                                    ? "bg-[#0e79b2] shadow-md"
                                    : "bg-[#f39237] hover:bg-[#0e79b2] hover:shadow-md"
                            } transition-all rounded-md shadow-sm`}
                        >
                            <FaChartPie className="mr-2" /> Pengguna
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
