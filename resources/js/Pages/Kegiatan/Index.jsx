import React, { useState } from "react";
import KegiatanForm from "../../Components/Kegiatan/KegiatanForm";
import KegiatanList from "../../Components/Kegiatan/KegiatanList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ kegiatans, programs, subprograms, rekenings, auth }) => {
    const [editKegiatan, setEditKegiatan] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex bg-[#fbfef9] min-h-screen">
                {/* Sidebar full height and fixed width */}
                <div className="w-64 bg-white shadow-lg">
                    <Sidebar />
                </div>

                {/* Main content area */}
                <div className="flex-grow p-6 bg-white shadow-lg rounded-md">
                    {/* Heading Section */}
                    <h1 className="text-3xl font-bold text-[#191923] mb-4">
                        Daftar Sub Kegiatan
                    </h1>

                    {/* Form and List Section */}
                    <KegiatanForm
                        editKegiatan={editKegiatan}
                        setEditKegiatan={setEditKegiatan}
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
        </AuthenticatedLayout>
    );
};

export default Index;
