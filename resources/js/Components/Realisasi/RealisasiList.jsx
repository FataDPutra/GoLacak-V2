import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons

const RealisasiList = ({ penyerapanList, setEditPenyerapan }) => {
    const handleEdit = (penyerapan) => {
        setEditPenyerapan({
            ...penyerapan,
            program_id: penyerapan.kegiatan.program_id,
            subprogram_id: penyerapan.kegiatan.subprogram_id,
        });
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus realisasi ini?")) {
            Inertia.delete(`/realisasi/${id}`, {
                onSuccess: () => alert("Realisasi berhasil dihapus!"),
                onError: (error) =>
                    alert("Terjadi kesalahan: " + error.message),
            });
        }
    };

    return (
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
                        Target Fisik
                    </th>
                    <th className="py-2 px-3 text-left border-r border-white">
                        Realisasi Fisik
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
                {penyerapanList.map((penyerapan) => (
                    <tr
                        key={penyerapan.id}
                        className="hover:bg-gray-100 transition-all border-b border-gray-300"
                    >
                        <td className="py-2 px-3 border-r border-gray-300">
                            {penyerapan.no_rekening || "N/A"}
                        </td>
                        <td className="py-2 px-3 border-r border-gray-300">
                            {penyerapan.kegiatan?.program?.nama_program ||
                                "N/A"}
                        </td>
                        <td className="py-2 px-3 border-r border-gray-300">
                            {penyerapan.kegiatan?.subprogram?.nama_subprogram ||
                                "N/A"}
                        </td>
                        <td className="py-2 px-3 border-r border-gray-300">
                            {penyerapan.kegiatan?.nama_kegiatan || "N/A"}
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
                                ? penyerapan.persentase_penyerapan.toFixed(2)
                                : "N/A"}{" "}
                            %
                        </td>
                        <td className="py-2 px-3 border-r border-gray-300">
                            {penyerapan.target_fisik || "N/A"}
                        </td>
                        <td className="py-2 px-3 border-r border-gray-300">
                            {penyerapan.realisasi_fisik || "N/A"}
                        </td>
                        <td className="py-2 px-3 border-r border-gray-300">
                            {penyerapan.bulan || "N/A"}
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
    );
};

export default RealisasiList;
