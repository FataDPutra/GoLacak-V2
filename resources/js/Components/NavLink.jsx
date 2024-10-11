import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-[#0e79b2] text-[#191923] focus:border-[#0e79b2] "
                    : "border-transparent text-gray-500 hover:text-[#191923] hover:border-[#f39237] focus:text-[#191923] focus:border-[#f39237] ") +
                className
            }
        >
            {children}
        </Link>
    );
}
