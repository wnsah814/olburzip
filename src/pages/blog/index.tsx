import styles from "@/styles/Blog.module.css";
import { dbService } from "@/api/fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CommonProp } from "@/components/Layout";

export default function Blog({ userObj }: CommonProp) {
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
        <div className={styles.wrapper}>
            <div className={styles.header_wrapper}>
                <h2 className={styles.header}>URB_log</h2>
                {!userObj?.isAd && (
                    <Link href={"/blog/new"}>
                        <div className={styles.button}>글쓰기</div>
                    </Link>
                )}
            </div>

            <div className={styles.blogs}>
                {blogs.map((v: any, i: number) => (
                    <Link key={i} href={`/blog/${v.id}`}>
                        <div key={i} className={styles.blog}>
                            <span className={styles.blog_id}>
                                {blogs.length - i - 1}
                            </span>
                            <span className={styles.blog_title}>{v.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
