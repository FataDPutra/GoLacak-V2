import React from "react";
import { Inertia } from "@inertiajs/inertia";

const KegiatanList = ({ kegiatans, setEditKegiatan }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
            Inertia.delete(`/subkegiatan/${id}`, {
                onSuccess: () => alert("Kegiatan berhasil dihapus!"),
                onError: (error) =>
                    alert("Terjadi kesalahan: " + error.message),
            });
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Nama Kegiatan</th>
                    <th>Sub Kegiatan</th>
                    <th>Program</th>
                    <th>No Rekening</th>
                    <th>Bidang</th> {/* Tambahkan kolom untuk bidang */}
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {kegiatans.map((kegiatan, index) => (
                    <tr key={kegiatan.id || index}>
                        <td>{kegiatan.nama_kegiatan}</td>
                        <td>{kegiatan.subprogram?.nama_subprogram}</td>
                        <td>{kegiatan.program?.nama_program}</td>
                        <td>{kegiatan.rekening?.no_rekening}</td>
                        <td>{kegiatan.bidang?.nama_bidang}</td>{" "}
                        {/* Tampilkan bidang */}
                        <td>
                            <button onClick={() => setEditKegiatan(kegiatan)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(kegiatan.id)}>
                                Hapus
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default KegiatanList;
