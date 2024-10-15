import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrash } from "react-icons/fa";
import moment from "moment"; // Make sure moment is installed

const SubprogramList = ({ subprograms, setEditSubprogram }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus subprogram ini?")) {
            Inertia.delete(`/kegiatan/${id}`);
        }
    };

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
                            Subprogram
                        </th>
                        <th className="py-2 px-4 border-r border-white text-left">
                            Target
                        </th>
                        <th className="py-2 px-4 border-r border-white text-left">
                            Satuan
                        </th>
                        <th className="py-2 px-4 border-r border-white text-left">
                            Indikator Kinerja
                        </th>
                        <th className="py-2 px-4 border-r border-white text-left">
                            Bulan
                        </th>
                        <th className="py-2 px-4 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {subprograms.map((subprogram) => (
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
                                {subprogram.target}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {subprogram.satuan}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {subprogram.indikator_kinerja}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {moment(subprogram.updated_at).format(
                                    "MMMM YYYY"
                                )}{" "}
                                {/* Display month and year */}
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
        </div>
    );
};

export default SubprogramList;
