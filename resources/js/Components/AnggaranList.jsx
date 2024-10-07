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

    // Fungsi untuk memformat angka ke format mata uang
    const formatCurrency = (amount) => {
        return `Rp ${parseFloat(amount).toLocaleString("id-ID")}`; // Format angka menjadi mata uang Rupiah
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Nama Kegiatan</th>
                    <th>Anggaran Murni</th>
                    <th>Pergeseran</th>
                    <th>Perubahan</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {anggarans.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                            Tidak ada anggaran tersedia.
                        </td>
                    </tr>
                ) : (
                    anggarans.map((anggaran) => (
                        <tr key={anggaran.id}>
                            <td>{anggaran.kegiatan?.nama_kegiatan}</td>
                            <td>{formatCurrency(anggaran.anggaran_murni)}</td>
                            <td>{formatCurrency(anggaran.pergeseran)}</td>
                            <td>{formatCurrency(anggaran.perubahan)}</td>
                            <td>
                                <button
                                    onClick={() => setEditAnggaran(anggaran)}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(anggaran.id)}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default AnggaranList;
