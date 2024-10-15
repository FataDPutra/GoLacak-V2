import React, { useState } from "react";
import UserForm from "../../Components/User/UserForm";
import UserList from "../../Components/User/UserList";
import Sidebar from "../../Components/Sidebar"; // Import the Sidebar component
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

const Index = ({ users, bidangList, auth }) => {
    const [editUser, setEditUser] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
                <Sidebar />
                <div className="lg:ml-20 lg:mr-10 p-8 flex-grow bg-white shadow-lg rounded-md">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#191923] mb-4">
                            Daftar Pengguna
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#fbfef9] p-6 rounded-lg shadow-md">
                            <UserForm
                                editUser={editUser}
                                bidangList={bidangList}
                                setEditUser={setEditUser}
                            />
                        </div>
                        <div className="bg-[#fbfef9] p-6 rounded-lg shadow-md">
                            <UserList users={users} setEditUser={setEditUser} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
