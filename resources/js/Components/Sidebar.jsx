import React from "react";
import { Link } from "@inertiajs/inertia-react";

const Sidebar = () => {
    return (
        <div
            style={{
                width: "200px",
                borderRight: "1px solid #ccc",
                padding: "20px",
            }}
        >
            <h2>Menu</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                    <Link
                        href="/programs"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        Program
                    </Link>
                </li>
                <li>
                    <Link
                        href="/kegiatan"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        Kegiatan
                    </Link>
                </li>
                <li>
                    <Link
                        href="/subkegiatan"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        Sub Kegiatan
                    </Link>
                </li>
                <li>
                    <Link
                        href="/anggaran"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        Anggaran
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
