import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaSave, FaTimes, FaEdit } from "react-icons/fa"; // Import icons

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
    bidangs,
}) {
    const [anggaranMurni, setAnggaranMurni] = useState("");
    const [pergeseran, setPergeseran] = useState(0);
    const [perubahan, setPerubahan] = useState(0);
    const [kegiatanId, setKegiatanId] = useState("");
    const [programId, setProgramId] = useState("");
    const [subprogramId, setSubprogramId] = useState("");
    const [filteredKegiatans, setFilteredKegiatans] = useState([]);
    const [bidangId, setBidangId] = useState("");
    const [rekening, setRekening] = useState(""); // State untuk No Rekening

    // Efek untuk mengisi form jika editAnggaran ada
    useEffect(() => {
        if (editAnggaran) {
            setAnggaranMurni(editAnggaran.anggaran_murni);
            setPergeseran(editAnggaran.pergeseran || 0);
            setPerubahan(editAnggaran.perubahan || 0);
            setProgramId(editAnggaran.program_id);
            setSubprogramId(editAnggaran.sub_program_id);
            setKegiatanId(editAnggaran.kegiatan_id);
            setBidangId(editAnggaran.bidang_id);
        }
    }, [editAnggaran]);

    // Efek untuk filter kegiatan berdasarkan subprogram yang dipilih
    useEffect(() => {
        if (subprogramId) {
            const selectedSubprogram = subprograms.find(
                (subprogram) => subprogram.id === subprogramId
            );
            setFilteredKegiatans(selectedSubprogram?.kegiatans || []);
        } else {
            setFilteredKegiatans([]);
        }
    }, [subprogramId, subprograms]);

    // Efek untuk set No Rekening ketika kegiatan dipilih
    useEffect(() => {
        const selectedKegiatan = kegiatans.find(
            (kegiatan) => kegiatan.id === kegiatanId
        );
        setRekening(selectedKegiatan?.rekening?.no_rekening || ""); // Set No Rekening
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
                bidang_id: bidangId,
            });
        } else {
            Inertia.post("/anggaran", {
                anggaran_murni: anggaranMurni,
                pergeseran,
                perubahan,
                kegiatan_id: kegiatanId,
                program_id: programId,
                sub_program_id: subprogramId,
                bidang_id: bidangId,
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
        setBidangId("");
        setRekening(""); // Reset No Rekening
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Program
                </label>
                <select
                    value={programId}
                    onChange={(e) => {
                        setProgramId(e.target.value);
                        setSubprogramId("");
                    }}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
                >
                    <option value="">Pilih Program</option>
                    {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.nama_program}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Kegiatan
                </label>
                <select
                    value={subprogramId}
                    onChange={(e) => setSubprogramId(e.target.value)}
                    required
                    disabled={!programId}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
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

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Sub Kegiatan
                </label>
                <select
                    value={kegiatanId}
                    onChange={(e) => setKegiatanId(e.target.value)}
                    required
                    disabled={!subprogramId}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
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

            {/* Tampilkan No Rekening */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    No Rekening
                </label>
                <input
                    type="text"
                    value={rekening}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Bidang
                </label>
                <select
                    value={bidangId}
                    onChange={(e) => setBidangId(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
                >
                    <option value="">Pilih Bidang</option>
                    {bidangs.map((bidang) => (
                        <option key={bidang.id} value={bidang.id}>
                            {bidang.nama_bidang}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Anggaran Murni (Rp)
                </label>
                <input
                    type="text"
                    value={formatRupiah(anggaranMurni)}
                    onChange={(e) =>
                        setAnggaranMurni(e.target.value.replace(/\D/g, ""))
                    }
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#0e79b2] focus:ring-[#0e79b2] transition-all"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Pergeseran (Rp)
                </label>
                <input
                    type="text"
                    value={formatRupiah(pergeseran)}
                    onChange={(e) =>
                        setPergeseran(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#0e79b2] focus:ring-[#0e79b2] transition-all"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Perubahan (Rp)
                </label>
                <input
                    type="text"
                    value={formatRupiah(perubahan)}
                    onChange={(e) =>
                        setPerubahan(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#0e79b2] focus:ring-[#0e79b2] transition-all"
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex items-center justify-center w-full p-2 bg-[#0e79b2] text-white rounded-md hover:bg-[#f39237] transition-all"
                >
                    {editAnggaran ? (
                        <>
                            <FaEdit className="mr-2" /> Update Anggaran
                        </>
                    ) : (
                        <>
                            <FaSave className="mr-2" /> Simpan Anggaran
                        </>
                    )}
                </button>

                {editAnggaran && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center justify-center w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                    >
                        <FaTimes className="mr-2" /> Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
