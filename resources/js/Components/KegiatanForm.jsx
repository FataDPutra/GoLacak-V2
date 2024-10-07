import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function KegiatanForm({ editKegiatan, subprograms, programs }) {
    const [namaKegiatan, setNamaKegiatan] = useState("");
    const [subprogramId, setSubprogramId] = useState("");
    const [programId, setProgramId] = useState("");

    useEffect(() => {
        if (editKegiatan) {
            setNamaKegiatan(editKegiatan.nama_kegiatan);
            setSubprogramId(editKegiatan.subprogram_id);
            setProgramId(editKegiatan.program_id);
        }
    }, [editKegiatan]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editKegiatan) {
            Inertia.put(`/kegiatans/${editKegiatan.id}`, {
                nama_kegiatan: namaKegiatan,
                subprogram_id: subprogramId,
                program_id: programId,
            });
        } else {
            Inertia.post("/kegiatans", {
                nama_kegiatan: namaKegiatan,
                subprogram_id: subprogramId,
                program_id: programId,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
                            {subprogram.nama_subprogram} -{" "}
                            {subprogram.program.nama_program}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">
                {editKegiatan ? "Update Kegiatan" : "Simpan Kegiatan"}
            </button>
        </form>
    );
}
