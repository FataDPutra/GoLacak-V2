import React, { useState } from "react";
import AnggaranForm from "../../Components/AnggaranForm"; // Import form anggaran
import AnggaranList from "../../Components/AnggaranList"; // Import list anggaran
import Sidebar from "../../Components/Sidebar"; // Import sidebar

const Index = ({ anggarans, programs, subprograms, kegiatans }) => {
    const [editAnggaran, setEditAnggaran] = useState(null); // State untuk edit anggaran

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "20px", padding: "20px", flexGrow: 1 }}>
                <h1>Daftar Anggaran</h1>
                <AnggaranForm
                    editAnggaran={editAnggaran}
                    setEditAnggaran={setEditAnggaran}
                    programs={programs}
                    subprograms={subprograms}
                    kegiatans={kegiatans} // Not used in form but passed, you can use if needed
                />

                <AnggaranList
                    anggarans={anggarans}
                    setEditAnggaran={setEditAnggaran}
                />
            </div>
        </div>
    );
};

export default Index;
