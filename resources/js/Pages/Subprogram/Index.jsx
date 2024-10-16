import React, { useState } from "react";
import SubprogramForm from "../../Components/SubPrograms/SubprogramForm";
import SubprogramList from "../../Components/SubPrograms/SubprogramList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ subprograms, programs, auth }) => {
    const [editSubprogram, setEditSubprogram] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex bg-[#fbfef9] min-h-screen">
                {/* Wrapper untuk Sidebar dengan lebar tetap */}
                <div className="w-64 bg-white shadow-lg">
                    <Sidebar />
                </div>

                {/* Konten Utama */}
                <div className="flex-grow p-8 bg-white shadow-lg rounded-md">
                    <h1 className="text-3xl font-bold text-[#191923] mb-4">
                        Daftar Kegiatan
                    </h1>

                    <SubprogramForm
                        editSubprogram={editSubprogram}
                        setEditSubprogram={setEditSubprogram}
                        programs={programs}
                    />
                    <SubprogramList
                        subprograms={subprograms}
                        setEditSubprogram={setEditSubprogram}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
