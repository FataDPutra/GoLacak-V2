// resources/js/Pages/Kegiatan/Index.jsx
import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia-react";
import FormComponent from "../../Components/ProgramForm"; // Anda bisa menyesuaikan ini
import TableComponent from "../../Components/TableComponent"; // Anda bisa menyesuaikan ini

const KegiatanIndex = ({ kegiatan }) => {
    const [kegiatanData, setKegiatanData] = useState(kegiatan);

    const handleKegiatanSubmit = (formData) => {
        Inertia.post("/kegiatan", formData, {
            onSuccess: () => {
                setKegiatanData([...kegiatanData, formData]);
            },
        });
    };

    return (
        <div>
            <FormComponent type="kegiatan" onSubmit={handleKegiatanSubmit} />
            <TableComponent data={kegiatanData} type="kegiatan" />
        </div>
    );
};

export default KegiatanIndex;
