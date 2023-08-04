import styles from "@/styles/Blog.module.css";
import { dbService } from "@/api/fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CommonProp } from "@/components/Layout";
import { useUser } from "@/store/useUser";
import Button from "@/components/Common/Button";
import PageTitle from "@/components/Common/PageTitle";
import Seo from "@/components/Base/Seo";
import { getDate } from "@/api/decodeTimeStamp";

export default function Blog({ userObj }: CommonProp) {
  const { data } = useUser();

  const [blogs, setBlogs] = useState<any>([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "blogs"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const blogArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogArr);
    });
  }, []);

  return (
    <>
      <Seo title="Blog" />

      <div className={styles.header_wrapper}>
        <PageTitle title={"URB_log"} />
      </div>
      {data?.isAd && (
        <Link href={"/blog/new"}>
          <Button>글쓰기</Button>
        </Link>
      )}

      <div data-aos="fade-in" data-aos-duration="600" className={styles.blogs}>
        <div className={[styles.blog, styles.center, styles.head].join(" ")}>
          <span className={styles.blog_id}></span>
          <span className={styles.blog_title}>제목</span>
          <span className={styles.blog_author}>작성자</span>
          <span className={styles.blog_date}>작성일</span>
        </div>
        {blogs.map((v: any, i: number) => (
          <Link key={i} href={`/blog/${v.id}`}>
            <div key={i} className={styles.blog}>
              <span className={[styles.blog_id, styles.center].join(" ")}>
                {blogs.length - i - 1}
              </span>
              <span className={styles.blog_title}>{v.title}</span>
              <span className={[styles.blog_author, styles.center].join(" ")}>
                관리자
              </span>
              <span className={[styles.blog_date, styles.center].join(" ")}>
                {getDate(v.createdAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
