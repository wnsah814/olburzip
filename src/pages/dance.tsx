import { dbService } from "@/api/fbase";
import Seo from "@/components/Base/Seo";
import PageTitle from "@/components/Common/PageTitle";
import YouTubePlayer from "@/components/Common/YoutubePlayer";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Video {
  id?: string;
  name: string;
  src: string;
}

export default function Dance() {
  const [videos, setVideos] = useState<any>([]);
  useEffect(() => {
    const q = query(
      collection(dbService, "videos"),
      orderBy("priority", "asc")
    );
    onSnapshot(q, (snapshot) => {
      const danceArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(danceArr);
    });
  }, []);
  return (
    <>
      <Seo title="Dance" />
      <div className={"container"}>
        <div>
          <PageTitle title={"율동 안무"} />
        </div>
        <div className={"videos"}>
          {videos.map((v: any, i: number) => (
            <div className={"video"} key={i}>
              <h3 data-aos="zoom-in-up" data-aos-delay="300">
                {v.name}
              </h3>
              <YouTubePlayer src={v.src} title="YouTube video player" />
            </div>
          ))}
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
