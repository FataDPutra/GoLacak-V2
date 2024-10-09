import React, { useState } from "react";
import AnggaranForm from "../../Components/AnggaranForm";
import AnggaranList from "../../Components/AnggaranList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ anggarans, programs, subprograms, kegiatans, auth }) => {
    const [editAnggaran, setEditAnggaran] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div
                    style={{ marginLeft: "20px", padding: "20px", flexGrow: 1 }}
                >
                    <h1>Daftar Anggaran</h1>
                    <AnggaranForm
                        editAnggaran={editAnggaran}
                        setEditAnggaran={setEditAnggaran}
                        programs={programs}
                        subprograms={subprograms}
                        kegiatans={kegiatans}
                    />
                    <AnggaranList
                        anggarans={anggarans}
                        setEditAnggaran={setEditAnggaran}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
