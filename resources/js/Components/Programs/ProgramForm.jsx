import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaSave, FaTimes, FaEdit } from "react-icons/fa";

export default function ProgramForm({ editProgram, setEditProgram }) {
    const [namaProgram, setNamaProgram] = useState("");
    const [noRekening, setNoRekening] = useState("");
    const [target, setTarget] = useState(""); // New field
    const [satuan, setSatuan] = useState(""); // New field
    const [indikatorKinerja, setIndikatorKinerja] = useState(""); // Updated to match database column

    useEffect(() => {
        if (editProgram) {
            setNamaProgram(editProgram.nama_program);
            setNoRekening(editProgram.rekening.no_rekening);
            setTarget(editProgram.target || ""); // Set new fields if edit mode
            setSatuan(editProgram.satuan || "");
            setIndikatorKinerja(editProgram.indikator_kinerja || ""); // Updated to match database column
        }
    }, [editProgram]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            nama_program: namaProgram,
            no_rekening: noRekening,
            target,
            satuan,
            indikator_kinerja: indikatorKinerja, // Send indikator_kinerja to match database
        };

        if (editProgram) {
            Inertia.put(`/programs/${editProgram.id}`, data);
        } else {
            Inertia.post("/programs", data);
        }

        // Clear the form after submission
        setNamaProgram("");
        setNoRekening("");
        setTarget("");
        setSatuan("");
        setIndikatorKinerja("");
        setEditProgram(null);
    };

    const handleCancel = () => {
        setEditProgram(null);
        setNamaProgram("");
        setNoRekening("");
        setTarget("");
        setSatuan("");
        setIndikatorKinerja("");
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

            {/* New Fields: Target, Satuan, Indikator Kinerja */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Target
                </label>
                <input
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Satuan
                </label>
                <input
                    type="text"
                    value={satuan}
                    onChange={(e) => setSatuan(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Indikator Kinerja
                </label>
                <input
                    type="text"
                    value={indikatorKinerja}
                    onChange={(e) => setIndikatorKinerja(e.target.value)}
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
