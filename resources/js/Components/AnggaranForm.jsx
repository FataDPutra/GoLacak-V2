import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function AnggaranForm({ editAnggaran, programs }) {
    const [anggaranMurni, setAnggaranMurni] = useState("");
    const [pergeseran, setPergeseran] = useState(0);
    const [perubahan, setPerubahan] = useState(0);
    const [kegiatanId, setKegiatanId] = useState("");
    const [subprogramId, setSubprogramId] = useState("");
    const [programId, setProgramId] = useState("");
    const [subprograms, setSubprograms] = useState([]); // Inisialisasi sebagai array kosong
    const [kegiatans, setKegiatans] = useState([]); // Inisialisasi sebagai array kosong

    useEffect(() => {
        if (editAnggaran) {
            setAnggaranMurni(editAnggaran.anggaran_murni);
            setPergeseran(editAnggaran.pergeseran);
            setPerubahan(editAnggaran.perubahan);
            setKegiatanId(editAnggaran.kegiatan_id);
            setSubprogramId(editAnggaran.subprogram_id);
            setProgramId(editAnggaran.program_id);
        }
    }, [editAnggaran]);

    useEffect(() => {
        // Ambil subprogram berdasarkan program yang dipilih
        if (programId) {
            const selectedProgram = programs.find(
                (program) => program.id === programId
            );
            setSubprograms(selectedProgram?.subprograms || []); // Mengambil subprogram yang relevan
            setKegiatans([]); // Reset kegiatan
            setSubprogramId(""); // Reset subprogram
            setKegiatanId(""); // Reset kegiatan
        } else {
            setSubprograms([]); // Reset subprogram jika tidak ada program yang dipilih
            setKegiatans([]); // Reset kegiatan jika tidak ada program yang dipilih
        }
    }, [programId, programs]);

    useEffect(() => {
        // Ambil kegiatan berdasarkan subprogram yang dipilih
        if (subprogramId) {
            const selectedSubprogram = subprograms.find(
                (subprogram) => subprogram.id === subprogramId
            );
            setKegiatans(selectedSubprogram?.kegiatan || []); // Mengambil kegiatan yang relevan
        } else {
            setKegiatans([]); // Reset kegiatan jika tidak ada subprogram yang dipilih
        }
    }, [subprogramId, subprograms]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editAnggaran) {
            Inertia.put(`/anggaran/${editAnggaran.id}`, {
                anggaran_murni: anggaranMurni,
                pergeseran,
                perubahan,
                kegiatan_id: kegiatanId,
                subprogram_id: subprogramId,
                program_id: programId,
            });
        } else {
            Inertia.post("/anggaran", {
                anggaran_murni: anggaranMurni,
                pergeseran,
                perubahan,
                kegiatan_id: kegiatanId,
                subprogram_id: subprogramId,
                program_id: programId,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {editAnggaran && <input type="hidden" name="_method" value="PUT" />}
            <div>
                <label>Program</label>
                <select
                    value={programId}
                    onChange={(e) => setProgramId(e.target.value)}
                    required
                >
                    <option value="">Pilih Program</option>
                    {Array.isArray(programs) &&
                        programs.map((program) => (
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
                    {Array.isArray(subprograms) &&
                        subprograms.map((subprogram) => (
                            <option key={subprogram.id} value={subprogram.id}>
                                {subprogram.nama_subprogram}
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <label>Kegiatan</label>
                <select
                    value={kegiatanId}
                    onChange={(e) => setKegiatanId(e.target.value)}
                    required
                    disabled={!subprogramId} // Disable jika tidak ada subprogram yang dipilih
                >
                    <option value="">Pilih Kegiatan</option>
                    {Array.isArray(kegiatans) &&
                        kegiatans.map((kegiatan) => (
                            <option key={kegiatan.id} value={kegiatan.id}>
                                {kegiatan.nama_kegiatan}
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <label>Anggaran Murni</label>
                <input
                    type="number"
                    value={anggaranMurni}
                    onChange={(e) => setAnggaranMurni(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Pergeseran</label>
                <input
                    type="number"
                    value={pergeseran}
                    onChange={(e) => setPergeseran(e.target.value)}
                />
            </div>
            <div>
                <label>Perubahan</label>
                <input
                    type="number"
                    value={perubahan}
                    onChange={(e) => setPerubahan(e.target.value)}
                />
            </div>
            <button type="submit">
                {editAnggaran ? "Update Anggaran" : "Simpan Anggaran"}
            </button>
        </form>
    );
}
