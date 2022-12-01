import styles from "./Music.module.css";
import MusicList from "components/Music/MusicList";
import MusicPlayer from "components/Music/MusicPlayer";
// import MusicUpload from "components/Music/MusicUpload";
import { useState } from "react";

const Music = () => {
    const [curSong, setCurSong] = useState("");
    return (
        <div>
            {/* <div className={styles.container}>
                <MusicUpload />
            </div> */}
            <MusicList setCurSong={setCurSong} />
            <div>
                <MusicPlayer curSong={curSong} />
            </div>
            {/* <a
                download
                href="https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/musics%2Fallone.mp3?alt=media&token=26afb456-683b-4532-ba46-53b17faa7a47"
            >
                dreeam
            </a> */}
        </div>
    );
};
export default Music;
