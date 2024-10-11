import React, { useState } from "react";
import KegiatanForm from "../../Components/Kegiatan/KegiatanForm";
import KegiatanList from "../../Components/Kegiatan/KegiatanList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ kegiatans, programs, subprograms, rekenings, auth }) => {
    const [editKegiatan, setEditKegiatan] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
                <Sidebar />
                <div className="lg:ml-20 lg:mr-10 p-8 flex-grow bg-white shadow-lg rounded-md">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#191923] mb-4">
                            Daftar Sub Kegiatan
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#fbfef9] p-6 rounded-lg shadow-md">
                            <KegiatanForm
                                editKegiatan={editKegiatan}
                                setEditKegiatan={setEditKegiatan}
                                programs={programs}
                                subprograms={subprograms}
                                rekenings={rekenings}
                            />
                        </div>
                        <div className="bg-[#fbfef9] p-6 rounded-lg shadow-md">
                            <KegiatanList
                                kegiatans={kegiatans}
                                setEditKegiatan={setEditKegiatan}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
