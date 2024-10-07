import React from "react";
import { Inertia } from "@inertiajs/inertia";

const AnggaranList = ({ anggarans, setEditAnggaran }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus anggaran ini?")) {
            Inertia.delete(`/anggaran/${id}`, {
                onSuccess: () => alert("Anggaran berhasil dihapus!"),
                onError: (error) =>
                    alert("Terjadi kesalahan: " + error.message),
            });
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Anggaran Murni</th>
                    <th>Pergeseran</th>
                    <th>Perubahan</th>
                    <th>Kegiatan</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {anggarans.map((anggaran) => (
                    <tr key={anggaran.id}>
                        <td>{`Rp ${anggaran.anggaran_murni}`}</td>
                        <td>{`Rp ${anggaran.pergeseran}`}</td>
                        <td>{`Rp ${anggaran.perubahan}`}</td>
                        <td>{anggaran.kegiatan?.nama_kegiatan}</td>
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
