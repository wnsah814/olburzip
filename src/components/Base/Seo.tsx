import Head from "next/head";
interface Prop {
    title: string;
}
const Seo = ({ title }: Prop) => {
    return (
        <Head>
            <title>{`${title} | URBUR`}</title>
        </Head>
    );
};

export default Seo;
