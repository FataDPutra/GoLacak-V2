import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

// Fungsi untuk menghitung persentase penyerapan
const calculatePersentase = (anggaran, penyerapan) => {
    const totalAnggaran =
        anggaran.perubahan > 0
            ? anggaran.perubahan + anggaran.pergeseran
            : anggaran.anggaran_murni;

    // Pastikan totalAnggaran tidak nol untuk menghindari pembagian dengan nol
    if (totalAnggaran > 0) {
        return (penyerapan / totalAnggaran) * 100;
    }
    return 0;
};

const PenyerapanForm = ({
    editPenyerapan,
    setEditPenyerapan,
    programs,
    anggarans,
}) => {
    const [selectedProgram, setSelectedProgram] = useState("");
    const [selectedSubprogram, setSelectedSubprogram] = useState("");
    const [selectedKegiatan, setSelectedKegiatan] = useState("");
    const [selectedRekening, setSelectedRekening] = useState("");
    const [penyerapanAnggaran, setPenyerapanAnggaran] = useState(0);
    const [persentasePenyerapan, setPersentasePenyerapan] = useState(0);
    const [anggaranDetail, setAnggaranDetail] = useState({
        anggaran_murni: 0,
        pergeseran: 0,
        perubahan: 0,
        id: null,
    });
    const [filteredSubprograms, setFilteredSubprograms] = useState([]);
    const [filteredKegiatans, setFilteredKegiatans] = useState([]);

    useEffect(() => {
        if (editPenyerapan) {
            setSelectedProgram(editPenyerapan.program_id);
            setSelectedSubprogram(editPenyerapan.subprogram_id);
            setSelectedKegiatan(editPenyerapan.kegiatan_id);
            setPenyerapanAnggaran(editPenyerapan.penyerapan_anggaran);

            const anggaran = anggarans.find(
                (item) => item.id === editPenyerapan.anggaran_id
            );
            if (anggaran) {
                setAnggaranDetail({
                    anggaran_murni: anggaran.anggaran_murni,
                    pergeseran: anggaran.pergeseran,
                    perubahan: anggaran.perubahan,
                    id: anggaran.id,
                });
                setSelectedRekening(
                    anggaran.kegiatan?.rekening?.no_rekening || ""
                );
            }
        } else {
            resetForm();
        }
    }, [editPenyerapan, anggarans]);

    // Filter subprograms berdasarkan program yang dipilih
    useEffect(() => {
        if (selectedProgram) {
            const program = programs.find((p) => p.id === selectedProgram);
            setFilteredSubprograms(program?.subprograms || []);
        } else {
            setFilteredSubprograms([]);
        }
    }, [selectedProgram, programs]);

    // Filter kegiatan berdasarkan subprogram yang dipilih
    useEffect(() => {
        if (selectedSubprogram) {
            const subprogram = filteredSubprograms.find(
                (sp) => sp.id === selectedSubprogram
            );
            setFilteredKegiatans(subprogram?.kegiatans || []);
        } else {
            setFilteredKegiatans([]);
        }
    }, [selectedSubprogram, filteredSubprograms]);

    // Set detail anggaran saat kegiatan dipilih
    useEffect(() => {
        const selectedKegiatanData = anggarans.find(
            (anggaran) => anggaran.kegiatan_id === selectedKegiatan
        );
        if (selectedKegiatanData) {
            setAnggaranDetail({
                anggaran_murni: selectedKegiatanData.anggaran_murni,
                pergeseran: selectedKegiatanData.pergeseran,
                perubahan: selectedKegiatanData.perubahan,
                id: selectedKegiatanData.id,
            });
            setSelectedRekening(
                selectedKegiatanData.kegiatan?.rekening?.no_rekening || ""
            );
        } else {
            setAnggaranDetail({
                anggaran_murni: 0,
                pergeseran: 0,
                perubahan: 0,
                id: null,
            });
            setSelectedRekening("");
        }
    }, [selectedKegiatan, anggarans]);

    // Fungsi untuk menangani perubahan jumlah penyerapan
    const handlePenyerapanChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setPenyerapanAnggaran(value);

        // Hitung persentase penyerapan setiap kali nilai penyerapan berubah
        const calculatedPersentase = calculatePersentase(anggaranDetail, value);
        setPersentasePenyerapan(calculatedPersentase);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!anggaranDetail.id) {
            alert("Pilih kegiatan yang valid dengan anggaran terkait.");
            return;
        }

        const data = {
            anggaran_id: anggaranDetail.id,
            kegiatan_id: selectedKegiatan,
            penyerapan_anggaran: penyerapanAnggaran,
            persentase_penyerapan: persentasePenyerapan,
        };

        if (editPenyerapan) {
            Inertia.put(`/penyerapan/${editPenyerapan.id}`, data);
        } else {
            Inertia.post("/penyerapan", data);
        }

        resetForm();
        setEditPenyerapan(null);
    };

    const resetForm = () => {
        setSelectedProgram("");
        setSelectedSubprogram("");
        setSelectedKegiatan("");
        setSelectedRekening("");
        setPenyerapanAnggaran(0);
        setPersentasePenyerapan(0);
        setAnggaranDetail({
            anggaran_murni: 0,
            pergeseran: 0,
            perubahan: 0,
            id: null,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Pilih Program:</label>
                <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
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
                <label>Pilih Subprogram:</label>
                <select
                    value={selectedSubprogram}
                    onChange={(e) => setSelectedSubprogram(e.target.value)}
                    required
                    disabled={!selectedProgram}
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
                <label>Pilih Kegiatan:</label>
                <select
                    value={selectedKegiatan}
                    onChange={(e) => setSelectedKegiatan(e.target.value)}
                    required
                    disabled={!selectedSubprogram}
                >
                    <option value="">Pilih Kegiatan</option>
                    {filteredKegiatans.map((kegiatan) => (
                        <option key={kegiatan.id} value={kegiatan.id}>
                            {kegiatan.nama_kegiatan}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>No Rekening:</label>
                <input type="text" value={selectedRekening} readOnly />
            </div>

            <div>
                <h3>Detail Anggaran:</h3>
                <p>Anggaran Murni: Rp {anggaranDetail.anggaran_murni}</p>
                <p>Pergeseran: Rp {anggaranDetail.pergeseran}</p>
                <p>Perubahan: Rp {anggaranDetail.perubahan}</p>
                <p>Persentase Penyerapan:{persentasePenyerapan.toFixed(2)}%</p>
            </div>

            <div>
                <label>Jumlah Penyerapan (Rp):</label>
                <input
                    type="number"
                    value={penyerapanAnggaran}
                    onChange={handlePenyerapanChange}
                    required
                />
            </div>

            <button type="submit">
                {editPenyerapan ? "Update Penyerapan" : "Tambah Penyerapan"}
            </button>
        </form>
    );
};

export default PenyerapanForm;
