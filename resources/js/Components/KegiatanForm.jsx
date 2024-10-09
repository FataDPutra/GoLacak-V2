import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function KegiatanForm({
    editKegiatan,
    programs,
    subprograms,
    rekenings,
    bidangs,
    setEditKegiatan,
}) {
    const [namaKegiatan, setNamaKegiatan] = useState("");
    const [programId, setProgramId] = useState("");
    const [subprogramId, setSubprogramId] = useState("");
    const [noRekening, setNoRekening] = useState("");
    const [bidangId, setBidangId] = useState("");
    const [filteredSubprograms, setFilteredSubprograms] = useState([]);

    useEffect(() => {
        if (editKegiatan) {
            setNamaKegiatan(editKegiatan.nama_kegiatan);
            setProgramId(editKegiatan.program_id);
            setSubprogramId(editKegiatan.subprogram_id);
            setNoRekening(editKegiatan.rekening?.no_rekening || "");
            setBidangId(editKegiatan.bidang_id || "");
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
                bidang_id: bidangId,
            });
        } else {
            Inertia.post("/subkegiatan", {
                nama_kegiatan: namaKegiatan,
                program_id: programId,
                subprogram_id: subprogramId,
                no_rekening: noRekening,
                bidang_id: bidangId,
            });
        }
    };

    const handleCancel = () => {
        setEditKegiatan(null);
        setNamaKegiatan("");
        setProgramId("");
        setSubprogramId("");
        setNoRekening("");
        setBidangId("");
    };

    return (
        <form onSubmit={handleSubmit}>
            {editKegiatan && <input type="hidden" name="_method" value="PUT" />}
            <div>
                <label>Program</label>
                <select
                    value={programId}
                    onChange={(e) => {
                        setProgramId(e.target.value);
                        setSubprogramId("");
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
                    disabled={!programId}
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
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            setNoRekening(value);
                        }
                    }}
                    required
                />
            </div>
            <div>
                <label>Bidang</label>
                <select
                    value={bidangId}
                    onChange={(e) => setBidangId(e.target.value)}
                    required
                >
                    <option value="">Pilih Bidang</option>
                    {bidangs.map((bidang) => (
                        <option key={bidang.id} value={bidang.id}>
                            {bidang.nama_bidang}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">
                {editKegiatan ? "Update Kegiatan" : "Simpan Kegiatan"}
            </button>
            {editKegiatan && (
                <button
                    type="button"
                    onClick={handleCancel}
                    style={{ marginLeft: "10px" }}
                >
                    Cancel
                </button>
            )}
        </form>
    );
}
