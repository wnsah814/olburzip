import { dbService } from "@/api/fbase";
import Seo from "@/components/Base/Seo";
import { useUser } from "@/store/useUser";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostEditor from "@/components/TinyMCE/PostEditor";
import Button from "@/components/Common/Button";
import { getDateWithTime } from "@/api/decodeTimeStamp";

const BlogViewer = () => {
  const router = useRouter();
  const blogId = router.query.id;

  const { data } = useUser();

  const [docSnap, setDocSnap] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<any>("");
  const [editMode, setEditMode] = useState<boolean>(false);

  const deleteThis = async () => {
    const confirmDelete = confirm("정말로 삭제하시겠습니까?");

    if (!confirmDelete) return;
    if (typeof blogId === "string") {
      await deleteDoc(doc(dbService, "blogs", blogId));
      router.push("/blog");
    }
  };

  const updateThis = async () => {
    setEditMode((prev) => !prev);
  };

  let modeObj = {
    mode: 2,
    blogId: blogId,
    title,
    content,
    toggleUpdateMode: updateThis,
  };

  useEffect(() => {
    const getBlog = async () => {
      if (typeof blogId === "string") {
        const docRef = doc(dbService, "blogs", blogId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTitle(docSnap.data().title);
          setContent(docSnap.data().content);
          setDocSnap(docSnap.data());
        }
      }
    };
    getBlog();
  }, [blogId]);

  return (
    <>
      <Seo title="Blog" />
      {editMode ? (
        <PostEditor modeObj={modeObj} />
      ) : (
        <div className={"wrapper"}>
          <div className={"header"}>
            <div className={"title"}>
              <h2>{title}</h2>
            </div>
            <div className="author">
              <p>작성자: 관리자</p>
            </div>
            <div className="date">
              <p>
                최초작성일: {docSnap && getDateWithTime(docSnap?.createdAt)}
              </p>
              <p>
                {docSnap?.lastUpdate &&
                  `최종수정일: ${getDateWithTime(docSnap?.lastUpdate)}`}
              </p>
            </div>
            {data?.isAd && (
              <div className="buttons">
                <Button
                  className={"button"}
                  onClick={() => router.push("/blog")}
                >
                  목록
                </Button>
                <Button className={"button"} onClick={deleteThis}>
                  삭제
                </Button>
                <Button className={"button"} onClick={updateThis}>
                  수정
                </Button>
              </div>
            )}
          </div>
          <div
            className={"blog_content"}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      )}

      <style jsx>
        {`
          .wrapper {
            display: flex;
            flex-direction: column;
          }

          .header {
            display: flex;
            flex-direction: column;
            height: 100%;
            line-height: 1.3rem;
            padding-bottom: 1rem;
            margin-bottom: 1rem;
            border-bottom: 2px solid #eeeeee;
            font-size: 0.85rem;
          }

          .title {
            font-size: 1.2rem;
            flex: 1;
            margin-bottom: 0.5rem;
          }

          .buttons {
            display: flex;
          }

          @media screen and (max-width: 480px) {
            .header {
              flex-direction: column;
              height: 100%;
            }

            .title {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};
export default BlogViewer;
