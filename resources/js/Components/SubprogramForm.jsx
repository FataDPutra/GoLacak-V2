import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function SubprogramForm({
    editSubprogram,
    programs,
    setEditSubprogram,
}) {
    const [namaSubprogram, setNamaSubprogram] = useState("");
    const [programId, setProgramId] = useState("");
    const [noRekening, setNoRekening] = useState("");

    useEffect(() => {
        if (editSubprogram) {
            setNamaSubprogram(editSubprogram.nama_subprogram);
            setProgramId(editSubprogram.program_id);
            setNoRekening(editSubprogram.rekening.no_rekening);
        }
    }, [editSubprogram]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editSubprogram) {
            Inertia.put(`/subprograms/${editSubprogram.id}`, {
                nama_subprogram: namaSubprogram,
                program_id: programId,
                no_rekening: noRekening,
            });
        } else {
            Inertia.post("/subprograms", {
                nama_subprogram: namaSubprogram,
                program_id: programId,
                no_rekening: noRekening,
            });
        }
    };

    const handleCancel = () => {
        setEditSubprogram(null);
        setNamaSubprogram("");
        setProgramId("");
        setNoRekening("");
    };

    return (
        <form onSubmit={handleSubmit}>
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
                <label>No Rekening</label>
                <input
                    type="text"
                    value={noRekening}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            setNoRekening(value);
                        }
                    }}
                    required
                />
            </div>
            <button type="submit">
                {editSubprogram ? "Update Subprogram" : "Simpan Subprogram"}
            </button>
            {editSubprogram && (
                <button
                    type="button"
                    onClick={handleCancel}
                    className="ml-4 p-2 bg-red-600 text-white rounded-md"
                >
                    Cancel
                </button>
            )}
        </form>
    );
}
