import React, { useState } from "react";
import ProgramForm from "../../Components/ProgramForm";
import ProgramList from "../../Components/ProgramList";
import Sidebar from "../../Components/Sidebar"; // Mengimpor Sidebar

const Index = ({ programs }) => {
    const [editProgram, setEditProgram] = useState(null); // State untuk edit program

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Konten utama */}
            <div style={{ marginLeft: "20px", padding: "20px", flexGrow: 1 }}>
                <h1>Daftar Program</h1>

                {/* Form untuk menambah dan mengedit program */}
                <ProgramForm editProgram={editProgram} />

                {/* List program dengan action edit dan hapus */}
                <ProgramList
                    programs={programs}
                    setEditProgram={setEditProgram}
                />
            </div>
        </div>
    );
};

export default Index;
