import React, { useState } from "react";
import ProgramForm from "../../Components/Programs/ProgramForm";
import ProgramList from "../../Components/Programs/ProgramList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ programs, auth }) => {
    const [editProgram, setEditProgram] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex bg-[#fbfef9] min-h-screen">
                {/* Sidebar dengan lebar tetap */}
                <div className="w-64 bg-white shadow-lg">
                    <Sidebar />
                </div>

                {/* Konten Utama */}
                <div className="flex-grow p-6 bg-white shadow-lg rounded-md">
                    <h1 className="text-3xl font-bold text-[#191923] mb-6">
                        Daftar Program
                    </h1>
                    {/* Formulir Program */}
                    <ProgramForm
                        editProgram={editProgram}
                        setEditProgram={setEditProgram}
                    />
                    {/* Daftar Program */}
                    <ProgramList
                        programs={programs}
                        setEditProgram={setEditProgram}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
