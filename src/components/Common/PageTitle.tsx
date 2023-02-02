type Prop = {
    title: String;
};

const PageTitle = ({ title }: Prop) => {
    return (
        <div>
            <h2 data-aos="zoom-in-right">{title}</h2>
            <style jsx>
                {`
                    h2 {
                        border-bottom: 5px solid var(--color-yellow);
                        display: inline-block;
                        margin-bottom: 1rem;
                    }
                `}
            </style>
        </div>
    );
};

export default PageTitle;
