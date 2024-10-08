import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function KegiatanForm({
    editKegiatan,
    programs,
    subprograms,
    rekenings,
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
        // Filter subprogram berdasarkan program yang dipilih
        if (programId) {
            const selectedProgram = programs.find(
                (program) => program.id === programId
            );
            setFilteredSubprograms(selectedProgram?.subprograms || []);
            setSubprogramId(""); // Reset subprogram ketika program berubah
        } else {
            setFilteredSubprograms([]); // Reset jika tidak ada program yang dipilih
            setSubprogramId(""); // Reset subprogram jika program kosong
        }
    }, [programId, programs]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editKegiatan) {
            Inertia.put(`/subkegiatan/${editKegiatan.id}`, {
                nama_kegiatan: namaKegiatan, // Mengirim nama_kegiatan
                program_id: programId, // Mengirim program_id
                subprogram_id: subprogramId, // Mengirim subprogram_id
                no_rekening: noRekening, // Mengirim no_rekening
            });
        } else {
            Inertia.post("/subkegiatan", {
                nama_kegiatan: namaKegiatan, // Mengirim nama_kegiatan
                program_id: programId, // Mengirim program_id
                subprogram_id: subprogramId, // Mengirim subprogram_id
                no_rekening: noRekening, // Mengirim no_rekening
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {editKegiatan && <input type="hidden" name="_method" value="PUT" />}
            <div>
                <label>Program</label>
                <select
                    value={programId}
                    onChange={(e) => setProgramId(e.target.value)}
                    required
                >
                    <option value="">Pilih Program</option>
                    {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.nama_program}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Subprogram</label>
                <select
                    value={subprogramId}
                    onChange={(e) => setSubprogramId(e.target.value)}
                    required
                    disabled={!programId} // Disable jika tidak ada program yang dipilih
                >
                    <option value="">Pilih Subprogram</option>
                    {filteredSubprograms.map((subprogram) => (
                        <option key={subprogram.id} value={subprogram.id}>
                            {subprogram.nama_subprogram}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Nama Kegiatan</label>
                <input
                    type="text"
                    value={namaKegiatan}
                    onChange={(e) => setNamaKegiatan(e.target.value)}
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
                {editKegiatan ? "Update Kegiatan" : "Simpan Kegiatan"}
            </button>
        </form>
    );
}
