import PageTitle from "components/Common/PageTitle";
import YouTubePlayer from "components/YoutubePlayer";
import styles from "./About.module.css";

const About = () => {
    return (
        <>
            <PageTitle title={"어리버리란?"} />
            <YouTubePlayer
                src="https://www.youtube.com/embed/PM7oUMnG5ZY"
                title="YouTube video player"
            ></YouTubePlayer>
        </>
    );
};

export default About;
