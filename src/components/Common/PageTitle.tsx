type Prop = {
    title: String;
};

const PageTitle = ({ title }: Prop) => {
    return (
        <div>
            <h2>{title}</h2>
            <style jsx>
                {`
                    h2 {
                        padding-bottom: 0.2rem;
                        border-bottom: 5px solid var(--color-yellow);
                        display: inline-block;
                        margin-bottom: 1.5rem;
                    }
                `}
            </style>
        </div>
    );
};

export default PageTitle;
