import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                "border-gray-300 focus:border-[#0e79b2] focus:ring-[#0e79b2] rounded-md shadow-sm " +
                className
            }
            ref={input}
        />
    );
});
