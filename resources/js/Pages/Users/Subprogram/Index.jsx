import React, { useState } from "react";
import SubprogramForm from "../../Components/SubPrograms/SubprogramForm";
import SubprogramList from "../../Components/SubPrograms/SubprogramList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout"; // Import layout

const Index = ({ subprograms, programs, auth }) => {
    const [editSubprogram, setEditSubprogram] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
                <Sidebar />
                <div className="lg:ml-20 lg:mr-10 p-8 flex-grow bg-white shadow-lg rounded-md">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#191923] mb-4">
                            Daftar Kegiatan
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#fbfef9] p-6 rounded-lg shadow-md">
                            <SubprogramForm
                                editSubprogram={editSubprogram}
                                setEditSubprogram={setEditSubprogram}
                                programs={programs}
                            />
                        </div>
                        <div className="bg-[#fbfef9] p-6 rounded-lg shadow-md">
                            <SubprogramList
                                subprograms={subprograms}
                                setEditSubprogram={setEditSubprogram}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
