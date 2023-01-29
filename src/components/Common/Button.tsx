import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    rest?: any;
}

const Button = (props: ButtonProps) => {
    const { children, onClick } = props;
    return (
        <>
            <button onClick={onClick}>{children}</button>
            <style jsx>
                {`
                    button {
                        display: flex;
                        align-content: center;
                        justify-content: center;
                        padding: 0.7rem;
                        border-radius: 0.3rem;
                        border: none;
                        background-color: var(--color-brown);
                        color: var(--color-white);
                        margin-bottom: 1rem;
                    }

                    button:hover {
                        cursor: pointer;
                    }
                `}
            </style>
        </>
    );
};
export default Button;
