import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta
                    name="description"
                    content={`한양대학교 컴퓨터소프트웨어학부 우주최강 율동패 어리버리 URBUR
                        컴소의 근본있는 율동패로 율동을 배우고 공연을 준비합니다!
                        누구나 쉽게 배울수 있는 동작과 중독성있는 노래로 부담없이 즐길수 있습니다.
                        동기,선후배와 가장 가까워질수 있는 기회이니 놓치지말고 즐거운 추억 같이 만들어봐요! 
                        어-리버리 화이팅!!
                        `}
                />
                <meta
                    property="og:title"
                    content={`우주최강 율동패 어리버리`}
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={"https://urbur.icu"} />
                <meta property="og:image" content={"/assets/img/logo.svg"} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
