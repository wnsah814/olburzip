import PageTitle from "@/components/Common/PageTitle";
import YouTubePlayer from "@/components/Common/YoutubePlayer";

export default function Dance() {
    return (
        <>
            <div className={"container"}>
                <div>
                    <PageTitle title={"율동 안무"} />
                </div>
                <div className={"videos"}>
                    <div className={"video"}>
                        <h3 data-aos="zoom-in-up" data-aos-delay="300">
                            새물
                        </h3>
                        <YouTubePlayer
                            src="https://www.youtube.com/embed/9ew4ZVys4X4?rel=0"
                            title="YouTube video player"
                        />
                    </div>

                    <div className={"video"}>
                        <h3 data-aos="zoom-in-up" data-aos-delay="300">
                            꿈찾기
                        </h3>
                        <YouTubePlayer
                            src="https://www.youtube.com/embed/omDdD4lvGcU"
                            title="YouTube video player"
                        />
                    </div>

                    <div className={"video"}>
                        <h3 data-aos="zoom-in-up" data-aos-delay="300">
                            우린 하나요
                        </h3>
                        <YouTubePlayer
                            src="https://www.youtube.com/embed/72Rr-WeV8O4"
                            title="YouTube video player"
                        />
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .videos {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }

                    .video {
                        width: 45%;
                        margin-bottom: 2rem;
                        display: flex;
                        flex-direction: column;
                    }

                    .video h3 {
                        align-self: flex-start;
                        margin-bottom: 0.5rem;
                    }

                    #danceHeader {
                        padding-bottom: 0.2rem;
                        border-bottom: 5px solid var(--color-yellow);
                        display: inline-block;
                    }

                    @media screen and (max-width: 900px) {
                        .videos {
                            flex-direction: column;
                        }
                        .video {
                            width: 100%;
                        }
                    }
                `}
            </style>
        </>
    );
}
