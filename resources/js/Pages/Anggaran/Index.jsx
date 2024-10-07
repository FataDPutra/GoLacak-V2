import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar"; // Pastikan path ini sesuai
import AnggaranList from "../../Components/AnggaranList";
import AnggaranForm from "../../Components/AnggaranForm";

const Index = ({ anggarans, kegiatans }) => {
    const [editAnggaran, setEditAnggaran] = useState(null);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "20px", padding: "20px", flexGrow: 1 }}>
                <h1>Daftar Anggaran</h1>
                <AnggaranForm
                    editAnggaran={editAnggaran}
                    kegiatans={kegiatans}
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
