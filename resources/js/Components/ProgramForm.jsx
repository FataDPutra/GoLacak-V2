import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

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
            <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
                {editProgram ? "Update Program" : "Simpan Program"}
            </button>
            {editProgram && (
                <button
                    type="button"
                    onClick={handleCancel}
                    className="ml-4 p-2 bg-red-600 text-white rounded-md"
                >
                    Cancel
                </button>
            )}
        </form>
    );
}
