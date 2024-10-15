import React, { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const userName = user?.name || "Guest";
    const userEmail = user?.email || "";
    const userRole = user?.role || "guest"; // assuming role is part of the user object

    return (
        <div className="min-h-screen bg-[#fbfef9]">
            {/* Navigation Bar */}
            <nav className="bg-[#c1292e] shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-[#fbfef9]" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href={route("bidang.index")}
                                    active={route().current("bidang.index")}
                                    className="text-[#fbfef9] hover:text-[#f39237] transition-all"
                                >
                                    Go-Lacak
                                </NavLink>
                            </div>
                        </div>

                        {/* User Dropdown */}
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-[#fbfef9] bg-[#c1292e] hover:bg-[#f39237] transition-all"
                                            >
                                                {userName}
                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content className="bg-white shadow-lg">
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                            className="hover:bg-gray-100 transition-all"
                                        >
                                            Profile
                                        </Dropdown.Link>

                                        {/* Conditional Register Link for Admin */}
                                        {/* {userRole === "admin" && (
                                            <Dropdown.Link
                                                href={route("/")}
                                                className="hover:bg-gray-100 transition-all"
                                            >
                                                Add New User
                                            </Dropdown.Link>
                                        )} */}

                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="hover:bg-red-500 text-red-700 transition-all"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Page Content */}
            <main className="p-6">{children}</main>
        </div>
    );
}
