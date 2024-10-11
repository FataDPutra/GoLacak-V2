import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaSave, FaTimes } from "react-icons/fa";

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
            setPenyerapanAnggaran("");
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
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
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
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Kegiatan
                </label>
                <select
                    value={selectedSubprogram}
                    onChange={(e) => setSelectedSubprogram(e.target.value)}
                    required
                    disabled={!selectedProgram}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
                >
                    <option value="">Pilih Kegiatan</option>
                    {filteredSubprograms.map((subprogram) => (
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
                    value={selectedKegiatan}
                    onChange={(e) => setSelectedKegiatan(e.target.value)}
                    required
                    disabled={!selectedSubprogram}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-[#0e79b2] focus:ring-[#0e79b2] focus:outline-none transition-all"
                >
                    <option value="">Pilih Sub Kegiatan</option>
                    {filteredKegiatans.map((kegiatan) => (
                        <option key={kegiatan.id} value={kegiatan.id}>
                            {kegiatan.nama_kegiatan}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    No Rekening
                </label>
                <input
                    type="text"
                    value={selectedRekening}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
            </div>
            <div className="mb-4">
                <h3 className="text-gray-700 font-bold mb-2">
                    Detail Anggaran
                </h3>
                <div className="space-y-2">
                    <p>
                        Anggaran Murni{" "}
                        <strong>
                            Rp {anggaranDetail.anggaran_murni.toLocaleString()}
                        </strong>
                    </p>
                    <p>
                        Pergeseran{" "}
                        <strong>
                            Rp {anggaranDetail.pergeseran.toLocaleString()}
                        </strong>
                    </p>
                    <p>
                        Perubahan{" "}
                        <strong>
                            Rp {anggaranDetail.perubahan.toLocaleString()}
                        </strong>
                    </p>
                    <p>
                        Persentase Penyerapan{" "}
                        <strong>{persentasePenyerapan.toFixed(2)}%</strong>
                    </p>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Jumlah Penyerapan (Rp)
                </label>
                <input
                    type="number"
                    value={penyerapanAnggaran === 0 ? "" : penyerapanAnggaran}
                    onChange={handlePenyerapanChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#0e79b2] focus:ring-[#0e79b2] transition-all"
                    min="0"
                    required
                />
            </div>
            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex items-center justify-center w-full p-2 bg-[#0e79b2] text-white rounded-md hover:bg-[#f39237] transition-all"
                >
                    {editPenyerapan ? (
                        <>
                            <FaSave className="mr-2" /> Update Penyerapan
                        </>
                    ) : (
                        <>
                            <FaSave className="mr-2" /> Simpan Penyerapan
                        </>
                    )}
                </button>
                {editPenyerapan && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="flex items-center justify-center w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                    >
                        <FaTimes className="mr-2" /> Batal
                    </button>
                )}
            </div>
        </form>
    );
};

export default PenyerapanForm;
