import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrashAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import moment from "moment";
import Swal from "sweetalert2";

// Fungsi format Rupiah tanpa desimal khusus untuk tampilan tabel
const formatRupiahTanpaDesimal = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, // Menghilangkan desimal
        maximumFractionDigits: 0, // Menghindari desimal
    }).format(value);
};

const AnggaranList = ({ anggarans, setEditAnggaran }) => {
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
                Inertia.delete(`/anggaran/${id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Terhapus!",
                            "Anggaran berhasil dihapus.",
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
        if ((currentPage + 1) * itemsPerPage < anggarans.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedAnggarans = anggarans.slice(startIndex, endIndex);

    return (
        <div>
            <table className="min-w-full bg-[#fbfef9] shadow-lg rounded-lg border-collapse border border-gray-300 text-sm">
                <thead className="bg-[#0e79b2] text-white">
                    <tr>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Bidang
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            No Rekening
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Program
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Kegiatan
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Sub Kegiatan
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Anggaran Murni
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Pergeseran
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Perubahan
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Bulan
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedAnggarans.map((anggaran) => (
                        <tr
                            key={anggaran.id}
                            className="hover:bg-gray-100 transition-all border-b border-gray-300"
                        >
                            <td className="py-2 px-3 border-r border-gray-300">
                                {anggaran.bidang?.nama_bidang || "N/A"}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {anggaran.kegiatan?.rekening?.no_rekening ||
                                    "N/A"}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {anggaran.program?.nama_program || "N/A"}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {anggaran.subprogram?.nama_subprogram || "N/A"}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {anggaran.kegiatan?.nama_kegiatan || "N/A"}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {formatRupiahTanpaDesimal(
                                    anggaran.anggaran_murni
                                )}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {formatRupiahTanpaDesimal(anggaran.pergeseran)}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {formatRupiahTanpaDesimal(anggaran.perubahan)}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {moment(anggaran.updated_at).format(
                                    "MMMM YYYY"
                                ) || "N/A"}
                            </td>
                            <td className="py-2 px-3 flex gap-2">
                                <button
                                    onClick={() => setEditAnggaran(anggaran)}
                                    className="flex items-center justify-center p-2 bg-[#f39237] text-white rounded-md hover:bg-[#0e79b2] transition-all"
                                >
                                    <FaEdit className="mr-2" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(anggaran.id)}
                                    className="flex items-center justify-center p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                                >
                                    <FaTrashAlt className="mr-2" /> Hapus
                                </button>
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
                        (currentPage + 1) * itemsPerPage >= anggarans.length
                    }
                >
                    Next <FaArrowRight className="ml-1" />
                </button>
            </div>
        </div>
    );
};

export default AnggaranList;
