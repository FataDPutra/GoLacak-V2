import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

// Fungsi untuk format Rupiah
const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};

export default function AnggaranForm({
    editAnggaran,
    setEditAnggaran, // Tambahkan prop ini untuk handle cancel
    programs,
    subprograms,
    kegiatans,
}) {
    const [anggaranMurni, setAnggaranMurni] = useState("");
    const [pergeseran, setPergeseran] = useState(0);
    const [perubahan, setPerubahan] = useState(0);
    const [kegiatanId, setKegiatanId] = useState("");
    const [programId, setProgramId] = useState("");
    const [subprogramId, setSubprogramId] = useState("");
    const [filteredKegiatans, setFilteredKegiatans] = useState([]);
    const [rekening, setRekening] = useState("");

    // Efek untuk mengisi form jika editAnggaran ada
    useEffect(() => {
        if (editAnggaran) {
            setAnggaranMurni(editAnggaran.anggaran_murni);
            setPergeseran(editAnggaran.pergeseran || 0);
            setPerubahan(editAnggaran.perubahan || 0);
            setProgramId(editAnggaran.program_id);
            setSubprogramId(editAnggaran.sub_program_id);
            setKegiatanId(editAnggaran.kegiatan_id);
        }
    }, [editAnggaran]);

    // Efek untuk filter kegiatan berdasarkan subprogram yang dipilih
    useEffect(() => {
        if (subprogramId) {
            const selectedSubprogram = subprograms.find(
                (subprogram) => subprogram.id === subprogramId
            );
            setFilteredKegiatans(selectedSubprogram?.kegiatans || []);
            if (editAnggaran && selectedSubprogram) {
                setKegiatanId(editAnggaran.kegiatan_id);
            } else {
                setKegiatanId("");
            }
        } else {
            setFilteredKegiatans([]);
            setKegiatanId("");
        }
    }, [subprogramId, subprograms, editAnggaran]);

    // Efek untuk set rekening ketika kegiatan dipilih
    useEffect(() => {
        const selectedKegiatan = kegiatans.find(
            (kegiatan) => kegiatan.id === kegiatanId
        );
        setRekening(selectedKegiatan?.rekening?.no_rekening || "");
    }, [kegiatanId, kegiatans]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editAnggaran) {
            Inertia.put(`/anggaran/${editAnggaran.id}`, {
                anggaran_murni: anggaranMurni,
                pergeseran,
                perubahan,
                kegiatan_id: kegiatanId,
                program_id: programId,
                sub_program_id: subprogramId,
            });
        } else {
            Inertia.post("/anggaran", {
                anggaran_murni: anggaranMurni,
                pergeseran,
                perubahan,
                kegiatan_id: kegiatanId,
                program_id: programId,
                sub_program_id: subprogramId,
            });
        }
    };

    const handleCancel = () => {
        setEditAnggaran(null); // Reset form state
        setAnggaranMurni("");
        setPergeseran(0);
        setPerubahan(0);
        setProgramId("");
        setSubprogramId("");
        setKegiatanId("");
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    {subprograms
                        .filter(
                            (subprogram) => subprogram.program_id === programId
                        )
                        .map((subprogram) => (
                            <option key={subprogram.id} value={subprogram.id}>
                                {subprogram.nama_subprogram}
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <label>Sub Kegiatan</label>
                <select
                    value={kegiatanId}
                    onChange={(e) => setKegiatanId(e.target.value)}
                    required
                    disabled={!subprogramId}
                >
                    <option value="">Pilih Sub Kegiatan</option>
                    {filteredKegiatans.length > 0 ? (
                        filteredKegiatans.map((kegiatan) => (
                            <option key={kegiatan.id} value={kegiatan.id}>
                                {kegiatan.nama_kegiatan}
                            </option>
                        ))
                    ) : (
                        <option value="">
                            Tidak ada sub kegiatan tersedia
                        </option>
                    )}
                </select>
            </div>
            <div>
                <label>No Rekening</label>
                <input type="text" value={rekening} readOnly />
            </div>
            <div>
                <label>Anggaran Murni (Rp)</label>
                <input
                    type="text"
                    value={formatRupiah(anggaranMurni)}
                    onChange={(e) =>
                        setAnggaranMurni(e.target.value.replace(/\D/g, ""))
                    }
                    required
                />
            </div>
            <div>
                <label>Pergeseran (Rp)</label>
                <input
                    type="text"
                    value={formatRupiah(pergeseran)}
                    onChange={(e) =>
                        setPergeseran(e.target.value.replace(/\D/g, ""))
                    }
                />
            </div>
            <div>
                <label>Perubahan (Rp)</label>
                <input
                    type="text"
                    value={formatRupiah(perubahan)}
                    onChange={(e) =>
                        setPerubahan(e.target.value.replace(/\D/g, ""))
                    }
                />
            </div>
            <button type="submit">
                {editAnggaran ? "Update Anggaran" : "Simpan Anggaran"}
            </button>
            {editAnggaran && (
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
