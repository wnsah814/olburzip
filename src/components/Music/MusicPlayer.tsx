import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

interface Track {
    url: string;
    title: string;
    tags: string[];
}

interface Prop {
    trackList: Track[];
    current: number;
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

const MusicPlayer = ({ trackList, current }: Prop) => {
    const [query, updateQuery] = useState("");

    // let playlist = [];
    let [curTrack, setCurTrack] = useState<number>(0);
    const [audio, setAudio] = useState<any>();
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState("");
    const [length, setLength] = useState(0);
    const [time, setTime] = useState(0);
    const [slider, setSlider] = useState<any>(1);
    const [drag, setDrag] = useState(0);
    const [volume, setVolume] = useState(0.5);
    let [end, setEnd] = useState(0);
    const [shuffled, setShuffled] = useState(false);
    const [looped, setLooped] = useState(false);

    const [filter, setFilter] = useState([]);

    const fmtMSS = (s: any) => new Date(1000 * s).toISOString().substr(15, 4);

    useEffect(() => {
        const audio = new Audio(trackList[curTrack].url);
        // console.log("now audio created");
        const setAudioData = () => {
            setLength(audio.duration);
            setTime(audio.currentTime);
        };

        const setAudioTime = () => {
            const curTime = audio.currentTime;
            setTime(curTime);
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
        setTitle(trackList[curTrack].title);

        return () => {
            audio.pause();
        };
    }, []);

    // const tags = [];
    // trackList.forEach((track) => {
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
            pause();
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
        // console.log("set current", current);
        setCurTrack(current);
    }, [current]);

    useEffect(() => {
        // console.log(`curTrack changed ${curTrack}`);
        // console.log("audio", audio);
        // console.log("trackList", trackList);
        if (audio !== undefined && trackList !== undefined) {
            audio.src = trackList[curTrack].url;
            setTitle(trackList[curTrack]?.title);
            play();
        }
    }, [curTrack]);

    const previous = () => {
        // console.log("prev", (curTrack - 1) % trackList.length);

        setCurTrack(curTrack === 0 ? trackList.length - 1 : (prev) => prev - 1); //여기를 length 로 바꾸면 될듯
        // const index = playlist.indexOf(curTrack);
        // index !== 0
        //     ? setCurTrack((curTrack = playlist[index - 1]))
        //     : setCurTrack((curTrack = playlist[playlist.length - 1]));
    };

    const next = () => {
        // console.log("next");
        // const index = playlist.indexOf(curTrack);
        // console.log("playlist.length", playlist.length);
        setCurTrack(curTrack === trackList.length - 1 ? 0 : (prev) => prev + 1); //여기를 length 로 바꾸면 될듯
        // index !== playlist.length - 1
        //     ? setCurTrack((curTrack = playlist[index + 1]))
        //     : setCurTrack((curTrack = playlist[0]));
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
            const val = Math.round(audio.currentTime - 10);
            audio.currentTime = val;
        }
    };

    const forward = () => {
        if (audio !== undefined) {
            const val = Math.round(audio.currentTime + 10);
            audio.currentTime = val;
        }
    };

    // const playlistItemClickHandler = (e) => {
    //     const num = Number(e.currentTarget.getAttribute("data-key"));
    //     const index = playlist.indexOf(num);
    //     setCurTrack((curTrack = playlist[index]));
    //     play();
    // };

    // const isInitialFilter = useRef(true);
    // useEffect(() => {
    //     if (isInitialFilter.current) {
    //         isInitialFilter.current = false;
    //     } else {
    //         if (!playlist.includes(curTrack)) {
    //             setCurTrack((curTrack = playlist[0]));
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

    const notSupport = () => {
        alert("지원하지 않는 기능입니다.");
    };

    return (
        <div className="media-controls">
            <div>{title}</div>
            <div className="media-buttons">
                <button className="media-button" onClick={previous}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>

                {looped ? (
                    <button
                        className="repeat-one-button media-button"
                        onClick={loop}
                    >
                        <i className="button-icons">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
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
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
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
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
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
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
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
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                fill="#838383"
                                viewBox="0 0 16 16"
                            >
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                            </svg>
                        </i>
                        {/* <span className="button-text milli">play</span> */}
                    </button>
                )}

                <button
                    className="fast-forward-button media-button"
                    onClick={forward}
                >
                    <i className="button-icons">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
                            <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
                        </svg>
                    </i>
                </button>

                {/* <button className="skip-button media-button" label="skip">
                        <i className="fas fa-step-forward button-icons"></i>
                        <span className="button-text milli">Skip</span>
                    </button> */}
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
                        min="1"
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
                    <button
                        id="volume-button"
                        className="shuffle-button media-button"
                        onClick={notSupport}
                    >
                        <i className="button-icons">
                            <svg
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
                </div>

                <button className="media-button" onClick={next}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
            <div className="media-progress">
                <div className="progress-bar-wrapper progress">
                    <div className="progress-bar">
                        <input
                            className="slider"
                            type="range"
                            min="1"
                            max="100"
                            step="1"
                            value={slider}
                            id="myRange"
                            onChange={(e: any) => {
                                setSlider(e.target.value);
                                setDrag(e.target.value);
                            }}
                            onMouseUp={play}
                            onTouchEnd={play}
                        />
                    </div>
                </div>
                <div className="progress-time-current">
                    {`${!time ? "0:00" : fmtMSS(time)}`}
                </div>
                <div className="progress-time-total">
                    {`${!length ? "0:00" : fmtMSS(length - time)}`}
                </div>
            </div>
            <style jsx>
                {`
                    button {
                        padding: 0;
                    }

                    button:hover {
                        cursor: pointer;
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
                        margin: 1.5rem;
                        width: 35rem;
                        max-width: calc(100% - 24px * 2);
                        padding: 1.5rem;
                        position: relative;
                    }

                    @media screen and (max-width: 700px) {
                        .media-controls {
                            margin: 1.5rem 0 0 0;
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
                    }

                    #volum-wrapper {
                        display: flex;
                        flex-direction: column;
                        flex-wrap: nowrap;
                        justify-content: flex-end;
                    }

                    #volume-range {
                        position: absolute;
                        appearance: slider-vertical;
                    }

                    @media (min-width: 421px) {
                        .media-button {
                            padding: 12px;
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

                    .repeat-no-button {
                    }

                    .repeat-one-button {
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
