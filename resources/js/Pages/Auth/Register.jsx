import React from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head } from "@inertiajs/react";

const Register = ({ bidangs = [], roles = [] }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
        bidang_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
            <Head title="Register" />

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                    <InputLabel htmlFor="name" value="Nama" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email Input */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password Input */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Password Confirmation Input */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Password"
                    />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* Role Dropdown */}
                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Role" />
                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white"
                        onChange={(e) => setData("role", e.target.value)}
                        required
                    >
                        <option value="">-- Pilih Role --</option>
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                {/* Bidang Dropdown */}
                <div className="mt-4">
                    <InputLabel htmlFor="bidang_id" value="Bidang" />
                    <select
                        id="bidang_id"
                        name="bidang_id"
                        value={data.bidang_id}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white"
                        onChange={(e) => setData("bidang_id", e.target.value)}
                    >
                        <option value="">-- Pilih Bidang --</option>
                        {bidangs.map((bidang) => (
                            <option key={bidang.id} value={bidang.id}>
                                {bidang.nama_bidang}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.bidang_id} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Daftar
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default Register;
