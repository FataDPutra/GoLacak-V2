import React, { useState } from "react";
import KegiatanForm from "../../Components/KegiatanForm";
import KegiatanList from "../../Components/KegiatanList";
import Sidebar from "../../Components/Sidebar";

const Index = ({ kegiatans, programs, subprograms, rekenings }) => {
    const [editKegiatan, setEditKegiatan] = useState(null); // State untuk edit kegiatan

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "20px", padding: "20px", flexGrow: 1 }}>
                <h1>Daftar Kegiatan</h1>
                <KegiatanForm
                    editKegiatan={editKegiatan}
                    programs={programs}
                    subprograms={subprograms}
                    rekenings={rekenings}
                />
                <KegiatanList
                    kegiatans={kegiatans}
                    setEditKegiatan={setEditKegiatan}
                />
            </div>
        </div>
    );
};

export default Index;
