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
                    <th>Nama Sub Kegiatan</th>
                    <th>Program</th>
                    <th>Kegiatan</th>
                    <th>No Rekening</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {kegiatans.map((kegiatan, index) => (
                    <tr key={kegiatan.id || index}>
                        <td>{kegiatan.nama_kegiatan}</td>
                        <td>{kegiatan.program?.nama_program}</td>
                        <td>{kegiatan.subprogram?.nama_subprogram}</td>
                        <td>{kegiatan.rekening?.no_rekening}</td>
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
