import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrashAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import moment from "moment";
import Swal from "sweetalert2"; // Import SweetAlert2

const RealisasiList = ({ penyerapanList, setEditPenyerapan }) => {
    const itemsPerPage = 12; // Set jumlah data per halaman
    const [currentPage, setCurrentPage] = useState(0);

    const handleEdit = (penyerapan) => {
        console.log("Penyerapan di handleEdit:", penyerapan);

        if (!penyerapan.anggaran || !penyerapan.anggaran.kegiatan) {
            console.error("Data anggaran atau kegiatan tidak ditemukan!");
            alert(
                "Data anggaran atau kegiatan tidak ditemukan untuk penyerapan ini."
            );
            return;
        }

        setEditPenyerapan({
            ...penyerapan,
            program_id: penyerapan.anggaran.kegiatan.program_id,
            subprogram_id: penyerapan.anggaran.kegiatan.subprogram_id,
            kegiatan_id: penyerapan.anggaran.kegiatan.id,
            anggaran_id: penyerapan.anggaran.id,
        });
    };

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
                Inertia.delete(`/realisasi/${id}`, {
                    onSuccess: () =>
                        Swal.fire(
                            "Terhapus!",
                            "Realisasi berhasil dihapus.",
                            "success"
                        ),
                    onError: (error) =>
                        Swal.fire("Terjadi kesalahan!", error.message, "error"),
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
        if ((currentPage + 1) * itemsPerPage < penyerapanList.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPenyerapanList = penyerapanList.slice(startIndex, endIndex);

    return (
        <div>
            <table className="min-w-full bg-[#fbfef9] shadow-lg rounded-lg border-collapse border border-gray-300 text-sm">
                <thead className="bg-[#0e79b2] text-white">
                    <tr>
                        <th className="py-2 px-3 text-left border-r border-white">
                            No Rekening
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Program
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Subprogram
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Kegiatan
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Penyerapan Anggaran (Rp)
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Persentase Penyerapan (%)
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Realisasi Kinerja
                        </th>
                        <th className="py-2 px-3 text-left border-r border-white">
                            Capaian Fisik (%)
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
                    {paginatedPenyerapanList.map((penyerapan) => (
                        <tr
                            key={penyerapan.id}
                            className="hover:bg-gray-100 transition-all border-b border-gray-300"
                        >
                            <td className="py-2 px-3 border-r border-gray-300">
                                {penyerapan.anggaran.kegiatan.rekening
                                    ?.no_rekening || "N/A"}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {penyerapan.anggaran.kegiatan.program
                                    ?.nama_program || "N/A"}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {penyerapan.anggaran.kegiatan.subprogram
                                    ?.nama_subprogram || "N/A"}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {penyerapan.anggaran.kegiatan?.nama_kegiatan ||
                                    "N/A"}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                Rp{" "}
                                {penyerapan.penyerapan_anggaran.toLocaleString(
                                    "id-ID"
                                )}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {typeof penyerapan.persentase_penyerapan ===
                                "number"
                                    ? penyerapan.persentase_penyerapan.toFixed(
                                          2
                                      )
                                    : "N/A"}{" "}
                                %
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {penyerapan.realisasi_kinerja || "N/A"}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {penyerapan.capaian_fisik || "N/A"}
                            </td>
                            <td className="py-2 px-3 border-r border-gray-300">
                                {penyerapan.updated_at
                                    ? moment(penyerapan.updated_at).format(
                                          "MMMM YYYY"
                                      )
                                    : "N/A"}
                            </td>
                            <td className="py-2 px-3 flex gap-2">
                                <button
                                    onClick={() => handleEdit(penyerapan)}
                                    className="flex items-center justify-center p-2 bg-[#f39237] text-white rounded-md hover:bg-[#0e79b2] transition-all"
                                >
                                    <FaEdit className="w-4 h-4" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(penyerapan.id)}
                                    className="flex items-center justify-center p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                                >
                                    <FaTrashAlt className="w-4 h-4" /> Hapus
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
                        (currentPage + 1) * itemsPerPage >=
                        penyerapanList.length
                    }
                >
                    Next <FaArrowRight className="ml-1" />
                </button>
            </div>
        </div>
    );
};

export default RealisasiList;
