import React from "react";
import { Inertia } from "@inertiajs/inertia";

const PenyerapanList = ({ penyerapanList, setEditPenyerapan }) => {
    // Fungsi untuk menangani pengeditan
    const handleEdit = (penyerapan) => {
        setEditPenyerapan({
            ...penyerapan,
            program_id: penyerapan.kegiatan.program_id, // Tambahkan ID program
            subprogram_id: penyerapan.kegiatan.subprogram_id, // Tambahkan ID subprogram
        });
    };

    // Fungsi untuk menangani penghapusan
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus penyerapan ini?")) {
            Inertia.delete(`/penyerapan/${id}`, {
                onSuccess: () => alert("Penyerapan berhasil dihapus!"),
                onError: (error) =>
                    alert("Terjadi kesalahan: " + error.message),
            });
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Kegiatan</th>
                    <th>Penyerapan Anggaran</th>
                    <th>Persentase Penyerapan</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {penyerapanList.map((penyerapan) => (
                    <tr key={penyerapan.id}>
                        <td>{penyerapan.kegiatan.nama_kegiatan}</td>
                        <td>Rp {penyerapan.penyerapan_anggaran}</td>
                        <td>
                            {typeof penyerapan.persentase_penyerapan ===
                            "number"
                                ? penyerapan.persentase_penyerapan.toFixed(2)
                                : "N/A"}{" "}
                            %
                        </td>
                        <td>
                            <button onClick={() => handleEdit(penyerapan)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(penyerapan.id)}>
                                Hapus
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PenyerapanList;
