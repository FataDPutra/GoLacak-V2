import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaSave, FaTimes } from "react-icons/fa";

const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};

// Function to calculate absorption percentage
const calculatePersentase = (anggaran, penyerapan) => {
    const totalAnggaran =
        anggaran.perubahan > 0
            ? anggaran.perubahan + anggaran.pergeseran
            : anggaran.anggaran_murni;

    if (totalAnggaran > 0) {
        return (penyerapan / totalAnggaran) * 100;
    }
    return 0;
};

const RealisasiForm = ({
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

    // New state variables for realisasi_capaian and capaian_fisik
    const [realisasiCapaian, setRealisasiCapaian] = useState("");
    const [capaianFisik, setCapaianFisik] = useState("");

    useEffect(() => {
        if (editPenyerapan) {
            setSelectedProgram(editPenyerapan.program_id);
            setSelectedSubprogram(editPenyerapan.subprogram_id);
            setSelectedKegiatan(editPenyerapan.kegiatan_id);
            setPenyerapanAnggaran(editPenyerapan.penyerapan_anggaran);
            setRealisasiCapaian(editPenyerapan.realisasi_capaian || "");
            setCapaianFisik(editPenyerapan.capaian_fisik || "");

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

    useEffect(() => {
        if (selectedProgram) {
            const program = programs.find((p) => p.id === selectedProgram);
            setFilteredSubprograms(program?.subprograms || []);
        } else {
            setFilteredSubprograms([]);
        }
    }, [selectedProgram, programs]);

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

    const handlePenyerapanChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setPenyerapanAnggaran(0);
            setPersentasePenyerapan(0);
        } else {
            const parsedValue = parseFloat(value);
            if (!isNaN(parsedValue)) {
                setPenyerapanAnggaran(parsedValue);
                const calculatedPersentase = calculatePersentase(
                    anggaranDetail,
                    parsedValue
                );
                setPersentasePenyerapan(calculatedPersentase);
            }
        }
    };

    const handleFocus = () => {
        if (penyerapanAnggaran === 0) {
            setPenyerapanAnggaran(""); // Clear the field when focused
        }
    };

    const handleBlur = () => {
        if (penyerapanAnggaran === "") {
            setPenyerapanAnggaran(0); // Reset to 0 if field is empty
        }
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
            realisasi_capaian: realisasiCapaian || 0, // Ensure realisasi_capaian is not empty
            capaian_fisik: capaianFisik || 0, // Ensure capaian_fisik is not empty
        };
        if (editPenyerapan) {
            Inertia.put(`/realisasi/${editPenyerapan.id}`, data);
        } else {
            Inertia.post("/realisasi", data);
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
        setRealisasiCapaian(""); // Reset realisasi_capaian to empty
        setCapaianFisik(""); // Reset capaian_fisik to empty
        setAnggaranDetail({
            anggaran_murni: 0,
            pergeseran: 0,
            perubahan: 0,
            id: null,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            {/* Program Selector */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Program
                </label>
                <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
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

            {/* Subprogram Selector */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Subprogram
                </label>
                <select
                    value={selectedSubprogram}
                    onChange={(e) => setSelectedSubprogram(e.target.value)}
                    required
                    disabled={!selectedProgram}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
                >
                    <option value="">Pilih Subprogram</option>
                    {filteredSubprograms.map((subprogram) => (
                        <option key={subprogram.id} value={subprogram.id}>
                            {subprogram.nama_subprogram}
                        </option>
                    ))}
                </select>
            </div>

            {/* Kegiatan Selector */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Kegiatan
                </label>
                <select
                    value={selectedKegiatan}
                    onChange={(e) => setSelectedKegiatan(e.target.value)}
                    required
                    disabled={!selectedSubprogram}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
                >
                    <option value="">Pilih Kegiatan</option>
                    {filteredKegiatans.map((kegiatan) => (
                        <option key={kegiatan.id} value={kegiatan.id}>
                            {kegiatan.nama_kegiatan}
                        </option>
                    ))}
                </select>
            </div>

            {/* Penyerapan Anggaran Input */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Penyerapan Anggaran
                </label>
                <input
                    type="number"
                    value={penyerapanAnggaran}
                    onChange={handlePenyerapanChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
                />
            </div>

            {/* Persentase Penyerapan Display */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Persentase Penyerapan
                </label>
                <input
                    type="text"
                    value={persentasePenyerapan.toFixed(2) + "%"}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
            </div>

            {/* Realisasi Capaian Input */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Realisasi Capaian
                </label>
                <input
                    type="text"
                    value={realisasiCapaian}
                    onChange={(e) => setRealisasiCapaian(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
                />
            </div>

            {/* Capaian Fisik Input */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Capaian Fisik
                </label>
                <input
                    type="text"
                    value={capaianFisik}
                    onChange={(e) => setCapaianFisik(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
                />
            </div>

            {/* Anggaran Detail Display */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Anggaran
                </label>
                <input
                    type="text"
                    value={formatRupiah(
                        anggaranDetail.perubahan > 0
                            ? anggaranDetail.perubahan +
                                  anggaranDetail.pergeseran
                            : anggaranDetail.anggaran_murni
                    )}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
            </div>

            {/* Rekening Display */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    No Rekening
                </label>
                <input
                    type="text"
                    value={selectedRekening}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
            </div>

            {/* Form Action Buttons */}
            <div className="flex justify-between items-center">
                <button
                    type="submit"
                    className="px-4 py-2 bg-[#0e79b2] text-white rounded-md hover:bg-[#0c6a9c] transition-all flex items-center"
                >
                    <FaSave className="mr-2" />
                    Simpan
                </button>
                <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all flex items-center"
                >
                    <FaTimes className="mr-2" />
                    Reset
                </button>
            </div>
        </form>
    );
};

export default RealisasiForm;
