import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function SubprogramForm({ programs, editSubprogram }) {
    const [namaSubprogram, setNamaSubprogram] = useState("");
    const [programId, setProgramId] = useState("");
    const [noRekening, setNoRekening] = useState("");

    // Jika sedang dalam mode edit, set nilai default pada form
    useEffect(() => {
        if (editSubprogram) {
            setNamaSubprogram(editSubprogram.nama_subprogram);
            setProgramId(editSubprogram.program_id); // ID program yang dipilih
            setNoRekening(editSubprogram.rekening.no_rekening); // No rekening dari subprogram
        }
    }, [editSubprogram]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editSubprogram) {
            // Jika sedang mengedit subprogram
            Inertia.put(`/subprograms/${editSubprogram.id}`, {
                nama_subprogram: namaSubprogram,
                program_id: programId,
                no_rekening: noRekening,
            });
        } else {
            // Jika menambah subprogram baru
            Inertia.post("/subprograms", {
                nama_subprogram: namaSubprogram,
                program_id: programId,
                no_rekening: noRekening,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nama Subprogram</label>
                <input
                    type="text"
                    value={namaSubprogram}
                    onChange={(e) => setNamaSubprogram(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Pilih Program</label>
                <select
                    value={programId}
                    onChange={(e) => setProgramId(e.target.value)}
                    required
                >
                    <option value="">Pilih Program</option>
                    {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.nama_program}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>No Rekening</label>
                <input
                    type="text"
                    value={noRekening}
                    onChange={(e) => setNoRekening(e.target.value)}
                    required
                />
            </div>
            <button type="submit">
                {editSubprogram ? "Update Subprogram" : "Simpan Subprogram"}
            </button>
        </form>
    );
}
