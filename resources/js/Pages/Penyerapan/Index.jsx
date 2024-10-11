import React, { useState } from "react";
import PenyerapanForm from "../../Components/Penyerapan/PenyerapanForm";
import PenyerapanList from "../../Components/Penyerapan/PenyerapanList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ penyerapanList, anggaran, programs, auth }) => {
    const [editPenyerapan, setEditPenyerapan] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
                <Sidebar />
                <div className="lg:ml-20 lg:mr-10 p-8 flex-grow bg-white shadow-lg rounded-md">
                    <h1 className="text-3xl font-bold text-[#191923] mb-6">
                        Daftar Penyerapan
                    </h1>

                    <div className="space-y-6">
                        <div className="bg-[#fbfef9] p-6 rounded-lg shadow-md">
                            <PenyerapanForm
                                editPenyerapan={editPenyerapan}
                                setEditPenyerapan={setEditPenyerapan}
                                programs={programs}
                                anggarans={anggaran}
                            />
                        </div>

                        <div className="bg-[#fbfef9] p-6 rounded-lg shadow-md">
                            <PenyerapanList
                                penyerapanList={penyerapanList}
                                setEditPenyerapan={setEditPenyerapan}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
