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
                        href="/subprograms"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        Subprogram
                    </Link>
                </li>
                <li>
                    <Link
                        href="/kegiatans"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        Kegiatan
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
