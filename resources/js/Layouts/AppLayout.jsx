import React from "react";
import Sidebar from "@/Components/Sidebar";

export default function AppLayout({ children }) {
    return (
        <div className="app-layout">
            <Sidebar />
            <main>{children}</main>
        </div>
    );
}
