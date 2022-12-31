import YouTubePlayer from "components/YoutubePlayer";
import styles from "./About.module.css";
const About = () => {
    return (
        <>
            <h2>어리버리란?</h2>
            <YouTubePlayer
                src="https://www.youtube.com/embed/PM7oUMnG5ZY"
                title="YouTube video player"
            ></YouTubePlayer>
        </>
    );
};

export default About;
