import styled from "styled-components";

const H2 = styled.h2`
    padding-bottom: 0.2rem;
    border-bottom: 5px solid var(--color-yellow);
    display: inline-block;
    margin-bottom: 1.5rem;
`;

const PageTitle = ({ title }) => {
    return (
        <div>
            <H2>{title}</H2>
        </div>
    );
};

export default PageTitle;
