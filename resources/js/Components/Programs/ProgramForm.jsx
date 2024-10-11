import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaSave, FaTimes, FaEdit } from "react-icons/fa"; // Import icons

export default function ProgramForm({ editProgram, setEditProgram }) {
    const [namaProgram, setNamaProgram] = useState("");
    const [noRekening, setNoRekening] = useState("");

    useEffect(() => {
        if (editProgram) {
            setNamaProgram(editProgram.nama_program);
            setNoRekening(editProgram.rekening.no_rekening);
        }
    }, [editProgram]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editProgram) {
            Inertia.put(`/programs/${editProgram.id}`, {
                nama_program: namaProgram,
                no_rekening: noRekening,
            });
        } else {
            Inertia.post("/programs", {
                nama_program: namaProgram,
                no_rekening: noRekening,
            });
        }

        setNamaProgram("");
        setNoRekening("");
    };

    const handleCancel = () => {
        setEditProgram(null);
        setNamaProgram("");
        setNoRekening("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Nama Program
                </label>
                <input
                    type="text"
                    value={namaProgram}
                    onChange={(e) => setNamaProgram(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
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
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Submit Button with Icons */}
            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex items-center justify-center w-full p-2 bg-[#0e79b2] text-white rounded-md hover:bg-[#f39237] transition-all"
                >
                    {editProgram ? (
                        <>
                            <FaEdit className="mr-2" />
                            Update Program
                        </>
                    ) : (
                        <>
                            <FaSave className="mr-2" />
                            Simpan Program
                        </>
                    )}
                </button>

                {editProgram && (
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
