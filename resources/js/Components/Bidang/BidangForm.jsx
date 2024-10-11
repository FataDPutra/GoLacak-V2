import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaSave, FaTimes } from "react-icons/fa"; // Import icons

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
        <form
            onSubmit={handleSubmit}
            className="mb-6 bg-[#fbfef9] p-6 rounded-lg shadow-lg"
        >
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Nama Bidang
                </label>
                <input
                    type="text"
                    value={namaBidang}
                    onChange={(e) => setNamaBidang(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#0e79b2] focus:ring-[#0e79b2] transition-all"
                />
            </div>
            <div className="flex gap-3">
                <button
                    type="submit"
                    className="flex-1 flex justify-center items-center p-2 bg-[#0e79b2] text-white rounded-md hover:bg-[#f39237] transition-all shadow-md"
                >
                    <FaSave className="mr-2" />
                    {editBidang ? "Update Bidang" : "Simpan Bidang"}
                </button>
                {editBidang && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 flex justify-center items-center p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all shadow-md"
                    >
                        <FaTimes className="mr-2" />
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
