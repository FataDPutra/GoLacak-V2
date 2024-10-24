import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#FCFAEE]">
            <div>
                {/* <Link href="/public/disnaker.ico">
                    <ApplicationLogo className="w-10 h-10 fill-current text-[#507687]" />
                </Link> */}
            </div>

            <div className="w-full sm:max-w-[65%] mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
