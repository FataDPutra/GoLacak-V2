import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function BidangForm({ editBidang, setEditBidang }) {
    const [namaBidang, setNamaBidang] = useState("");

    useEffect(() => {
        if (editBidang) {
            setNamaBidang(editBidang.nama_bidang);
        } else {
            setNamaBidang("");
        }
    }, [editBidang]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editBidang) {
            Inertia.put(`/bidang/${editBidang.id}`, {
                nama_bidang: namaBidang,
            });
        } else {
            Inertia.post("/bidang", {
                nama_bidang: namaBidang,
            });
        }

        setNamaBidang(""); // Reset the field after submission
    };

    const handleCancel = () => {
        setEditBidang(null); // Reset to create mode
        setNamaBidang(""); // Clear the input field
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Nama Bidang
                </label>
                <input
                    type="text"
                    value={namaBidang}
                    onChange={(e) => setNamaBidang(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
                {editBidang ? "Update Bidang" : "Simpan Bidang"}
            </button>
            {editBidang && (
                <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full p-2 mt-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                >
                    Cancel
                </button>
            )}
        </form>
    );
}
