import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement>(({}, ref) => {
    return <input type="text" ref={ref} />;
});

export default Input;
