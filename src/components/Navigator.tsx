import { useState } from "react";
import styles from "@/styles/Navigator.module.css";
import Link from "next/link";
import SignBtn from "./SignBtn";
import { ClickEvent } from "@/types";
import { useUser } from "@/store/useUser";

export default function Navigator() {
    const { data } = useUser();

    const [opened, setOpened] = useState<boolean>(false);
    const toggleMenu = (e: ClickEvent) => {
        console.log(e);
        setOpened((prev) => !prev);
    };
    return (
        <>
            {opened === true ? (
                <div className={styles.mobileFullNav}>
                    <div className={styles.cancleBtn} onClick={toggleMenu}>
                        X
                    </div>

                    <div className={styles.mobileNavs}>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link href="/about">About</Link>
                        </div>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link href="/member">Member</Link>
                        </div>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link href="/blog">Blog</Link>
                        </div>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link href="/music">Music</Link>
                        </div>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link href="/dance">Dance</Link>
                        </div>
                        {data?.isAd && (
                            <div
                                onClick={toggleMenu}
                                className={styles.mobileNav}
                            >
                                <Link href="/manage">Manage</Link>
                            </div>
                        )}
                        {data?.isSignedIn && (
                            <div
                                onClick={toggleMenu}
                                className={styles.mobileNav}
                            >
                                <Link href="/profile">Profile</Link>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}

            {/* 모바일 메뉴 */}
            <div className={styles.mobileNavigation}>
                <div>
                    <SignBtn />

                    <button
                        onClick={toggleMenu}
                        className={styles.mobileNavBtn}
                    >
                        <svg
                            className={styles.mobileNavOpenSvg}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 데스크탑 메뉴 */}
            <div className={styles.desktopNavigation}>
                <div>
                    <nav className={styles.desktopNavs}>
                        <div className={styles.desktopNav}>
                            <Link href="/about">About</Link>
                        </div>
                        <div className={styles.desktopNav}>
                            <Link href="/member">Member</Link>
                        </div>
                        <div className={styles.desktopNav}>
                            <Link href="/blog">Blog</Link>
                        </div>
                        <div className={styles.desktopNav}>
                            <Link href="/music">Music</Link>
                        </div>
                        <div className={styles.desktopNav}>
                            <Link href="/dance">Dance</Link>
                        </div>
                        {data?.isAd && (
                            <div className={styles.desktopNav}>
                                <Link href="/manage">Manage</Link>
                            </div>
                        )}
                        {data?.isSignedIn && (
                            <div className={styles.desktopNav}>
                                <Link href="/profile">Profile</Link>
                            </div>
                        )}
                    </nav>
                    <SignBtn />
                </div>
            </div>
        </>
    );
}
