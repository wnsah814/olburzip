import styles from "./MusicPlayer.module.css";
const MusicPlayer = (songName) => {
    console.log("re", songName);
    return (
        <div className={styles.player}>
            <audio
                autoPlay
                className={styles.audio}
                controls
                src={`http://sjmskm.cafe24.com/urbur_songs/${songName.curSong}.mp3`}
            ></audio>
        </div>
    );
};
export default MusicPlayer;
