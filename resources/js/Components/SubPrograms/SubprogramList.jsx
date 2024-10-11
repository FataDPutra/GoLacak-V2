import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons

const SubprogramList = ({ subprograms, setEditSubprogram }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus subprogram ini?")) {
            Inertia.delete(`/kegiatan/${id}`, {
                onSuccess: () => alert("Subprogram berhasil dihapus!"),
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
                        Program
                    </th>
                    <th className="py-3 px-6 text-left border-r border-white">
                        No Rekening
                    </th>
                    <th className="py-3 px-6 text-left border-r border-white">
                        Aksi
                    </th>
                </tr>
            </thead>
            <tbody>
                {subprograms.map((subprogram) => (
                    <tr
                        key={subprogram.id}
                        className="hover:bg-gray-100 transition-all border-b border-gray-300"
                    >
                        <td className="py-3 px-6 border-r border-gray-300">
                            {subprogram.nama_subprogram}
                        </td>
                        <td className="py-3 px-6 border-r border-gray-300">
                            {subprogram.program?.nama_program}
                        </td>
                        <td className="py-3 px-6 border-r border-gray-300">
                            {subprogram.rekening?.no_rekening}
                        </td>
                        <td className="py-3 px-6 flex gap-2">
                            <button
                                onClick={() => setEditSubprogram(subprogram)}
                                className="flex items-center justify-center p-2 bg-[#f39237] text-white rounded-md hover:bg-[#0e79b2] transition-all"
                            >
                                <FaEdit className="mr-2" /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(subprogram.id)}
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

export default SubprogramList;
