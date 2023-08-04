import { dbService } from "@/api/fbase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import Button from "../Common/Button";

const VideosDB = () => {
  const titleRef = useRef<any>();
  const srcRef = useRef<any>();
  const priorityRef = useRef<any>();

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

  const addDance = async () => {
    const danceObj = {
      name: titleRef.current.value,
      src: srcRef.current.value,
      priority: priorityRef.current.value,
    };
    const data = addDoc(collection(dbService, "videos"), danceObj);
    alert("성공적으로 추가하였습니다.");
    titleRef.current.value = "";
    srcRef.current.value = "";
    priorityRef.current.value = "";
  };

  const deleteDance = async (e: any) => {
    console.log(e.target.dataset.id);
    await deleteDoc(doc(dbService, "videos", e.target.dataset.id));
  };
  return (
    <div>
      <h3>영상 DB</h3>
      <div>
        <input ref={titleRef} type={"text"} placeholder="노래 제목" />
        <input ref={srcRef} type={"text"} placeholder="노래 주소" />
        <input ref={priorityRef} type={"number"} placeholder="우선순위" />
        <Button onClick={addDance}> 추가</Button>
      </div>
      <div>
        {videos.map((v: any, i: number) => (
          <div className="video" key={i}>
            <div>
              <button onClick={deleteDance} data-id={v.id}>
                X
              </button>
            </div>
            <div>{v.name}</div>
            {/* <div>{v.src}</div>
                        <div>{v.priority}</div> */}
          </div>
        ))}
      </div>
      <style jsx>
        {`
          input {
            padding: 0.5rem;
          }

          .video {
            display: flex;
            height: 100%;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export default VideosDB;
