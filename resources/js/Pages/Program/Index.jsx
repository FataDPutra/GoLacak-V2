import React, { useState } from "react";
import ProgramForm from "../../Components/ProgramForm";
import ProgramList from "../../Components/ProgramList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ programs, auth }) => {
    const [editProgram, setEditProgram] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
                <Sidebar />
                <div className="lg:ml-20 lg:mr-10 p-6 flex-grow bg-white shadow-lg rounded-md">
                    <h1 className="text-3xl font-bold text-gray-700 mb-6">
                        Daftar Program
                    </h1>
                    {/* Pass setEditProgram as a prop */}
                    <ProgramForm
                        editProgram={editProgram}
                        setEditProgram={setEditProgram}
                    />
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
