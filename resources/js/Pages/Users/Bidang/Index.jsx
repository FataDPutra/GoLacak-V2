import React, { useState } from "react";
import BidangForm from "../../../Components/Bidang/BidangForm";
import BidangList from "../../../Components/Bidang/BidangList";
import Sidebar from "../../../Components/Sidebar";
import AuthenticatedLayout from "../../../Layouts/AuthenticatedLayout";

const Index = ({ bidangs, auth }) => {
    const [editBidang, setEditBidang] = useState(null);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
                <Sidebar />
                <div className="lg:ml-20 lg:mr-10 p-8 flex-grow bg-white shadow-lg rounded-md">
                    {/* Heading Section */}
                    <div className="mb-8">
                        {/* Mengambil nama_bidang dari bidang yang dimiliki user */}
                        <h1 className="text-3xl font-bold text-[#191923] mb-4">
                            {bidangs.length > 0
                                ? bidangs[0].nama_bidang
                                : "Bidang"}
                        </h1>
                        <p className="text-lg text-gray-600 mb-4">
                            Selamat datang,{" "}
                            <span className="font-semibold">
                                {auth.user.name}
                            </span>
                        </p>

                        {/* Artikel Section dengan lorem ipsum */}
                        <div className="prose max-w-full text-gray-700 leading-relaxed">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Quisque euismod, justo nec
                                tincidunt auctor, elit eros convallis nulla, a
                                malesuada libero est id risus. Curabitur
                                facilisis nisi vel lacus lacinia, vitae pretium
                                risus sodales. Duis suscipit, est sit amet
                                tincidunt auctor, purus nibh ultricies nisi, sit
                                amet porttitor turpis justo at magna.
                            </p>
                            <p>
                                Sed sit amet diam sed ipsum auctor venenatis.
                                Phasellus ac ligula vel felis pretium tincidunt
                                non vitae nulla. Nullam condimentum urna vel
                                tortor scelerisque, nec tincidunt elit
                                condimentum. Mauris aliquam, urna in tincidunt
                                fermentum, lectus quam scelerisque metus, at
                                vehicula metus quam nec risus.
                            </p>
                            <p>
                                Nulla facilisi. Vivamus nec felis ac turpis
                                cursus bibendum at at purus. Ut dapibus, orci in
                                fermentum fermentum, metus ligula aliquet nunc,
                                at accumsan nunc arcu et velit. Etiam blandit,
                                mi ut scelerisque mollis, urna nulla lacinia
                                turpis, sit amet egestas metus velit id nisl.
                            </p>
                        </div>
                    </div>

                    {/* Bidang List Section */}
                    <div className="mt-6"></div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
