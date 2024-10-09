import React, { useState } from "react";
import KegiatanForm from "../../Components/KegiatanForm";
import KegiatanList from "../../Components/KegiatanList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({
    kegiatans,
    programs,
    subprograms,
    rekenings,
    bidangs,
    auth,
}) => {
    const [editKegiatan, setEditKegiatan] = useState(null); // Mengatur state edit

    return (
        <AuthenticatedLayout user={auth.user}>
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div
                    style={{ marginLeft: "20px", padding: "20px", flexGrow: 1 }}
                >
                    <h1>Daftar Kegiatan</h1>
                    <KegiatanForm
                        editKegiatan={editKegiatan}
                        setEditKegiatan={setEditKegiatan} // Pastikan fungsi ini dikirim ke form
                        programs={programs}
                        subprograms={subprograms}
                        rekenings={rekenings}
                        bidangs={bidangs}
                    />
                    <KegiatanList
                        kegiatans={kegiatans}
                        setEditKegiatan={setEditKegiatan} // Pastikan fungsi ini dikirim ke list
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
