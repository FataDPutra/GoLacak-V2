import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function KegiatanForm({
    editKegiatan, // Data kegiatan yang akan diedit
    programs,
    subprograms,
    rekenings,
}) {
    const [namaKegiatan, setNamaKegiatan] = useState("");
    const [programId, setProgramId] = useState("");
    const [subprogramId, setSubprogramId] = useState("");
    const [noRekening, setNoRekening] = useState("");
    const [filteredSubprograms, setFilteredSubprograms] = useState([]);

    // Efek untuk mengisi form jika ada data yang sedang diedit
    useEffect(() => {
        if (editKegiatan) {
            setNamaKegiatan(editKegiatan.nama_kegiatan);
            setProgramId(editKegiatan.program_id);
            setSubprogramId(editKegiatan.subprogram_id);
            setNoRekening(editKegiatan.rekening?.no_rekening || "");
        }
    }, [editKegiatan]);

    // Efek untuk filter subprograms berdasarkan program yang dipilih
    useEffect(() => {
        if (programId) {
            const selectedProgram = programs.find(
                (program) => program.id === programId
            );
            setFilteredSubprograms(selectedProgram?.subprograms || []);
        } else {
            setFilteredSubprograms([]); // Reset jika tidak ada program yang dipilih
        }
    }, [programId, programs]);

    // Efek untuk memastikan subprogram terisi otomatis saat edit
    useEffect(() => {
        if (editKegiatan && programId && subprograms) {
            const selectedSubprograms = subprograms.filter(
                (subprogram) => subprogram.program_id === programId
            );
            setFilteredSubprograms(selectedSubprograms || []);
            setSubprogramId(editKegiatan.subprogram_id); // Set otomatis subprogramId sesuai edit data
        }
    }, [editKegiatan, programId, subprograms]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editKegiatan) {
            // Jika mengedit kegiatan, gunakan metode PUT
            Inertia.put(`/subkegiatan/${editKegiatan.id}`, {
                nama_kegiatan: namaKegiatan, // Mengirim nama_kegiatan
                program_id: programId, // Mengirim program_id
                subprogram_id: subprogramId, // Mengirim subprogram_id
                no_rekening: noRekening, // Mengirim no_rekening
            });
        } else {
            // Jika menambah kegiatan baru, gunakan metode POST
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
            {/* Jika sedang mengedit, kirim hidden field dengan nilai _method PUT */}
            {editKegiatan && <input type="hidden" name="_method" value="PUT" />}
            <div>
                <label>Program</label>
                <select
                    value={programId}
                    onChange={(e) => {
                        setProgramId(e.target.value);
                        setSubprogramId(""); // Reset subprogram ketika program berubah
                    }}
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
                <label>Kegiatan</label>
                <select
                    value={subprogramId}
                    onChange={(e) => setSubprogramId(e.target.value)}
                    required
                    disabled={!programId} // Disable jika tidak ada program yang dipilih
                >
                    <option value="">Pilih Kegiatan</option>
                    {filteredSubprograms.map((subprogram) => (
                        <option key={subprogram.id} value={subprogram.id}>
                            {subprogram.nama_subprogram}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Nama Sub Kegiatan</label>
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
                {editKegiatan ? "Update Sub Kegiatan" : "Simpan Sub Kegiatan"}
            </button>
        </form>
    );
}
