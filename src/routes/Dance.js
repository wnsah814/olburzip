import PageTitle from "components/Common/PageTitle";
import YouTubePlayer from "components/YoutubePlayer";
import styles from "./Dance.module.css";
// import ReactPlayer from "react-player";

const Dance = () => {
    return (
        <>
            <div className={styles.container}>
                <div>
                    <PageTitle title={"율동 안무"} />
                </div>
                <div className={styles.videos}>
                    <div className={styles.video}>
                        <h3>새물</h3>
                        <YouTubePlayer
                            src="https://www.youtube.com/embed/9ew4ZVys4X4?rel=0"
                            title="YouTube video player"
                        />
                    </div>

                    <div className={styles.video}>
                        <h3>꿈찾기</h3>
                        <YouTubePlayer
                            src="https://www.youtube.com/embed/omDdD4lvGcU"
                            title="YouTube video player"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dance;
