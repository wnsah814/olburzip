import Link from "next/link";

export default function Home() {
    return (
        <div className={"wrapper"}>
            <img
                data-aos="zoom-in"
                data-aos-duration="700"
                className={"logoImg"}
                src={"/assets/img/logo.svg"}
                alt="logo"
            />
            <h1 data-aos="zoom-in" data-aos-duration="700" className={"title"}>
                우주최강 율동패 어리버리
            </h1>
            <br />
            <Link
                data-aos="zoom-in"
                data-aos-duration="700"
                data-aos-delay="200"
                href="/apply"
            >
                <button className={"applyBtn"}>지원하기</button>
            </Link>
            <style jsx>
                {`
                    .wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: calc(100vh - 4rem);
                        flex-direction: column;
                    }

                    .logoImg {
                        width: 50rem;
                        /* margin-bottom: 2.5rem; */
                        animation: float 6s ease-in-out infinite;
                    }

                    .applyBtn {
                        cursor: pointer;
                        font-size: 1.5em;
                        font-weight: bold;
                        padding: 1em 2em;
                        border-radius: 0.5em;
                        background-color: #ffe15d;
                        color: #562b08;
                        border: 1px solid #f2f2f2;
                        transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                    }
                    .applyBtn:hover {
                        background-color: #562b08;
                        color: #ffe15d;
                        padding: 1em 2.5em;
                    }

                    .title {
                        text-align: center;
                        word-break: keep-all;
                    }

                    @keyframes float {
                        0% {
                            transform: translatey(0px);
                            filter: drop-shadow(0 4px 4px #aaa);
                        }
                        50% {
                            transform: translatey(-15px);
                            filter: drop-shadow(0px 15px 15px #aaa);
                        }
                        100% {
                            transform: translatey(0px);
                            filter: drop-shadow(0 4px 4px #aaa);
                        }
                    }

                    @media screen and (max-width: 700px) {
                        .logoImg {
                            width: 100%;
                        }
                    }
                `}
            </style>
        </div>
    );
}
