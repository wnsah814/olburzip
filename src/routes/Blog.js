import YouTubePlayer from "components/YoutubePlyer";
import styles from "./Blog.module.css";
const Blog = () => {
    return (
        <div className={styles.wrapper}>
            <div>
                <h2>22' 공학인의 밤</h2>
                <div className={styles.video}>
                    <h3>DNA</h3>
                    <YouTubePlayer
                        src="https://www.youtube.com/embed/ZpZkFe9YHJ4"
                        title="YouTube video player"
                    ></YouTubePlayer>
                </div>
                <div className={styles.video}>
                    <h3>꿈찾기</h3>
                    <YouTubePlayer
                        src="https://www.youtube.com/embed/c_GW-Oe6BKM"
                        title="YouTube video player"
                    ></YouTubePlayer>
                </div>
                <div className={styles.video}>
                    <h3>날자</h3>
                    <YouTubePlayer
                        src="https://www.youtube.com/embed/WzK95HBXVeI"
                        title="YouTube video player"
                    ></YouTubePlayer>
                </div>
            </div>
        </div>
    );
};

export default Blog;
