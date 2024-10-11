import { Link } from "@inertiajs/react";

export default function ResponsiveNavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? "border-[#c1292e] text-[#c1292e] bg-[#fbfef9] focus:text-[#c1292e] focus:bg-[#f39237] focus:border-[#c1292e]"
                    : "border-transparent text-gray-600 hover:text-[#c1292e] hover:bg-[#f39237] hover:border-[#c1292e] focus:text-[#c1292e] focus:bg-[#f39237] focus:border-[#c1292e]"
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
