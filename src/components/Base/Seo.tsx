import Head from "next/head";
interface Prop {
    title: string;
}
const Seo = ({ title }: Prop) => {
    return (
        <Head>
            <title>{`${title} | URBUR`}</title>
            <meta
                name="description"
                content={
                    "한양대학교 컴퓨터소프트웨어학부 우주최강 율동패 어리버리"
                }
            />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
            <meta property="og:title" content={`${title} | URBUR` || "URBUR"} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={"https://urbur.icu"} />
            <meta property="og:image" content={"/assets/img/logo.svg"} />
            <meta property="og:article:author" content="정리습관" />
        </Head>
    );
};

export default Seo;
