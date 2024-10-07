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
    const [noRekening, setNoRekening] = useState(""); // State untuk no_rekening

    useEffect(() => {
        if (editKegiatan) {
            setNamaKegiatan(editKegiatan.nama_kegiatan);
            setProgramId(editKegiatan.program_id);
            setSubprogramId(editKegiatan.subprogram_id);

            // Pastikan rekening ada sebelum mengambil no_rekening
            setNoRekening(editKegiatan.rekening?.no_rekening || ""); // Jika rekening tidak ada, set ke string kosong
        }
    }, [editKegiatan]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editKegiatan) {
            Inertia.put(`/kegiatans/${editKegiatan.id}`, {
                nama_kegiatan: namaKegiatan,
                program_id: programId,
                subprogram_id: subprogramId,
                no_rekening: noRekening, // Kirim no_rekening ke server
            });
        } else {
            Inertia.post("/kegiatans", {
                nama_kegiatan: namaKegiatan,
                program_id: programId,
                subprogram_id: subprogramId,
                no_rekening: noRekening, // Kirim no_rekening ke server
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {editKegiatan && <input type="hidden" name="_method" value="PUT" />}
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
                >
                    <option value="">Pilih Subprogram</option>
                    {subprograms.map((subprogram) => (
                        <option key={subprogram.id} value={subprogram.id}>
                            {subprogram.nama_subprogram}
                        </option>
                    ))}
                </select>
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
