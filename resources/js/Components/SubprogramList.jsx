import React from "react";
import { Inertia } from "@inertiajs/inertia";

const SubprogramList = ({ subprograms, setEditSubprogram }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus subprogram ini?")) {
            Inertia.delete(`/subprograms/${id}`, {
                onSuccess: () => alert("Subprogram berhasil dihapus!"),
                onError: (error) =>
                    alert("Terjadi kesalahan: " + error.message),
            });
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Nama Subprogram</th>
                    <th>Program</th>
                    <th>No Rekening</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {subprograms.map((subprogram, index) => (
                    <tr key={subprogram.id || index}>
                        <td>{subprogram.nama_subprogram}</td>
                        <td>{subprogram.program?.nama_program}</td>
                        <td>{subprogram.rekening?.no_rekening}</td>
                        <td>
                            <button
                                onClick={() => setEditSubprogram(subprogram)}
                            >
                                Edit
                            </button>
                            <button onClick={() => handleDelete(subprogram.id)}>
                                Hapus
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SubprogramList;
