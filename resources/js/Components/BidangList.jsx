import React from "react";
import { Inertia } from "@inertiajs/inertia";

const BidangList = ({ bidangs, setEditBidang }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus bidang ini?")) {
            Inertia.delete(`/bidang/${id}`);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-2 px-4 text-left">Nama Bidang</th>
                        <th className="py-2 px-4 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {bidangs.map((bidang) => (
                        <tr
                            key={bidang.id}
                            className="hover:bg-gray-100 transition-all"
                        >
                            <td className="py-2 px-4">{bidang.nama_bidang}</td>
                            <td className="py-2 px-4 flex gap-2">
                                <button
                                    onClick={() => setEditBidang(bidang)}
                                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(bidang.id)}
                                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BidangList;
