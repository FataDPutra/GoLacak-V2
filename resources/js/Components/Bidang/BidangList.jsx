import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrashAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2"; // Pastikan Anda telah menginstal SweetAlert2

const BidangList = ({ bidangs, setEditBidang }) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBidangs = bidangs.slice(startIndex, endIndex);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/bidang/${id}`).then(() => {
                    Swal.fire(
                        "Terhapus!",
                        "Bidang berhasil dihapus.",
                        "success"
                    );
                });
            }
        });
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if ((currentPage + 1) * itemsPerPage < bidangs.length) {
            setCurrentPage(currentPage + 1);
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
                    {paginatedBidangs.map((bidang) => (
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
            <div className="flex justify-between mt-4">
                {currentPage > 0 && (
                    <button
                        onClick={handlePreviousPage}
                        className={`flex items-center justify-center px-3 py-1.5 bg-[#0e79b2] text-white 
                      rounded-md text-sm transition-colors duration-300 hover:bg-[#095d7a]`}
                    >
                        <FaArrowLeft className="mr-1" />
                        Previous
                    </button>
                )}

                <button
                    onClick={handleNextPage}
                    className={`flex items-center justify-center px-3 py-1.5 bg-[#0e79b2] text-white 
                      rounded-md text-sm transition-colors duration-300 hover:bg-[#095d7a]`}
                    disabled={
                        (currentPage + 1) * itemsPerPage >= bidangs.length
                    }
                >
                    Next
                    <FaArrowRight className="ml-1" />
                </button>
            </div>
        </div>
    );
};

export default BidangList;
