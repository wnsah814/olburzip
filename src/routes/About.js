import YouTubePlayer from "components/YoutubePlyer";
import styles from "./About.module.css";
const About = () => {
    return (
        <div className={styles.wrapper}>
            <div>
                <h3>어리버리란?</h3>
                <YouTubePlayer
                    src="https://www.youtube.com/embed/PM7oUMnG5ZY"
                    title="YouTube video player"
                ></YouTubePlayer>
            </div>
        </div>
    );
};

export default About;
