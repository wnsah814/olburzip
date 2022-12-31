import styles from "./YoutubePlayer.module.css";
const YouTubePlayer = ({ src, title }) => {
    return (
        <iframe
            className={styles.player}
            src={src}
            title={title}
            frameBorder="0"
            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
};

export default YouTubePlayer;
