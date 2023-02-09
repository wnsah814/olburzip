import Seo from "@/components/Base/Seo";
import MusicPlayer from "@/components/Music/MusicPlayer";
import styles from "@/styles/Music.module.css";
import { useState } from "react";

interface Track {
    url: string;
    title: string;
    tags: string[];
}

export default function Music() {
    const tracks: Track[] = [
        // {
        //     url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2FNewJeans%20OMG.mp3?alt=media&token=6ec60529-14bd-4cbf-a554-a11996b3a63c",
        //     title: "OMG",
        //     tags: ["New Jeans"],
        // },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Fdream.mp3?alt=media&token=32424e9d-0f4f-44e8-bfd2-127fd38995ce",
            title: "꿈찾기",
            tags: ["cute"],
        },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Fnewwater.mp3?alt=media&token=87c0152a-f396-4fb5-97ca-572c03f1c677",
            title: "새물",
            tags: ["cute"],
        },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Fallone.mp3?alt=media&token=26afb456-683b-4532-ba46-53b17faa7a47",
            title: "우린 하나요",
            tags: ["cute"],
        },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Fbeone.mp3?alt=media&token=3d536ab1-2f51-428c-a557-b2d4cb9cee03",
            title: "우리 하나되어",
            tags: ["cute"],
        },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Ffly2.mp3?alt=media&token=bdf21aab-027b-402f-ab5a-c97d5fcd5009",
            title: "날자2",
            tags: ["cute"],
        },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Frightnow.mp3?alt=media&token=be4dd81e-6bba-4014-bede-8b908b67751e",
            title: "바로지금이에요",
            tags: ["cute"],
        },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Fwings.mp3?alt=media&token=1b20f152-5179-4782-ab8f-b23d2bb978f2",
            title: "날개",
            tags: ["cute"],
        },
    ];
    const [curSong, setCurSong] = useState<number>(0);
    return (
        <>
            <Seo title="Music" />

            {/* <MusicList setCurSong={setCurSong} />
            <MusicPlayer curSong={curSong} /> */}
            <div className="body">
                <div className="media-list">
                    {/* <div className="honeycomb">OMG</div> */}
                    <div className="honeycombs">
                        <div
                            onClick={() => setCurSong(0)}
                            className="honeycomb"
                        >
                            {tracks[0].title}
                        </div>
                        <div
                            onClick={() => setCurSong(1)}
                            className="honeycomb"
                        >
                            {tracks[1].title}
                        </div>
                    </div>
                    <div className="honeycombs">
                        <div
                            onClick={() => setCurSong(2)}
                            className="honeycomb"
                        >
                            {tracks[2].title}
                        </div>
                        <div
                            onClick={() => setCurSong(3)}
                            className="honeycomb"
                        >
                            {tracks[3].title}
                        </div>
                        <div
                            onClick={() => setCurSong(4)}
                            className="honeycomb"
                        >
                            {tracks[4].title}
                        </div>
                    </div>
                    <div className="honeycombs">
                        <div
                            onClick={() => setCurSong(5)}
                            className="honeycomb"
                        >
                            {tracks[5].title}
                        </div>
                        <div
                            onClick={() => setCurSong(6)}
                            className="honeycomb"
                        >
                            {tracks[6].title}
                        </div>
                    </div>
                    {/* {tracks.map((v, i) => (
                        <div key={i} className="honeycomb">
                            {v.title}
                        </div>
                    ))} */}
                </div>
                <MusicPlayer trackList={tracks} current={curSong} />
            </div>

            <style jsx>
                {`
                    .body {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: #545454;
                        position: relative;
                        height: calc(100vh - 4rem);
                    }

                    .media-list {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 100%;
                        flex-wrap: wrap;
                    }

                    .honeycombs {
                        display: flex;
                        flex-direction: row;
                    }

                    .honeycomb {
                        outline: none;
                        cursor: pointer;
                        margin: 30px 8px 8px 0;
                        width: 104px;
                        height: 60px;
                        background-color: var(--color-yellow);
                        border-color: var(--color-yellow);
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .honeycomb:before {
                        content: " ";
                        width: 0;
                        height: 0;
                        border-bottom: 30px solid;
                        border-color: inherit;
                        border-left: 52px solid transparent;
                        border-right: 52px solid transparent;
                        position: absolute;
                        top: -30px;
                        left: 0;
                    }

                    .honeycomb:after {
                        content: "";
                        width: 0;
                        position: absolute;
                        bottom: -30px;
                        left: 0;
                        border-top: 30px solid;
                        border-color: inherit;
                        border-left: 52px solid transparent;
                        border-right: 52px solid transparent;
                        filter: drop-shadow(0 3px 1px var(--color-brown));
                    }

                    .media-song {
                        width: 100%;
                        padding: 1rem;
                        text-align: center;
                        background: #fffaee;
                    }
                `}
            </style>
        </>
    );
}
