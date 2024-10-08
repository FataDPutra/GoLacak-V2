import React from "react";
import { Inertia } from "@inertiajs/inertia";

const ProgramList = ({ programs, setEditProgram }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus program ini?")) {
            Inertia.delete(`/programs/${id}`);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-2 px-4 text-left">Nama Program</th>
                        <th className="py-2 px-4 text-left">No Rekening</th>
                        <th className="py-2 px-4 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {programs.map((program) => (
                        <tr
                            key={program.id}
                            className="hover:bg-gray-100 transition-all"
                        >
                            <td className="py-2 px-4">
                                {program.nama_program}
                            </td>
                            <td className="py-2 px-4">
                                {program.rekening.no_rekening}
                            </td>
                            <td className="py-2 px-4 flex gap-2">
                                <button
                                    onClick={() => setEditProgram(program)}
                                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(program.id)}
                                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProgramList;
