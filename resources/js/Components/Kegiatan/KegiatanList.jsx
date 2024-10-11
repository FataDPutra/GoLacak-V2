import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons

const KegiatanList = ({ kegiatans, setEditKegiatan }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
            Inertia.delete(`/subkegiatan/${id}`, {
                onSuccess: () => alert("Kegiatan berhasil dihapus!"),
                onError: (error) =>
                    alert("Terjadi kesalahan: " + error.message),
            });
        }
    };

    return (
        <table className="min-w-full bg-[#fbfef9] shadow-lg rounded-lg border-collapse border border-gray-300">
            <thead className="bg-[#0e79b2] text-white">
                <tr>
                    <th className="py-3 px-6 text-left border-r border-white">
                        Nama Kegiatan
                    </th>
                    <th className="py-3 px-6 text-left border-r border-white">
                        Sub Kegiatan
                    </th>
                    <th className="py-3 px-6 text-left border-r border-white">
                        Program
                    </th>
                    <th className="py-3 px-6 text-left border-r border-white">
                        No Rekening
                    </th>
                    <th className="py-3 px-6 text-left border-r border-white">
                        Bidang
                    </th>
                    <th className="py-3 px-6 text-left border-r border-white">
                        Aksi
                    </th>
                </tr>
            </thead>
            <tbody>
                {kegiatans.map((kegiatan) => (
                    <tr
                        key={kegiatan.id}
                        className="hover:bg-gray-100 transition-all border-b border-gray-300"
                    >
                        <td className="py-3 px-6 border-r border-gray-300">
                            {kegiatan.nama_kegiatan}
                        </td>
                        <td className="py-3 px-6 border-r border-gray-300">
                            {kegiatan.subprogram?.nama_subprogram}
                        </td>
                        <td className="py-3 px-6 border-r border-gray-300">
                            {kegiatan.program?.nama_program}
                        </td>
                        <td className="py-3 px-6 border-r border-gray-300">
                            {kegiatan.rekening?.no_rekening}
                        </td>
                        <td className="py-3 px-6 border-r border-gray-300">
                            {kegiatan.bidang?.nama_bidang}
                        </td>
                        <td className="py-3 px-6 flex gap-2">
                            <button
                                onClick={() => setEditKegiatan(kegiatan)}
                                className="flex items-center justify-center p-2 bg-[#f39237] text-white rounded-md hover:bg-[#0e79b2] transition-all"
                            >
                                <FaEdit className="mr-2" /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(kegiatan.id)}
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

export default KegiatanList;
