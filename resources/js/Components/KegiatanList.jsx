import React from "react";
import { Inertia } from "@inertiajs/inertia";

const KegiatanList = ({ kegiatans, setEditKegiatan }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
            Inertia.delete(`/kegiatans/${id}`);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Nama Kegiatan</th>
                    <th>Subprogram</th>
                    <th>Program</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {kegiatans.map((kegiatan) => (
                    <tr key={kegiatan.id}>
                        <td>{kegiatan.nama_kegiatan}</td>
                        <td>{kegiatan.subprogram.nama_subprogram}</td>
                        <td>{kegiatan.subprogram.program.nama_program}</td>
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
