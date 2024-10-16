import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="flex flex-col md:flex-row w-full min-h-[80vh]">
                {/* Left Section */}
                <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 sm:p-10 relative">
                    <div className="max-w-md w-full space-y-8 mt-12">
                        <div className="text-center">
                            {/* GIF Image */}
                            <img
                                src="/lawangSewu.gif" // Replace with your GIF URL
                                alt="Loading animation"
                                className="mx-auto mb-4" // Center and add some margin
                                style={{ maxWidth: "70%", height: "auto" }} // Responsive styling
                            />
                            <h2 className="text-center text-3xl font-bold text-[#384B70]">
                                Selamat datang di Go-Lacak
                            </h2>
                            <p className="text-center text-sm text-[#507687]">
                                Silahkan masuk ke Go-Lacak
                            </p>
                        </div>
                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600">
                                {status}
                            </div>
                        )}
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Alamat Email"
                                    className="text-[#507687]"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B8001F] focus:border-[#B8001F] sm:text-sm"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Kata Sandi"
                                    className="text-[#507687]"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B8001F] focus:border-[#B8001F] sm:text-sm"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                {/* Updated Primary Button */}
                                <PrimaryButton
                                    className="w-full py-2 px-6 border border-transparent text-sm font-medium rounded-full text-white bg-[#B8001F] hover:bg-[#507687] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B8001F] shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 flex justify-center items-center"
                                    disabled={processing}
                                >
                                    Masuk
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Right Section */}
                <div
                    className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-[#507687] to-[#384B70] items-center justify-center"
                    style={{
                        backgroundImage: "url('semarang.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>
            </div>
        </GuestLayout>
    );
}
