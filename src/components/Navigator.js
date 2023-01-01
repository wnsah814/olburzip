import styles from "./Navigator.module.css";
import { Link } from "react-router-dom";

// import menuImg from "asset/img/menu.png";
import { useState } from "react";
import SignBtn from "./SignBtn";

const Navigator = ({ userObj, isSignedIn }) => {
    const [opened, setOpened] = useState(false);
    const toggleMenu = (e) => {
        setOpened((prev) => !prev);
    };

    return (
        <>
            {/* 모바일 전체화면 메뉴 */}
            {opened === true ? (
                <div className={styles.mobileFullNav}>
                    <div className={styles.cancleBtn} onClick={toggleMenu}>
                        X
                    </div>

                    <div className={styles.mobileNavs}>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link to="/about">About</Link>
                        </div>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link to="/member">Member</Link>
                        </div>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link to="/blog">Blog</Link>
                        </div>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link to="/music">Music</Link>
                        </div>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link to="/dance">Dance</Link>
                        </div>
                        {userObj?.isAd && (
                            <div
                                onClick={toggleMenu}
                                className={styles.mobileNav}
                            >
                                <Link to="/admin">Manage</Link>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}

            {/* 모바일 메뉴 */}
            <div className={styles.mobileNavigation}>
                <div>
                    <SignBtn isSignedIn={isSignedIn} />

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
                            <Link to="/about">About</Link>
                        </div>
                        <div className={styles.desktopNav}>
                            <Link to="/member">Member</Link>
                        </div>
                        <div className={styles.desktopNav}>
                            <Link to="/blog">Blog</Link>
                        </div>
                        <div className={styles.desktopNav}>
                            <Link to="/music">Music</Link>
                        </div>
                        <div className={styles.desktopNav}>
                            <Link to="/dance">Dance</Link>
                        </div>
                        {userObj?.isAd && (
                            <div className={styles.desktopNav}>
                                <Link to="/admin">Manage</Link>
                            </div>
                        )}
                    </nav>
                    <SignBtn isSignedIn={isSignedIn} />
                </div>
            </div>
        </>
    );
};
export default Navigator;
