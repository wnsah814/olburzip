import parseLyrics from "@/api/parseLyrics";
import { tracks } from "@/store/tracks";
import { useMusicIndex } from "@/store/useMusicIndex";
import { useMusicTime } from "@/store/useMusicTime";

const Lyrics = () => {
    const { musicIndex } = useMusicIndex();
    const { setMusicTime } = useMusicTime();
    const setTime = (e: any) => {
        setMusicTime(e.target.dataset.start);
    };
    return (
        <>
            <div className="container">
                <div className="lyrics">
                    {musicIndex !== undefined &&
                        parseLyrics(tracks[musicIndex].lyrics).map((v, i) => (
                            <p
                                className="lyric"
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
                    .lyrics {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        height: 100%;
                        overflow-y: scroll;
                    }

                    .lyric {
                        cursor: pointer;
                        font-size: 1.2rem;
                        margin-bottom: 0.5rem;
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
                    @media (max-width: 955px) {
                        .lyric {
                            font-size: 0.8rem;
                        }
                    }
                    @media (max-width: 800px) {
                        .container {
                            display: none;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default Lyrics;
