import React, { useState } from "react";
import BidangForm from "../../Components/Bidang/BidangForm";
import BidangList from "../../Components/Bidang/BidangList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ bidangs, auth }) => {
    const [editBidang, setEditBidang] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex bg-[#fbfef9] min-h-screen">
                {/* Sidebar dengan lebar tetap */}
                <div className="w-64 bg-white shadow-lg">
                    <Sidebar />
                </div>

                {/* Konten Utama */}
                <div className="flex-grow p-6 bg-white shadow-lg rounded-md">
                    <h1 className="text-3xl font-bold text-[#191923] mb-6">
                        Daftar Bidang
                    </h1>

                    {/* Formulir Bidang */}
                    <BidangForm
                        editBidang={editBidang}
                        setEditBidang={setEditBidang}
                    />

                    {/* Daftar Bidang */}
                    <BidangList
                        bidangs={bidangs}
                        setEditBidang={setEditBidang}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
