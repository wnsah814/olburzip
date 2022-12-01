import styles from "./Dance.module.css";
// import ReactPlayer from "react-player";

const Dance = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {/* <ReactPlayer url="https://www.youtube.com/watch?v=9ew4ZVys4X4 " /> */}
                <div className={styles.video}>
                    <h3>새물</h3>
                    <iframe
                        src="https://www.youtube.com/embed/9ew4ZVys4X4?rel=0"
                        title="YouTube video player"
                        frameborder="0"
                        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>

                <div className={styles.video}>
                    <h3>꿈찾기</h3>
                    <iframe
                        src="https://www.youtube.com/embed/omDdD4lvGcU"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Dance;
