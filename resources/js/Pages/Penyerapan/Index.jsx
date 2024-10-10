import React, { useState } from "react";
import PenyerapanForm from "../../Components/PenyerapanForm";
import PenyerapanList from "../../Components/PenyerapanList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ penyerapanList, anggaran, programs, auth }) => {
    const [editPenyerapan, setEditPenyerapan] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div
                    style={{ marginLeft: "20px", padding: "20px", flexGrow: 1 }}
                >
                    <h1>Daftar Penyerapan</h1>
                    <PenyerapanForm
                        editPenyerapan={editPenyerapan}
                        setEditPenyerapan={setEditPenyerapan}
                        programs={programs}
                        anggarans={anggaran}
                    />
                    <PenyerapanList
                        penyerapanList={penyerapanList}
                        setEditPenyerapan={setEditPenyerapan}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
