import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaSave, FaTimes, FaEdit } from "react-icons/fa"; // Import icons

export default function KegiatanForm({
    editKegiatan,
    programs,
    subprograms,
    rekenings,
    setEditKegiatan,
}) {
    const [namaKegiatan, setNamaKegiatan] = useState("");
    const [programId, setProgramId] = useState("");
    const [subprogramId, setSubprogramId] = useState("");
    const [noRekening, setNoRekening] = useState("");
    const [filteredSubprograms, setFilteredSubprograms] = useState([]);

    useEffect(() => {
        if (editKegiatan) {
            setNamaKegiatan(editKegiatan.nama_kegiatan);
            setProgramId(editKegiatan.program_id);
            setSubprogramId(editKegiatan.subprogram_id);
            setNoRekening(editKegiatan.rekening?.no_rekening || "");
        }
    }, [editKegiatan]);

    useEffect(() => {
        if (programId) {
            const selectedProgram = programs.find(
                (program) => program.id === programId
            );
            setFilteredSubprograms(selectedProgram?.subprograms || []);
        } else {
            setFilteredSubprograms([]);
        }
    }, [programId, programs]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editKegiatan) {
            Inertia.put(`/subkegiatan/${editKegiatan.id}`, {
                nama_kegiatan: namaKegiatan,
                program_id: programId,
                subprogram_id: subprogramId,
                no_rekening: noRekening,
            });
        } else {
            Inertia.post("/subkegiatan", {
                nama_kegiatan: namaKegiatan,
                program_id: programId,
                subprogram_id: subprogramId,
                no_rekening: noRekening,
            });
        }
    };

    const handleCancel = () => {
        setEditKegiatan(null);
        setNamaKegiatan("");
        setProgramId("");
        setSubprogramId("");
        setNoRekening("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Program
                </label>
                <select
                    value={programId}
                    onChange={(e) => {
                        setProgramId(e.target.value);
                        setSubprogramId("");
                    }}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
                >
                    <option value="">Pilih Program</option>
                    {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.nama_program}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Kegiatan
                </label>
                <select
                    value={subprogramId}
                    onChange={(e) => setSubprogramId(e.target.value)}
                    required
                    disabled={!programId}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
                >
                    <option value="">Pilih Kegiatan</option>
                    {filteredSubprograms.map((subprogram) => (
                        <option key={subprogram.id} value={subprogram.id}>
                            {subprogram.nama_subprogram}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Nama Sub Kegiatan
                </label>
                <input
                    type="text"
                    value={namaKegiatan}
                    onChange={(e) => setNamaKegiatan(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#0e79b2] focus:ring-[#0e79b2] transition-all"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    No Rekening
                </label>
                <input
                    type="text"
                    value={noRekening}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            setNoRekening(value);
                        }
                    }}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#0e79b2] focus:ring-[#0e79b2] transition-all"
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex items-center justify-center w-full p-2 bg-[#0e79b2] text-white rounded-md hover:bg-[#f39237] transition-all"
                >
                    {editKegiatan ? (
                        <>
                            <FaEdit className="mr-2" />
                            Update Sub Kegiatan
                        </>
                    ) : (
                        <>
                            <FaSave className="mr-2" />
                            Simpan Sub Kegiatan
                        </>
                    )}
                </button>

                {editKegiatan && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center justify-center w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                    >
                        <FaTimes className="mr-2" />
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
