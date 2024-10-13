import React, { useState } from "react";
import ProgramForm from "../../Components/Programs/ProgramForm";
import ProgramList from "../../Components/Programs/ProgramList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ programs, auth }) => {
    const [editProgram, setEditProgram] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col lg:flex-row bg-[#fbfef9] min-h-screen">
                <Sidebar />
                <div className="lg:ml-20 lg:mr-10 p-6 flex-grow bg-white shadow-lg rounded-md">
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
