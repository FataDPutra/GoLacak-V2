import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import moment from "moment";
import Swal from "sweetalert2";

const SubprogramList = ({ subprograms, setEditSubprogram }) => {
    const itemsPerPage = 12; // Set jumlah data per halaman
    const [currentPage, setCurrentPage] = useState(0);

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
                Inertia.delete(`/kegiatan/${id}`, {
                    // Pastikan rute ini benar
                    onSuccess: () => {
                        Swal.fire(
                            "Terhapus!",
                            "Subprogram berhasil dihapus.",
                            "success"
                        );
                    },
                    onError: (error) => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan: " + error.message,
                            "error"
                        );
                    },
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
        if ((currentPage + 1) * itemsPerPage < subprograms.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSubprograms = subprograms.slice(startIndex, endIndex);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-[#fbfef9] shadow-md rounded-lg border-collapse border border-gray-300">
                <thead className="bg-[#0e79b2] text-white">
                    <tr>
                        <th className="py-2 px-4 border-r border-white text-left">
                            No Rekening
                        </th>
                        <th className="py-2 px-4 border-r border-white text-left">
                            Program
                        </th>
                        <th className="py-2 px-4 border-r border-white text-left">
                            Kegiatan
                        </th>
                        <th className="py-2 px-4 border-r border-white text-left">
                            Indikator Kinerja
                        </th>
                        <th className="py-2 px-4 border-r border-white text-left">
                            Target
                        </th>
                        <th className="py-2 px-4 border-r border-white text-left">
                            Satuan
                        </th>
                        <th className="py-2 px-4 border-r border-white text-left">
                            Bulan
                        </th>
                        <th className="py-2 px-4 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedSubprograms.map((subprogram) => (
                        <tr
                            key={subprogram.id}
                            className="hover:bg-gray-100 transition-all border-b border-gray-300"
                        >
                            <td className="py-2 px-4 border-r border-gray-300">
                                {subprogram.rekening?.no_rekening}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {subprogram.program?.nama_program}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {subprogram.nama_subprogram}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {subprogram.indikator_kinerja}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {subprogram.target}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {subprogram.satuan}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {moment(subprogram.updated_at).format(
                                    "MMMM YYYY"
                                )}{" "}
                            </td>
                            <td className="py-2 px-4">
                                <div className="flex justify-start gap-2">
                                    <button
                                        onClick={() =>
                                            setEditSubprogram(subprogram)
                                        }
                                        className="w-20 p-1 bg-[#f39237] text-white rounded-md hover:bg-[#0e79b2] transition-all flex items-center justify-center shadow-md"
                                    >
                                        <FaEdit className="mr-1" /> Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(subprogram.id)
                                        }
                                        className="w-20 p-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all flex items-center justify-center shadow-md"
                                    >
                                        <FaTrash className="mr-1" /> Hapus
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
                {currentPage > 0 && (
                    <button
                        onClick={handlePreviousPage}
                        className="flex items-center px-3 py-1 bg-[#0e79b2] text-white rounded-md transition-colors duration-300 hover:bg-[#095d7a]"
                    >
                        <FaArrowLeft className="mr-1" /> Previous
                    </button>
                )}

                <button
                    onClick={handleNextPage}
                    className="flex items-center px-3 py-1 bg-[#0e79b2] text-white rounded-md transition-colors duration-300 hover:bg-[#095d7a]"
                    disabled={
                        (currentPage + 1) * itemsPerPage >= subprograms.length
                    }
                >
                    Next <FaArrowRight className="ml-1" />
                </button>
            </div>
        </div>
    );
};

export default SubprogramList;
