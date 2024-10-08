import { Inertia } from "@inertiajs/inertia";
import React from "react";

const AnggaranList = ({ anggarans, setEditAnggaran }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus anggaran ini?")) {
            Inertia.delete(`/anggaran/${id}`, {
                onSuccess: () => {
                    alert("Anggaran berhasil dihapus!");
                },
                onError: (error) => {
                    alert("Terjadi kesalahan: " + error.message);
                },
            });
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Program</th>
                    <th>Kegiatan</th>
                    <th>Nama Sub Kegiatan</th>
                    <th>No Rekening</th>
                    <th>Anggaran Murni</th>
                    <th>Pergeseran</th>
                    <th>Perubahan</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {anggarans.map((anggaran, index) => (
                    <tr key={anggaran.id || index}>
                        <td>{anggaran.program?.nama_program || "N/A"}</td>
                        <td>{anggaran.subprogram?.nama_subprogram || "N/A"}</td>
                        <td>{anggaran.kegiatan?.nama_kegiatan || "N/A"}</td>
                        <td>
                            {anggaran.kegiatan?.rekening?.no_rekening || "N/A"}
                        </td>
                        <td>{anggaran.anggaran_murni}</td>
                        <td>{anggaran.pergeseran}</td>
                        <td>{anggaran.perubahan}</td>
                        <td>
                            <button onClick={() => setEditAnggaran(anggaran)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(anggaran.id)}>
                                Hapus
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AnggaranList;
