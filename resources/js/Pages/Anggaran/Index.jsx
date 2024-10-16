import React, { useState } from "react";
import AnggaranForm from "../../Components/Anggaran/AnggaranForm";
import AnggaranList from "../../Components/Anggaran/AnggaranList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({
    anggarans,
    programs,
    subprograms,
    kegiatans,
    bidangs,
    auth,
}) => {
    const [editAnggaran, setEditAnggaran] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex bg-[#fbfef9] min-h-screen">
                {/* Sidebar dengan lebar tetap */}
                <div className="w-64 bg-white shadow-lg">
                    <Sidebar />
                </div>

                {/* Konten Utama */}
                <div className="flex-grow p-6 bg-white shadow-lg rounded-md">
                    <h1 className="text-3xl font-bold text-[#191923] mb-4">
                        Daftar Anggaran
                    </h1>

                    <AnggaranForm
                        editAnggaran={editAnggaran}
                        setEditAnggaran={setEditAnggaran}
                        programs={programs}
                        subprograms={subprograms}
                        kegiatans={kegiatans}
                        bidangs={bidangs}
                    />
                    <AnggaranList
                        anggarans={anggarans}
                        setEditAnggaran={setEditAnggaran}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
