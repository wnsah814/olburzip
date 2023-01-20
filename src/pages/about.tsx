import PageTitle from "@/components/Common/PageTitle";
import YouTubePlayer from "@/components/Common/YoutubePlayer";
import { useUser } from "@/store/useUser";
import { NextPage } from "next";

const About: NextPage = () => {
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
