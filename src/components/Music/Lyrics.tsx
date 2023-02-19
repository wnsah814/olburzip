import parseLyrics from "@/api/parseLyrics";
import { tracks } from "@/store/tracks";
import { useMusicIndex } from "@/store/useMusicIndex";
import { useMusicRealTime } from "@/store/useMusicRealTime";
import { useMusicTime } from "@/store/useMusicTime";

const Lyrics = () => {
    const { musicIndex } = useMusicIndex();
    const { musicTimeObj, setMusicTime, toggleMusic } = useMusicTime();
    const { musicRealTime } = useMusicRealTime();

    const setTime = (e: any) => {
        console.log(musicTimeObj);
        setMusicTime(parseFloat(e.target.dataset.start));
        toggleMusic();
        console.log(musicTimeObj);
    };
    return (
        <>
            <div className="container">
                <div className="lyrics">
                    {musicIndex !== undefined &&
                        parseLyrics(tracks[musicIndex].lyrics).map((v, i) => (
                            <p
                                className={`lyric ${
                                    musicRealTime &&
                                    parseFloat(musicRealTime) >= v.startsAt &&
                                    parseFloat(musicRealTime) < v.endsAt
                                        ? "active"
                                        : ""
                                }`}
                                key={i}
                                data-start={v.startsAt}
                                onClick={setTime}
                            >
                                {v.content[0].content}
                            </p>
                        ))}
                </div>
            </div>
            <style jsx>
                {`
                    .container {
                        padding: 3rem;
                        width: 35rem;
                        height: 50rem;
                        background: #f2f2f2;
                        border-radius: 1rem;
                    }

                    @media (max-width: 900px) {
                        .container {
                            padding: 2rem 0;
                            height: 16rem;
                        }
                    }
                    @media (max-width: 600px) {
                        .container {
                            min-width: 100%;
                            padding: 2rem 0;
                            height: 16rem;
                        }
                    }
                    @media (max-width: 560px) {
                        .container {
                            width: 100%;
                            padding: 2rem 0;
                            height: 16rem;
                        }
                    }

                    .lyrics {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        height: 100%;
                        overflow-y: scroll;
                    }

                    .lyric {
                        color: var(--color-gray);
                        cursor: pointer;
                        font-size: 1.2rem;
                        margin-bottom: 0.5rem;
                    }

                    .active {
                        color: black;
                        font-size: 1.4rem;
                        font-weight: bold;
                    }
                    @media (max-width: 1030px) {
                        .lyric {
                            font-size: 1rem;
                        }
                    }
                    @media (max-width: 980px) {
                        .lyric {
                            font-size: 0.9rem;
                        }
                    }
                    @media (max-width: 900px) {
                        .lyric {
                            font-size: 1.2rem;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default Lyrics;
