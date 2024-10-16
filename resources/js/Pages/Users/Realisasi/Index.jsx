import React, { useState } from "react";
import RealisasiForm from "../../../Components/Realisasi/RealisasiForm";
import RealisasiList from "../../../Components/Realisasi/RealisasiList";
import Sidebar from "../../../Components/Users/Sidebar";
import AuthenticatedLayout from "../../../Layouts/AuthenticatedLayout";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Index page for Realisasi.
 *
 * This page displays a list of all penyerapan records and a form to add a new
 * penyerapan record or edit an existing one.
 *
 * @param {object} props - Component props.
 * @param {array} props.penyerapanList - List of penyerapan records.
 * @param {array} props.anggaran - List of anggaran records.
 * @param {array} props.programs - List of program records.
 * @param {object} props.auth - User authentication information.
 * @returns {ReactElement} - The rendered component.
 */
/******  16669c43-e0ad-4c30-8df1-b18a7ceea223  *******/ const Index = ({
    penyerapanList,
    anggaran,
    programs,
    auth,
}) => {
    const [editPenyerapan, setEditPenyerapan] = useState(null);

    console.log("Data di Index:", penyerapanList);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex bg-[#fbfef9] min-h-screen">
                {/* Sidebar dengan lebar tetap */}
                <div className="w-64 bg-white shadow-lg">
                    <Sidebar />
                </div>

                <div className="flex-grow p-6 bg-white shadow-lg rounded-md">
                    <h1 className="text-3xl font-bold text-[#191923] mb-6">
                        Daftar Realisasi
                    </h1>
                    <RealisasiForm
                        editPenyerapan={editPenyerapan}
                        setEditPenyerapan={setEditPenyerapan}
                        programs={programs}
                        anggarans={anggaran}
                    />
                    <RealisasiList
                        penyerapanList={penyerapanList}
                        setEditPenyerapan={setEditPenyerapan}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
