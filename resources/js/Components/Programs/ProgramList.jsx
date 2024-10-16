import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrash } from "react-icons/fa";
import moment from "moment"; // Make sure moment is installed

const ProgramList = ({ programs, setEditProgram }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus program ini?")) {
            Inertia.delete(`/programs/${id}`);
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
                            Nama Program
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
                            Diperbarui
                        </th>
                        <th className="py-2 px-4 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {programs.map((program) => (
                        <tr
                            key={program.id}
                            className="hover:bg-gray-100 transition-all border-b border-gray-300"
                        >
                            <td className="py-2 px-4 border-r border-gray-300">
                                {program.rekening.no_rekening}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {program.nama_program}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {program.indikator_kinerja}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {program.target}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {program.satuan}
                            </td>
                            <td className="py-2 px-4 border-r border-gray-300">
                                {moment(program.updated_at).format("MMMM YYYY")}{" "}
                                {/* Display month and year */}
                            </td>
                            <td className="py-2 px-4">
                                <div className="flex justify-start gap-2">
                                    <button
                                        onClick={() => setEditProgram(program)}
                                        className="w-20 p-1 bg-[#f39237] text-white rounded-md hover:bg-[#0e79b2] transition-all flex items-center justify-center shadow-md"
                                    >
                                        <FaEdit className="mr-1" /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(program.id)}
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

export default ProgramList;
