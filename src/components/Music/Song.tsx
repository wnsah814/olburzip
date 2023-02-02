type prop = {
    setCurSong: any;
    songTitle: string;
    songName: string;
};

const Song = ({ setCurSong, songTitle, songName }: prop) => {
    const chgSong = () => {
        console.log(songName, "으로 바꿈");
        setCurSong(songName);
    };
    return (
        <div
            data-aos="fade-in"
            data-aos-duration="1200"
            className={"container"}
        >
            <div className={"title"}>{songTitle ? songTitle : "songTitle"}</div>
            <div className={"btns"}>
                {songName !== "" ? (
                    <button onClick={chgSong} className={"playBtn"}>
                        <svg
                            className={"playIcon"}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                        >
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                        </svg>
                    </button>
                ) : null}
            </div>
            <style jsx>
                {`
                    .container {
                        box-shadow: 2px 2px 4px #aaa;
                        display: flex;
                        flex-direction: column;
                        width: 12rem;
                        height: 12rem;
                        margin: 0 1rem 1rem 0;
                        border-radius: 0.5rem;
                        background-color: var(--color-yellow);
                        padding: 1rem;
                    }

                    .title {
                        color: var(--color-brown);
                        font-weight: bold;
                        font-size: 1.2rem;
                        text-align: center;
                    }

                    .btns {
                        display: flex;
                        height: 100%;
                        justify-content: center;
                        align-items: center;
                    }

                    .playBtn {
                        border: none;
                        background-color: inherit;
                    }

                    .playIcon {
                        filter: drop-shadow(0 0 5px #aaa);
                        cursor: pointer;
                        fill: var(--color-white);
                        width: 5rem;
                        height: 5rem;
                    }

                    @media screen and (max-width: 480px) {
                        .container {
                            width: 100%;
                            height: 4rem;
                            padding: 0;
                            flex-direction: row;
                        }

                        .title {
                            flex: 4;
                            margin-left: 1rem;
                            font-size: 1rem;
                            text-align: left;
                            line-height: 4rem;
                        }

                        .btns {
                            flex: 1;
                        }

                        .playIcon {
                            filter: none;
                            width: 1.8rem;
                            height: 1.8rem;
                        }
                    }
                `}
            </style>
        </div>
    );
};
export default Song;
