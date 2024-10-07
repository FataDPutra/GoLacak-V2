import React, { useState } from "react";
import SubprogramForm from "../../Components/SubprogramForm";
import SubprogramList from "../../Components/SubprogramList";
import Sidebar from "../../Components/Sidebar";

const Index = ({ subprograms, programs }) => {
    const [editSubprogram, setEditSubprogram] = useState(null); // State untuk edit subprogram

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "20px", padding: "20px", flexGrow: 1 }}>
                <h1>Daftar Kegiatan</h1>
                <SubprogramForm
                    editSubprogram={editSubprogram}
                    programs={programs}
                />
                <SubprogramList
                    subprograms={subprograms}
                    setEditSubprogram={setEditSubprogram}
                />
            </div>
        </div>
    );
};

export default Index;
