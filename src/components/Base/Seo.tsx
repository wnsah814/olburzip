import Head from "next/head";
interface Prop {
    title: string;
}
const Seo = ({ title }: Prop) => {
    return (
        <Head>
            <title>{`${title} | URBUR`}</title>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
    );
};

export default Seo;
