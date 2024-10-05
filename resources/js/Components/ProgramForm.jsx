import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function ProgramForm({ editProgram }) {
    const [namaProgram, setNamaProgram] = useState("");
    const [noRekening, setNoRekening] = useState("");

    // Jika sedang dalam mode edit, set nilai default pada form
    useEffect(() => {
        if (editProgram) {
            setNamaProgram(editProgram.nama_program);
            setNoRekening(editProgram.rekening.no_rekening); // Sesuaikan dengan struktur data yang Anda miliki
        }
    }, [editProgram]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editProgram) {
            // Jika sedang mengedit program
            Inertia.put(`/programs/${editProgram.id}`, {
                nama_program: namaProgram,
                no_rekening: noRekening,
            });
        } else {
            // Jika menambah program baru
            Inertia.post("/programs", {
                nama_program: namaProgram,
                no_rekening: noRekening,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nama Program</label>
                <input
                    type="text"
                    value={namaProgram}
                    onChange={(e) => setNamaProgram(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>No Rekening</label>
                <input
                    type="text"
                    value={noRekening}
                    onChange={(e) => setNoRekening(e.target.value)}
                    required
                />
            </div>
            <button type="submit">
                {editProgram ? "Update Program" : "Simpan Program"}
            </button>
        </form>
    );
}
