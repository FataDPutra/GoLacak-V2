import React from "react";
import { Inertia } from "@inertiajs/inertia";

const ProgramList = ({ programs, setEditProgram }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus program ini?")) {
            Inertia.delete(`/programs/${id}`);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Nama Program</th>
                    <th>No Rekening</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {programs.map((program) => (
                    <tr key={program.id}>
                        <td>{program.nama_program}</td>
                        <td>{program.rekening.no_rekening}</td>
                        <td>
                            <button onClick={() => setEditProgram(program)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(program.id)}>
                                Hapus
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProgramList;
