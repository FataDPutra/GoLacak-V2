import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";

const UserList = ({ users, setEditUser }) => {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
            Inertia.delete(`/users/${id}`, {
                onSuccess: () => alert("User berhasil dihapus!"),
                onError: (error) =>
                    alert("Terjadi kesalahan: " + error.message),
            });
        }
    };

    return (
        <table className="min-w-full bg-[#fbfef9] shadow-lg rounded-lg border-collapse border border-gray-300 text-sm">
            <thead className="bg-[#0e79b2] text-white">
                <tr>
                    <th className="py-2 px-3 text-left border-r border-white">
                        Nama
                    </th>
                    <th className="py-2 px-3 text-left border-r border-white">
                        Email
                    </th>
                    <th className="py-2 px-3 text-left border-r border-white">
                        Role
                    </th>
                    <th className="py-2 px-3 text-left border-r border-white">
                        Bidang
                    </th>
                    <th className="py-2 px-3 text-left border-r border-white">
                        Aksi
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className="hover:bg-gray-100 transition-all border-b border-gray-300"
                    >
                        <td className="py-2 px-3 border-r border-gray-300">
                            {user.name}
                        </td>
                        <td className="py-2 px-3 border-r border-gray-300">
                            {user.email}
                        </td>
                        <td className="py-2 px-3 border-r border-gray-300">
                            {user.role}
                        </td>
                        <td className="py-2 px-3 border-r border-gray-300">
                            {user.bidang ? user.bidang.nama_bidang : "-"}
                        </td>
                        <td className="py-2 px-3 flex gap-2">
                            <button
                                onClick={() => setEditUser(user)}
                                className="flex items-center justify-center p-2 bg-[#f39237] text-white rounded-md hover:bg-[#0e79b2] transition-all"
                            >
                                <FaEdit className="mr-2" /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="flex items-center justify-center p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                            >
                                <FaTrashAlt className="mr-2" /> Hapus
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;
