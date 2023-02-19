import Seo from "@/components/Base/Seo";
import Lyrics from "@/components/Music/Lyrics";
import MusicList from "@/components/Music/MusicList";
import MusicPlayer from "@/components/Music/MusicPlayer";
import { useState } from "react";

export default function Music() {
    const [fullScreen, setFullScreen] = useState<boolean>(false);
    const toggleFullScreen = () => {
        setFullScreen((prev) => !prev);
    };
    return (
        <>
            <Seo title="Music" />

            <div className="wrapper">
                <div className="body">
                    {!fullScreen && <MusicList />}
                    <MusicPlayer
                        isFull={fullScreen}
                        setFull={toggleFullScreen}
                    />
                </div>
                <Lyrics />
            </div>

            <style jsx>
                {`
                    .wrapper {
                        width: 100%;
                        justify-content: space-around;
                        align-items: center;
                        display: flex;
                        flex-wrap: no-wrap;
                    }
                    @media (max-width: 900px) {
                        .wrapper {
                            flex-direction: column;
                        }
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
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        color: #545454;
                        height: 100%;
                    }

                    @media (max-width: 560px) {
                        .body {
                            width: 100%;
                        }
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
