import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    rest?: any;
}

const Button = (props: ButtonProps) => {
    const { rest } = props;
    return (
        <>
            <button {...rest}>My Button</button>
            <style jsx>
                {`
                    button {
                        padding: 1rem;
                    }
                `}
            </style>
        </>
    );
};
export default Button;
