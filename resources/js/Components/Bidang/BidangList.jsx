import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons

const BidangList = ({ bidangs, setEditBidang }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus bidang ini?")) {
            Inertia.delete(`/bidang/${id}`);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-[#fbfef9] shadow-lg rounded-lg border border-gray-300">
                <thead className="bg-[#0e79b2] text-white">
                    <tr>
                        <th className="py-3 px-6 border-r border-white text-left">
                            Nama Bidang
                        </th>
                        <th className="py-3 px-6 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {bidangs.map((bidang) => (
                        <tr
                            key={bidang.id}
                            className="hover:bg-gray-100 transition-all border-b border-gray-200"
                        >
                            <td className="py-3 px-6 border-r border-gray-300">
                                {bidang.nama_bidang}
                            </td>
                            <td className="py-3 px-6">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditBidang(bidang)}
                                        className="flex items-center justify-center p-2 bg-[#f39237] text-white rounded-md hover:bg-[#0e79b2] transition-all shadow-md w-24"
                                    >
                                        <FaEdit className="mr-2" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(bidang.id)}
                                        className="flex items-center justify-center p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all shadow-md w-24"
                                    >
                                        <FaTrashAlt className="mr-2" />
                                        Hapus
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BidangList;
