import styles from "./About.module.css";
const About = () => {
    return (
        <div className={styles.wrapper}>
            <div>
                <h3>어리버리란?</h3>
                <iframe
                    className={styles.youtube}
                    src="https://www.youtube.com/embed/PM7oUMnG5ZY"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    );
};

export default About;
