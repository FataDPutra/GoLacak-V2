import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import moment from "moment"; // Make sure moment is installed

const ProgramList = ({ programs, setEditProgram }) => {
    const itemsPerPage = 12; // Set jumlah data per halaman
    const [currentPage, setCurrentPage] = useState(0);

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus program ini?")) {
            Inertia.delete(`/programs/${id}`);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if ((currentPage + 1) * itemsPerPage < programs.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPrograms = programs.slice(startIndex, endIndex);

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
                    {paginatedPrograms.map((program) => (
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
                                {moment(program.updated_at).format("MMMM YYYY")}
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
                        (currentPage + 1) * itemsPerPage >= programs.length
                    }
                >
                    Next <FaArrowRight className="ml-1" />
                </button>
            </div>
        </div>
    );
};

export default ProgramList;
