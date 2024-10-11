import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons

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
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus anggaran ini?")) {
            Inertia.delete(`/anggaran/${id}`, {
                onSuccess: () => alert("Anggaran berhasil dihapus!"),
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
                        Program
                    </th>
                    <th className="py-2 px-3 text-left border-r border-white">
                        Kegiatan
                    </th>
                    <th className="py-2 px-3 text-left border-r border-white">
                        Nama Sub Kegiatan
                    </th>
                    <th className="py-2 px-3 text-left border-r border-white">
                        No Rekening
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
                        Aksi
                    </th>
                </tr>
            </thead>
            <tbody>
                {anggarans.map((anggaran) => (
                    <tr
                        key={anggaran.id}
                        className="hover:bg-gray-100 transition-all border-b border-gray-300"
                    >
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
                            {anggaran.kegiatan?.rekening?.no_rekening || "N/A"}
                        </td>
                        <td className="py-2 px-3 border-r border-gray-300">
                            {formatRupiahTanpaDesimal(anggaran.anggaran_murni)}
                        </td>
                        <td className="py-2 px-3 border-r border-gray-300">
                            {formatRupiahTanpaDesimal(anggaran.pergeseran)}
                        </td>
                        <td className="py-2 px-3 border-r border-gray-300">
                            {formatRupiahTanpaDesimal(anggaran.perubahan)}
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
    );
};

export default AnggaranList;
