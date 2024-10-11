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
            <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
                <Sidebar />
                <div className="lg:ml-20 lg:mr-10 p-8 flex-grow bg-white shadow-lg rounded-md">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#191923] mb-4">
                            Daftar Anggaran
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#fbfef9] p-6 rounded-lg shadow-md">
                            <AnggaranForm
                                editAnggaran={editAnggaran}
                                setEditAnggaran={setEditAnggaran}
                                programs={programs}
                                subprograms={subprograms}
                                kegiatans={kegiatans}
                                bidangs={bidangs}
                            />
                        </div>
                        <div className="bg-[#fbfef9] p-6 rounded-lg shadow-md">
                            <AnggaranList
                                anggarans={anggarans}
                                setEditAnggaran={setEditAnggaran}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
