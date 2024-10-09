import React, { useState } from "react";
import SubprogramForm from "../../Components/SubprogramForm";
import SubprogramList from "../../Components/SubprogramList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout"; // Import layout

const Index = ({ subprograms, programs, auth }) => {
    const [editSubprogram, setEditSubprogram] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div
                    style={{ marginLeft: "20px", padding: "20px", flexGrow: 1 }}
                >
                    <h1>Daftar Subprogram</h1>
                    <SubprogramForm
                        editSubprogram={editSubprogram}
                        setEditSubprogram={setEditSubprogram} // Pass setEditSubprogram as prop
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
