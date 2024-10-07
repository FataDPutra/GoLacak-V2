import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function AnggaranForm({ editAnggaran, kegiatans }) {
    const [anggaranMurni, setAnggaranMurni] = useState("");
    const [pergeseran, setPergeseran] = useState(0);
    const [perubahan, setPerubahan] = useState(0);
    const [kegiatanId, setKegiatanId] = useState("");

    useEffect(() => {
        if (editAnggaran) {
            setAnggaranMurni(editAnggaran.anggaran_murni);
            setPergeseran(editAnggaran.pergeseran);
            setPerubahan(editAnggaran.perubahan);
            setKegiatanId(editAnggaran.kegiatan_id);
        }
    }, [editAnggaran]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const anggaranData = {
            anggaran_murni: anggaranMurni,
            pergeseran: pergeseran || 0,
            perubahan: perubahan || 0,
            kegiatan_id: kegiatanId,
        };

        if (editAnggaran) {
            Inertia.put(`/anggaran/${editAnggaran.id}`, anggaranData);
        } else {
            Inertia.post("/anggaran", anggaranData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <div>
                <label>Kegiatan</label>
                <select
                    value={kegiatanId}
                    onChange={(e) => setKegiatanId(e.target.value)}
                    required
                >
                    <option value="">Pilih Kegiatan</option>
                    {kegiatans.map((kegiatan) => (
                        <option key={kegiatan.id} value={kegiatan.id}>
                            {kegiatan.nama_kegiatan}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">{editAnggaran ? "Update" : "Simpan"}</button>
        </form>
    );
}
