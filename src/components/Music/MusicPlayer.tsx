import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import parseLyrics from "@/api/parseLyrics";
import { tracks } from "@/store/tracks";
import { useMusicIndex } from "@/store/useMusicIndex";
import { useMusicTime } from "@/store/useMusicTime";
import { useMusicRealTime } from "@/store/useMusicRealTime";

interface Prop {
    isFull: boolean;
    setFull: any;
    includeTags?: boolean;
    includeSearch?: boolean;
    showPlaylist?: boolean;
    autoPlayNextTrack?: boolean;
}

// let includeTags = false;
// let includeSearch = true;
let showPlaylist = false;
let autoPlay = false; // 처음 접속 했을 때 재생되는가, 근데 아래보니 방지한거 같기도 함
let autoPlayNextTrack = false;

const MusicPlayer = ({ isFull, setFull }: Prop) => {
    const { musicIndex, isLoading, setMusicIndex } = useMusicIndex();
    const { musicTimeObj } = useMusicTime();
    const { musicRealTime, setMusicRealTime } = useMusicRealTime();
    // const [query, updateQuery] = useState("");
    // let playlist = [];
    const [audio, setAudio] = useState<any>();
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState("");
    const [length, setLength] = useState(0);
    // const [time, setTime] = useState<number>(0);
    const [slider, setSlider] = useState<any>(1);
    const [drag, setDrag] = useState(0);
    const [volume, setVolume] = useState(0.8);
    let [end, setEnd] = useState(0);
    const [shuffled, setShuffled] = useState(false);
    const [looped, setLooped] = useState(false);

    const [filter, setFilter] = useState([]);

    const [lyList, setLyList] = useState<any>();
    const [curLy, setCurLy] = useState<string>("");

    const fmtMSS = (s: any) => new Date(1000 * s).toISOString().substr(15, 4);
    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (musicIndex === undefined) {
            alert("문제가 발생하였습니다.");
            return;
        }
        const audio = new Audio(tracks[musicIndex].url);
        const setAudioData = () => {
            setLength(audio.duration);
            setMusicRealTime(String(audio.currentTime));
        };

        const setAudioTime = () => {
            const curTime = audio.currentTime;
            setMusicRealTime(String(curTime));
            setSlider(
                curTime ? ((curTime * 100) / audio.duration).toFixed(1) : 0
            );
        };

        const setAudioVolume = () => setVolume(audio.volume);

        const setAudioEnd = () => setEnd((prev) => prev + 1);

        audio.addEventListener("loadeddata", setAudioData);
        audio.addEventListener("timeupdate", setAudioTime);
        audio.addEventListener("volumechange", setAudioVolume);
        audio.addEventListener("ended", setAudioEnd);

        setAudio(audio);
        setTitle(tracks[musicIndex].title);

        return () => {
            audio.pause();
        };
    }, [isLoading]);

    // const tags = [];
    // tracks.forEach((track) => {
    //     track.tags.forEach((tag) => {
    //         if (!tags.includes(tag)) {
    //             tags.push(tag);
    //         }
    //     });
    // });

    const shufflePlaylist: any = (arr: any) => {
        if (arr.length === 1) return arr;
        const rand = Math.floor(Math.random() * arr.length);
        return [
            arr[rand],
            ...shufflePlaylist(arr.filter((_: any, i: number) => i != rand)),
        ];
    };

    const isInitialMount = useRef<boolean>(false);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            // if (shuffled) {
            //     playlist = shufflePlaylist(playlist);
            // }

            if (looped) {
                play();
            } else {
                setActive(false);
            }
            return;
        }
    }, [end]);

    useEffect(() => {
        if (audio !== undefined) {
            audio.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audio !== undefined) {
            // pause();
            const val = Math.round((drag * audio.duration) / 100);
            audio.currentTime = val;
        }
    }, [drag]);

    const play = () => {
        if (audio === undefined) return;
        setActive(true);
        audio.play();
    };

    const pause = () => {
        if (audio === undefined) return;
        setActive(false);
        audio.pause();
    };

    const loop = () => {
        // if (looped) {
        //     alert("반복모드가 해제되었습니다");
        // } else {
        //     alert("반복모드가 설정되었습니다");
        // }
        setLooped((prev) => !prev);
    };

    useEffect(() => {
        if (
            audio !== undefined &&
            tracks !== undefined &&
            musicIndex !== undefined
        ) {
            audio.src = tracks[musicIndex].url;
            setTitle(tracks[musicIndex]?.title);
            play();
        }
    }, [musicIndex]);

    const previous = () => {
        if (musicIndex === undefined) return;
        setMusicIndex(musicIndex === 0 ? tracks.length - 1 : musicIndex - 1); //여기를 length 로 바꾸면 될듯
        // const index = playlist.indexOf(musicIndex);
        // index !== 0
        //     ? setMusicIndex((musicIndex = playlist[index - 1]))
        //     : setMusicIndex((musicIndex = playlist[playlist.length - 1]));
    };

    const next = () => {
        // const index = playlist.indexOf(musicIndex);
        if (musicIndex === undefined) return;
        setMusicIndex(musicIndex === tracks.length - 1 ? 0 : musicIndex + 1); //여기를 length 로 바꾸면 될듯
        // index !== playlist.length - 1
        //     ? setMusicIndex((musicIndex = playlist[index + 1]))
        //     : setMusicIndex((musicIndex = playlist[0]));
    };

    const shuffle = () => {
        if (shuffled) {
            alert("셔플모드가 해제되었습니다");
        } else {
            alert("셔플모드가 설정되었습니다");
        }
        setShuffled((prev) => !prev);
    };

    const backward = () => {
        if (audio !== undefined) {
            const val = Math.round(audio.currentTime - 5);
            audio.currentTime = val;
        }
    };

    const forward = () => {
        if (audio !== undefined) {
            const val = Math.round(audio.currentTime + 5);
            audio.currentTime = val;
        }
    };

    useEffect(() => {
        console.log("index changed");
        if (musicIndex === undefined) return;
        if (typeof tracks[musicIndex].lyrics === "string") {
            const lys = parseLyrics(tracks[musicIndex].lyrics);
            setLyList(lys);
        }
    }, [musicIndex]);

    // const playlistItemClickHandler = (e) => {
    //     const num = Number(e.currentTarget.getAttribute("data-key"));
    //     const index = playlist.indexOf(num);
    //     setMusicIndex((musicIndex = playlist[index]));
    //     play();
    // };

    // const isInitialFilter = useRef(true);
    // useEffect(() => {
    //     if (isInitialFilter.current) {
    //         isInitialFilter.current = false;
    //     } else {
    //         if (!playlist.includes(musicIndex)) {
    //             setMusicIndex((musicIndex = playlist[0]));
    //         }
    //     }
    // }, [filter]);

    // const tagClickHandler = (e) => {
    //     const tag = e.currentTarget.innerHTML;
    //     if (!filter.includes(tag)) {
    //         setFilter([...filter, tag]);
    //     } else {
    //         const filteredArray = filter.filter((item) => item !== tag);
    //         setFilter([...filteredArray]);
    //     }
    // };

    useEffect(() => {
        const curTime = audio?.currentTime;
        if (typeof lyList === "undefined") return;

        for (let i = 0; i < lyList.length; ++i) {
            if (curTime >= lyList[i].startsAt && curTime < lyList[i].endsAt) {
                setCurLy(lyList[i].content[0]?.content);
                return;
            }
        }
    }, [musicRealTime]);

    useEffect(() => {
        console.log("changed");
        if (musicTimeObj === undefined || audio === undefined) return;
        audio.currentTime = musicTimeObj.musicTime;
    }, [musicTimeObj]);

    const checkPlaying = () => {
        if (active) {
            play();
        }
    };

    return (
        <div className="media-controls">
            <div className="media-fullArea">
                <button className="full-btn" onClick={setFull}>
                    {isFull ? (
                        <i>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z" />
                            </svg>
                        </i>
                    ) : (
                        <i>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
                            </svg>
                        </i>
                    )}
                </button>
            </div>
            <div className="media-top">
                <button className="media-button" onClick={previous}>
                    <FontAwesomeIcon
                        style={{ color: "#131212" }}
                        icon={faAngleLeft}
                    />
                </button>
                <div>{title}</div>
                <button className="media-button" onClick={next}>
                    <FontAwesomeIcon
                        style={{ color: "#131212" }}
                        icon={faAngleRight}
                    />
                </button>
            </div>
            <div className="media-buttons">
                {looped ? (
                    <button
                        className="repeat-one-button media-button"
                        onClick={loop}
                    >
                        <i className="button-icons">
                            <svg
                                className="button-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11 4v1.466a.25.25 0 0 0 .41.192l2.36-1.966a.25.25 0 0 0 0-.384l-2.36-1.966a.25.25 0 0 0-.41.192V3H5a5 5 0 0 0-4.48 7.223.5.5 0 0 0 .896-.446A4 4 0 0 1 5 4h6Zm4.48 1.777a.5.5 0 0 0-.896.446A4 4 0 0 1 11 12H5.001v-1.466a.25.25 0 0 0-.41-.192l-2.36 1.966a.25.25 0 0 0 0 .384l2.36 1.966a.25.25 0 0 0 .41-.192V13h6a5 5 0 0 0 4.48-7.223Z" />
                                <path d="M9 5.5a.5.5 0 0 0-.854-.354l-1.75 1.75a.5.5 0 1 0 .708.708L8 6.707V10.5a.5.5 0 0 0 1 0v-5Z" />
                            </svg>
                        </i>
                    </button>
                ) : (
                    <button
                        className="repeat-no-button media-button"
                        onClick={loop}
                    >
                        <i className="button-icons">
                            <svg
                                className="button-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
                            </svg>
                        </i>
                    </button>
                )}

                <button
                    className="rewind-button media-button"
                    onClick={backward}
                >
                    <i className="button-icons">
                        <svg
                            className="button-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8.404 7.304a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L8.404 7.304Z" />
                            <path d="M.404 7.304a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L.404 7.304Z" />
                        </svg>
                    </i>
                </button>
                {active ? (
                    <button
                        className="play-button media-button"
                        onClick={pause}
                    >
                        <i className="button-icons">
                            <svg
                                className="button-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                            </svg>
                        </i>
                        {/* <span className="button-text milli">pause</span> */}
                    </button>
                ) : (
                    <button className="play-button media-button" onClick={play}>
                        <i className="button-icons">
                            <svg
                                className="button-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#838383"
                                viewBox="0 0 16 16"
                            >
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                            </svg>
                        </i>
                    </button>
                )}

                <button
                    className="fast-forward-button media-button"
                    onClick={forward}
                >
                    <i className="button-icons">
                        <svg
                            className="button-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
                            <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
                        </svg>
                    </i>
                </button>

                <div
                    id="volum-wrapper"
                    onMouseEnter={() => {
                        document.querySelector<any>(
                            "#volume-range"
                        ).style.visibility = "visible";
                    }}
                    onMouseLeave={() => {
                        document.querySelector<any>(
                            "#volume-range"
                        ).style.visibility = "hidden";
                    }}
                >
                    <input
                        id="volume-range"
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="80"
                        onChange={(e: any) => {
                            setVolume(e.target.value / 100);
                        }}
                        style={
                            // ({
                            //     background: `linear-gradient(90deg, #fdd25f ${
                            //         volume * 100
                            //     }%, #ff6b00 ${volume * 100}%)`,
                            // },
                            {
                                visibility: "hidden",
                            }
                        }
                    />
                    {volume === 0 ? (
                        <button
                            id="volume-button"
                            className="shuffle-button media-button"
                        >
                            <i className="button-icons">
                                <svg
                                    className="button-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
                                </svg>
                            </i>
                        </button>
                    ) : (
                        <button
                            id="volume-button"
                            className="shuffle-button media-button"
                        >
                            <i className="button-icons">
                                <svg
                                    className="button-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
                                    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
                                    <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z" />
                                </svg>
                            </i>
                        </button>
                    )}
                </div>
            </div>
            <div className="media-lyrics">{curLy}</div>
            <div className="media-progress">
                <div className="progress-bar-wrapper progress">
                    <div className="progress-bar">
                        <input
                            className="slider"
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={slider}
                            id="myRange"
                            onChange={(e: any) => {
                                setSlider(e.target.value);
                                setDrag(e.target.value);
                            }}
                            onMouseUp={checkPlaying}
                            onTouchEnd={checkPlaying}
                        />
                    </div>
                </div>
                <div className="progress-time-current">
                    {`${
                        musicRealTime === undefined
                            ? "0:00"
                            : fmtMSS(musicRealTime)
                    }`}
                </div>
                <div className="progress-time-total">
                    {`${!length ? "0:00" : fmtMSS(length)}`}
                </div>
            </div>
            <style jsx>
                {`
                    button {
                        padding: 0;
                        outline: none;
                    }

                    button:hover {
                        cursor: pointer;
                    }

                    svg {
                        background-color: transparent;
                        color: #919191;
                    }
                    .media-fullArea {
                        align-self: flex-end;
                    }
                    .full-btn {
                        outline: none;
                        border: none;
                        background-color: inherit;
                    }
                    .media-lyrics {
                        animation: fadein 3s;
                        margin-top: 0.7rem;
                        min-height: 1.5rem;
                    }

                    @keyframes fadein {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
                    .media-controls {
                        align-items: center;
                        background: #fffaee;
                        border: 1px solid #fff3eb;
                        border-radius: 24px;
                        color: #565656;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        margin: 1.5rem 0 1rem 0;
                        width: 35rem;
                        max-width: calc(100% - 24px * 2);
                        padding: 1.5rem;
                        position: relative;
                    }

                    @media screen and (max-width: 600px) {
                        .media-controls {
                            min-width: 100%;
                        }
                    }

                    .media-controls:after {
                        border-radius: 24px;
                        box-shadow: 0 2px 2px rgba(255, 107, 0, 0.25),
                            0 4px 4px rgba(255, 107, 0, 0.2),
                            0 8px 8px rgba(255, 107, 0, 0.15),
                            0 16px 16px rgba(255, 107, 0, 0.1),
                            0 24px 24px rgba(255, 107, 0, 0.05);
                        content: "";
                        height: 100%;
                        left: 0;
                        mix-blend-mode: multiply;
                        position: absolute;
                        top: 0;
                        width: 100%;
                        z-index: -1;
                    }

                    .media-top {
                        display: flex;
                        flex-wrap: nowrap;
                        justify-content: space-evenly;
                        align-items: center;
                        width: 100%;
                    }

                    @media screen and (max-width: 600px) {
                        .media-top {
                            margin-bottom: 0.8rem;
                        }
                    }

                    .media-buttons {
                        display: flex;
                        flex-wrap: nowrap;
                    }

                    .media-button {
                        background-color: transparent;
                        border: none;
                        align-items: center;
                        border-radius: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        text-align: center;
                        padding: 12px;
                    }

                    #volum-wrapper {
                        display: flex;
                        flex-direction: column;
                        flex-wrap: nowrap;
                        justify-content: flex-end;
                    }

                    #volume-range {
                        width: 4.5rem;
                        height: 6rem;
                        bottom: 11rem;
                        position: absolute;
                        appearance: slider-vertical;
                    }

                    @media (max-width: 600px) {
                        .media-button {
                            padding: 4px;
                        }
                        #volume-range {
                            width: 4rem;
                            bottom: 10.5rem;
                        }
                    }

                    .button-icons {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #ffc399;
                        border-radius: 100%;
                        margin-bottom: 4px;
                        margin-top: auto;
                        padding: 16px;
                    }

                    .button-1 {
                        width: 3em;
                        height: 3em;
                    }

                    .button-2 {
                        width: 2em;
                        height: 2em;
                    }

                    .button-3 {
                        width: 1.5em;
                        height: 1.5em;
                    }

                    @media screen and (max-width: 400px) {
                        .button-1 {
                            width: 2.5em;
                            height: 2.5em;
                        }
                        .button-2 {
                            width: 1.5em;
                            height: 1.5em;
                        }
                        .button-3 {
                            width: 1.5em;
                            height: 1.5em;
                        }
                    }

                    .shuffle-button .button-icons,
                    .repeat-one-button .button-icons,
                    .repeat-no-button .button-icons {
                        background-color: transparent;
                        color: #919191;
                    }

                    .rewind-button .button-icons,
                    .fast-forward-button .button-icons {
                        background: linear-gradient(
                            to bottom left,
                            #fff8e7,
                            #ffe1cc
                        );

                        color: #838383;
                    }

                    .play-button .button-icons {
                        background: linear-gradient(
                            to bottom left,
                            #ffffff,
                            #fff8e7
                        );
                        border: 1px solid #fff3eb;
                        box-shadow: -1px 1px 1px rgba(255, 195, 153, 0.25),
                            1px -1px 1px rgba(255, 255, 255, 0.25),
                            -2px 2px 2px rgba(255, 195, 153, 0.2),
                            2px -2px 2px rgba(255, 255, 255, 0.2),
                            -4px 4px 4px rgba(255, 195, 153, 0.15),
                            4px -4px 4px rgba(255, 255, 255, 0.15),
                            -8px 8px 8px rgba(255, 195, 153, 0.1),
                            8px -8px 8px rgba(255, 255, 255, 0.1),
                            -16px 16px 16px rgba(255, 195, 153, 0.05),
                            16px -16px 16px rgba(255, 255, 255, 0.05);
                        color: #f26600;
                        fill: #f26600;
                        margin-bottom: 8px;
                        padding: 24px;
                    }

                    .media-progress {
                        align-self: stretch;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }

                    .progress-bar-wrapper {
                        background-color: transparent;
                        border-radius: 12px;
                        box-shadow: inset -1px 1px 1px rgba(255, 195, 153, 0.25),
                            inset 1px -1px 1px rgba(255, 255, 255, 0.25),
                            inset -2px 2px 2px rgba(255, 195, 153, 0.2),
                            inset 2px -2px 2px rgba(255, 255, 255, 0.2),
                            inset -4px 4px 4px rgba(255, 195, 153, 0.15),
                            inset 4px -4px 4px rgba(255, 255, 255, 0.15),
                            inset -8px 8px 8px rgba(255, 195, 153, 0.1),
                            inset 8px -8px 8px rgba(255, 255, 255, 0.1),
                            inset -16px 16px 16px rgba(255, 195, 153, 0.05),
                            inset 16px -16px 16px rgba(255, 255, 255, 0.05);
                        height: 12px;
                        margin-bottom: 8px;
                        margin-top: 24px;
                        position: relative;
                        width: 100%;
                    }

                     {
                        /* .progress-bar {
                        background: linear-gradient(to right, #fdd25f, #ff6b00);
                        border-radius: 12px;
                        box-shadow: none;
                        height: 12px;
                    } */
                    }
                    .slider {
                        -webkit-appearance: none;
                        background: linear-gradient(to right, #fdd25f, #ff6b00);
                        border-radius: 12px;
                        box-shadow: none;
                        width: 100%;
                        border-radius: 5px;
                        outline: none;
                        opacity: 1;
                        -webkit-transition: 0.2s;
                        transition: opacity 0.2s;
                    }

                    .slider:hover {
                        cursor: pointer;
                    }
                `}
            </style>
        </div>
    );
};
export default MusicPlayer;
