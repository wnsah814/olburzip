// import DownloadBtn from "./DownloadBtn";
import styles from "./Song.module.css";
const Song = ({ setCurSong, songTitle, songName }) => {
    const chgSong = () => {
        console.log(songName, "으로 바꿈");
        setCurSong(songName);
    };
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {songTitle ? songTitle : "songTitle"}
            </div>
            <div className={styles.btns}>
                {songName !== "" ? (
                    <button onClick={chgSong} className={styles.playBtn}>
                        <svg
                            className={styles.playIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                        >
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                        </svg>
                    </button>
                ) : null}
            </div>
        </div>
    );
};
export default Song;
