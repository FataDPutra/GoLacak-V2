import React, { useState } from "react";
import BidangForm from "../../Components/Bidang/BidangForm";
import BidangList from "../../Components/Bidang/BidangList";
import Sidebar from "../../Components/Sidebar";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ bidangs, auth }) => {
    const [editBidang, setEditBidang] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
                <Sidebar />
                <div className="lg:ml-20 lg:mr-10 p-8 flex-grow bg-white shadow-lg rounded-md">
                    {/* Heading Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#191923] mb-4">
                            Daftar Bidang
                        </h1>
                    </div>

                    {/* Form and List Section */}
                    <div className="grid grid-cols-1 gap-8">
                        <div className="bg-[#fbfef9] p-6 rounded-lg shadow-md">
                            <BidangForm
                                editBidang={editBidang}
                                setEditBidang={setEditBidang}
                            />
                        </div>
                        <div className="bg-[#fbfef9] p-6 rounded-lg shadow-md">
                            <BidangList
                                bidangs={bidangs}
                                setEditBidang={setEditBidang}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
