import React, { useState } from "react";
import BidangForm from "../../Components/BidangForm";
import BidangList from "../../Components/BidangList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ bidangs, auth }) => {
    const [editBidang, setEditBidang] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
                <Sidebar />
                <div className="lg:ml-20 lg:mr-10 p-6 flex-grow bg-white shadow-lg rounded-md">
                    <h1 className="text-3xl font-bold text-gray-700 mb-6">
                        Daftar Bidang
                    </h1>
                    <BidangForm
                        editBidang={editBidang}
                        setEditBidang={setEditBidang}
                    />
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
