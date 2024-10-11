import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaSave, FaTimes, FaEdit } from "react-icons/fa"; // Import icons

export default function SubprogramForm({
    editSubprogram,
    programs,
    setEditSubprogram,
}) {
    const [namaSubprogram, setNamaSubprogram] = useState("");
    const [programId, setProgramId] = useState("");
    const [noRekening, setNoRekening] = useState("");

    useEffect(() => {
        if (editSubprogram) {
            setNamaSubprogram(editSubprogram.nama_subprogram);
            setProgramId(editSubprogram.program_id);
            setNoRekening(editSubprogram.rekening.no_rekening);
        }
    }, [editSubprogram]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editSubprogram) {
            Inertia.put(`/kegiatan/${editSubprogram.id}`, {
                nama_subprogram: namaSubprogram,
                program_id: programId,
                no_rekening: noRekening,
            });
        } else {
            Inertia.post("/kegiatan", {
                nama_subprogram: namaSubprogram,
                program_id: programId,
                no_rekening: noRekening,
            });
        }
    };

    const handleCancel = () => {
        setEditSubprogram(null);
        setNamaSubprogram("");
        setProgramId("");
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
                    onChange={(e) => setProgramId(e.target.value)}
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
                    Nama Kegiatan
                </label>
                <input
                    type="text"
                    value={namaSubprogram}
                    onChange={(e) => setNamaSubprogram(e.target.value)}
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
                    {editSubprogram ? (
                        <>
                            <FaEdit className="mr-2" />
                            Update Kegiatan
                        </>
                    ) : (
                        <>
                            <FaSave className="mr-2" />
                            Simpan Kegiatan
                        </>
                    )}
                </button>

                {editSubprogram && (
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
