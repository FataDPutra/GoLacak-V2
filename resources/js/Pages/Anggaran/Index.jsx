import React, { useState } from "react";
import AnggaranForm from "../../Components/AnggaranForm";
import AnggaranList from "../../Components/AnggaranList";
import Sidebar from "../../Components/Sidebar";

const Index = ({ anggarans, kegiatan }) => {
    const [editAnggaran, setEditAnggaran] = useState(null); // State untuk edit anggaran

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "20px", padding: "20px", flexGrow: 1 }}>
                <h1>Daftar Anggaran</h1>

                <AnggaranForm editAnggaran={editAnggaran} kegiatan={kegiatan} />
                <AnggaranList
                    anggarans={anggarans}
                    setEditAnggaran={setEditAnggaran}
                />
            </div>
        </div>
    );
};

export default Index;
