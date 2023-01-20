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
        <div className={"container"}>
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
                        display: flex;
                        flex-direction: column;
                        width: 10rem;
                        height: 10rem;
                        margin-right: 0.5rem;
                        margin-bottom: 0.5rem;
                        border-radius: 0.5rem;
                        background-color: #fff6bf;
                        padding: 1rem;
                    }

                    .title {
                        font-size: 1.1rem;
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
                        background-color: #fff6bf;
                    }

                    .playIcon {
                        cursor: pointer;
                        fill: #f49d1a;
                        width: 3rem;
                        height: 3rem;
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
                            width: 1rem;
                            height: 1rem;
                        }
                    }
                `}
            </style>
        </div>
    );
};
export default Song;
