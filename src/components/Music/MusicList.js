import styles from "./MusicList.module.css";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "fbase";

import Song from "./Song";
import PageTitle from "components/Common/PageTitle";
const MusicList = ({ setCurSong }) => {
    const [storageMusics, setStorageMusics] = useState([]);
    // const getDream = () => {
    //     getDownloadURL(ref(storage, "musics/dream.mp3")).then((songName) =>
    //         console.log(songName)
    //     );
    // };
    const getMusicPath = () => {
        const musicsRef = ref(storage, "musics/");
        listAll(musicsRef)
            .then((res) => {
                res.items.forEach((item) => {
                    setStorageMusics((prev) => [item.fullPath, ...prev]);
                });
            })
            .then(getMusicUrl);
    };
    const getMusicUrl = () => {
        storageMusics.forEach((e) => {
            const musicRef = ref(storage, e);
            getDownloadURL(musicRef).then((songName) => {
                console.log(songName);
            });
        });
    };
    useEffect(() => {
        const musicsRef = ref(storage, "musics/");
        listAll(musicsRef)
            .then((res) => {
                res.items.forEach((item) => {
                    setStorageMusics((prev) => [item.fullPath, ...prev]);
                });
            })
            .then(
                // console.log("2");
                storageMusics.forEach((e) => {
                    const musicRef = ref(storage, e);
                    getDownloadURL(musicRef).then((songName) => {
                        console.log(songName);
                    });
                })
            );
    }, []);
    console.log(storageMusics);

    return (
        <>
            <PageTitle title="율동노래" />
            <div className={styles.songs}>
                <Song
                    setCurSong={setCurSong}
                    songTitle={"꿈찾기"}
                    songName="dream"
                />
                <Song
                    setCurSong={setCurSong}
                    songTitle={"우린 하나요"}
                    songName="allone"
                />
                <Song
                    setCurSong={setCurSong}
                    songTitle={"날개"}
                    songName="wings"
                />
                <Song
                    setCurSong={setCurSong}
                    songTitle={"새물"}
                    songName="newwater"
                />
                <Song
                    setCurSong={setCurSong}
                    songTitle={"우리 하나되어"}
                    songName="beone"
                />
                <Song
                    setCurSong={setCurSong}
                    songTitle={"날자2"}
                    songName="fly2"
                />
                <Song
                    setCurSong={setCurSong}
                    songTitle={"바로 지금이에요"}
                    songName="rightnow"
                />
            </div>
        </>
    );
};
export default MusicList;
