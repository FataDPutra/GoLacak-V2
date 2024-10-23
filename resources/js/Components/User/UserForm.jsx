import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaSave, FaTimes, FaEdit } from "react-icons/fa";

export default function UserForm({ editUser, bidangList, setEditUser }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [bidangId, setBidangId] = useState(""); // State untuk bidang_id

    console.log(bidangList);
    // Efek untuk mengisi form jika dalam mode edit
    useEffect(() => {
        if (editUser) {
            setName(editUser.name);
            setEmail(editUser.email);
            setRole(editUser.role);
            setBidangId(editUser.bidang_id); // Isi bidang jika dalam mode edit
        }
    }, [editUser]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editUser) {
            Inertia.put(`/users/${editUser.id}`, {
                name,
                email,
                role,
                bidang_id: bidangId, // Simpan bidang yang dipilih
            });
        } else {
            Inertia.post("/users", {
                name,
                email,
                password,
                role,
                bidang_id: bidangId, // Simpan bidang yang dipilih
            });
        }
    };

    const handleCancel = () => {
        setEditUser(null); // Reset form saat cancel
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
        setBidangId(""); // Reset bidang
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Nama
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            {!editUser && (
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            )}

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Role
                </label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Pilih Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            {/* Dropdown untuk bidang */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Bidang
                </label>
                <select
                    value={bidangId}
                    onChange={(e) => setBidangId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Pilih Bidang</option>
                    {bidangList?.length > 0 &&
                        bidangList.map((bidang) => (
                            <option key={bidang.id} value={bidang.id}>
                                {bidang.nama_bidang}
                            </option>
                        ))}
                </select>
            </div>
            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex items-center justify-center w-full p-2 bg-[#0e79b2] text-white rounded-md hover:bg-[#f39237] transition-all"
                >
                    {editUser ? <FaEdit /> : <FaSave />} Simpan
                </button>
                {editUser && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center justify-center w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                    >
                        <FaTimes /> Batal
                    </button>
                )}
            </div>
        </form>
    );
}
