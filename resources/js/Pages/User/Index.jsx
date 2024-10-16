import React, { useState } from "react";
import UserForm from "../../Components/User/UserForm";
import UserList from "../../Components/User/UserList";
import Sidebar from "../../Components/Sidebar"; // Import the Sidebar component
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ users, bidangList, auth }) => {
    const [editUser, setEditUser] = useState(null);

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
                        Daftar Pengguna
                    </h1>

                    <UserForm
                        editUser={editUser}
                        bidangList={bidangList}
                        setEditUser={setEditUser}
                    />
                    <UserList users={users} setEditUser={setEditUser} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
