import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function SubprogramForm({ editSubprogram, programs }) {
    const [namaSubprogram, setNamaSubprogram] = useState("");
    const [programId, setProgramId] = useState("");

    useEffect(() => {
        if (editSubprogram) {
            setNamaSubprogram(editSubprogram.nama_subprogram);
            setProgramId(editSubprogram.program_id);
        }
    }, [editSubprogram]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editSubprogram) {
            Inertia.put(`/subprograms/${editSubprogram.id}`, {
                nama_subprogram: namaSubprogram,
                program_id: programId,
            });
        } else {
            Inertia.post("/subprograms", {
                nama_subprogram: namaSubprogram,
                program_id: programId,
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
                <label>Program</label>
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
            <button type="submit">
                {editSubprogram ? "Update Subprogram" : "Simpan Subprogram"}
            </button>
        </form>
    );
}
