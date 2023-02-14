import Seo from "@/components/Base/Seo";
import MusicPlayer from "@/components/Music/MusicPlayer";
import { useState } from "react";

export interface Track {
    url: string;
    title: string;
    tags: string[];
    lyrics: string;
}

export default function Music() {
    const tracks: Track[] = [
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Fdream.mp3?alt=media&token=32424e9d-0f4f-44e8-bfd2-127fd38995ce",
            title: "꿈찾기",
            tags: ["cute"],
            lyrics: `[00:00.00]<꿈찾기>
            [00:22.00]희미하게 지워져갔지
            [00:26.00]지난날들의 꿈, 나의 어릴적
            [00:35.41]기억 속에 묻혀 사라진 내 어린 꿈들
            [00:41.50]그 소중했던 꿈 찾아 이 길을 떠나가자
            [00:49.00]하나 둘씩 잊혀져 갔지
            [00:53.50]어린시절의 꿈, 작고 키 작은
            [01:03.00]기억 속에 묻혀 사라진 내 어린 꿈들
            [01:09.00]그 소중했던 꿈 찾아 이 길을 떠나가자
            [01:18.00]어쩌면 그 꿈들도 기억 저편 어디선가
            [01:24.30]날 찾아 길을 떠나겠지 그 조그맣던 나를
            [01:32.10]하지만 찾을 수 있어 그 작고 소중한 꿈
            [01:38.00]언제나 내 기억 속에서 살며시 숨쉬고 있어
            [01:47.50]꿈을 찾아 떠나는 설레임 속에
            [01:52.00]휘파람을 불며 떠나가보자
            [01:55.30]그 어디선가 나를 기다리고 있을
            [02:01.40]다시 만나는 날에 굳게 손잡고
            [02:05.70]다른 꿈들 함께 찾아가야지
            [02:09.00]그 어디선가 나를 기다리고 있을
            [02:47.50]어쩌면 그 꿈들도 기억 저편 어디선가
            [02:53.50]날 찾아 길을 떠나겠지 그 조그맣던 나를
            [03:01.00]하지만 찾을 수 있어 그 작고 소중한 꿈
            [03:07.20]언제나 내 기억 속에서 살며시 숨쉬고 있어
            [03:16.50]꿈을 찾아 떠나는 설레임 속에
            [03:21.00]휘파람을 불며 떠나가보자
            [03:24.50]그 어디선가 나를 기다리고 있을
            [03:30.50]다시 만나는 날에 굳게 손잡고
            [03:34.80]다른 꿈들 함께 찾아가야지
            [03:38.10]그 어디선가 나를 기다리고 있을
            [03:44.40]꿈을 찾아 떠나는 설레임 속에
            [03:48.50]휘파람을 불며 떠나가보자
            [03:51.90]그 어디선가 나를 기다리고 있을
            [03:58.00]다시 만나는 날에 굳게 손잡고
            [04:02.30]다른 꿈들 함께 찾아가야지
            [04:05.80]그 어디선가 나를 기다리고 있을`,
        },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Fnewwater.mp3?alt=media&token=87c0152a-f396-4fb5-97ca-572c03f1c677",
            title: "새물",
            tags: ["cute"],
            lyrics: `[00:00.00] 제공된 가사가 없습니다
            [99:99.99]`,
        },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Fallone.mp3?alt=media&token=26afb456-683b-4532-ba46-53b17faa7a47",
            title: "우린 하나요",
            tags: ["cute"],
            lyrics: `[00:00.00] 제공된 가사가 없습니다`,
        },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Fbeone.mp3?alt=media&token=3d536ab1-2f51-428c-a557-b2d4cb9cee03",
            title: "우리 하나되어",
            tags: ["cute"],
            lyrics: `[00:00.00] 제공된 가사가 없습니다`,
        },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Ffly2.mp3?alt=media&token=bdf21aab-027b-402f-ab5a-c97d5fcd5009",
            title: "날자2",
            tags: ["cute"],
            lyrics: `[00:00.00] 제공된 가사가 없습니다`,
        },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Frightnow.mp3?alt=media&token=be4dd81e-6bba-4014-bede-8b908b67751e",
            title: "바로지금이에요",
            tags: ["cute"],
            lyrics: `[00:00.00] 제공된 가사가 없습니다`,
        },
        {
            url: "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Fwings.mp3?alt=media&token=1b20f152-5179-4782-ab8f-b23d2bb978f2",
            title: "날개",
            tags: ["cute"],
            lyrics: `[00:00.00] 제공된 가사가 없습니다`,
        },
    ];
    const [fullScreen, setFullScreen] = useState<boolean>(false);
    const toggleFullScreen = () => {
        setFullScreen((prev) => !prev);
    };
    const [curSong, setCurSong] = useState<number>(0);
    return (
        <>
            <Seo title="Music" />

            <div className="body">
                {!fullScreen && (
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
                )}
                <MusicPlayer
                    isFull={fullScreen}
                    setFull={toggleFullScreen}
                    trackList={tracks}
                    current={curSong}
                />
            </div>
            {/* <div className="right">
                    <div>
                        <p>희미하게 지워져갔지</p>
                        <p>지난날들의 꿈, 나의 어릴적</p>
                        <p>기억 속에 묻혀 사라진 내 어린 꿈들</p>
                        <p>그 소중했던 꿈 찾아 이 길을 떠나가자</p>
                        <p>하나 둘씩 잊혀져 갔지</p>
                        <p>어린시절의 꿈, 작고 키 작은</p>
                        <p>기억 속에 묻혀 사라진 내 어린 꿈들</p>
                        <p>그 소중했던 꿈 찾아 이 길을 떠나가자</p>
                        <p>어쩌면 그 꿈들도 기억 저편 어디선가</p>
                        <p>날 찾아 길을 떠나겠지 그 조그맣던 나를</p>
                        <p>하지만 찾을 수 있어 그 작고 소중한 꿈</p>
                        <p>언제나 내 기억 속에서 살며시 숨쉬고 있어</p>
                        <p>꿈을 찾아 떠나는 설레임 속에</p>
                        <p>휘파람을 불며 떠나가보자</p>
                        <p>그 어디선가 나를 기다리고 있을</p>
                        <p>다시 만나는 날에 굳게 손잡고</p>
                        <p>다른 꿈들 함께 찾아가야지</p>
                        <p>그 어디선가 나를 기다리고 있을</p>
                        <p>어쩌면 그 꿈들도 기억 저편 어디선가</p>
                        <p>날 찾아 길을 떠나겠지 그 조그맣던 나를</p>
                        <p>하지만 찾을 수 있어 그 작고 소중한 꿈</p>
                        <p>언제나 내 기억 속에서 살며시 숨쉬고 있어</p>
                        <p>꿈을 찾아 떠나는 설레임 속에</p>
                        <p>휘파람을 불며 떠나가보자</p>
                        <p>그 어디선가 나를 기다리고 있을</p>
                        <p>다시 만나는 날에 굳게 손잡고</p>
                        <p>다른 꿈들 함께 찾아가야지</p>
                        <p>그 어디선가 나를 기다리고 있을</p>
                        <p>꿈을 찾아 떠나는 설레임 속에</p>
                        <p>휘파람을 불며 떠나가보자</p>
                        <p>그 어디선가 나를 기다리고 있을</p>
                        <p>다시 만나는 날에 굳게 손잡고</p>
                        <p>다른 꿈들 함께 찾아가야지</p>
                        <p>그 어디선가 나를 기다리고 있을</p>
                    </div>
                </div> */}

            <style jsx>
                {`
                    .wrapper {
                        display: flex;
                    }

                    .right {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 3rem;
                         {
                            /* flex: 1; */
                        }
                        height: 100%;
                        background: #f2f2f2;
                        border-radius: 1rem;
                    }

                    .lyrics-line {
                        color: var(--color-gray);
                        margin-bottom: 0.7rem;
                        font-size: 1.2rem;
                    }

                    .lyrics-line-active {
                        color: black;
                        font-weight: bold;
                    }

                    .body {
                        flex: 2;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: #545454;
                        height: calc(100vh - 5rem);
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
