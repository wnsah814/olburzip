import styles from "./Navigator.module.css";
import { Link, useNavigate } from "react-router-dom";

import menuImg from "asset/img/menu.png";
import { useEffect, useState } from "react";
import { auth } from "fbase";

const Navigator = ({ userObj, isSignedIn }) => {
    const [opened, setOpened] = useState(false);
    const toggleMenu = (e) => {
        setOpened((prev) => !prev);
    };
    const navigate = useNavigate();
    const onSignOut = () => {
        console.log("log out");
        console.log(userObj);
        auth.signOut();
        navigate("/");
    };
    return (
        <>
            {opened === true ? (
                <div className={styles.mobileFullNav}>
                    <div onClick={toggleMenu}>X</div>

                    <div className={styles.mobileNavs}>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link to="/member">Member</Link>
                        </div>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link to="/music">Music</Link>
                        </div>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link to="/dance">Dance</Link>
                        </div>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link to="/blog">Blog</Link>
                        </div>
                        <div onClick={toggleMenu} className={styles.mobileNav}>
                            <Link to="/about">About</Link>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className={styles.mobieNavigation}>
                <button onClick={toggleMenu} className={styles.mobileNavBtn}>
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
                {!isSignedIn ? (
                    <button className={styles.mobileSignBtn}>
                        <Link to="sign">
                            <svg
                                className={styles.mobileSignSvg}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                                />
                            </svg>
                        </Link>
                    </button>
                ) : (
                    <button
                        className={styles.mobileSignBtn}
                        onClick={onSignOut}
                    >
                        <svg
                            className={styles.mobileSignSvg}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                            />
                        </svg>
                    </button>
                )}
            </div>

            <div className={styles.desktopNavigation}>
                <nav className={styles.navigation}>
                    <div className={styles.nav}>
                        <Link to="/member">Member</Link>
                    </div>
                    <div className={styles.nav}>
                        <Link to="/music">Music</Link>
                    </div>
                    <div className={styles.nav}>
                        <Link to="/dance">Dance</Link>
                    </div>
                    <div className={styles.nav}>
                        <Link to="/blog">Blog</Link>
                    </div>
                    <div className={styles.nav}>
                        <Link to="/about">About</Link>
                    </div>
                </nav>
                <button className={styles.mobileSignBtn}>
                    <Link to="sign">
                        <svg
                            className={styles.mobileSignSvg}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                            />
                        </svg>
                    </Link>
                </button>
            </div>
        </>
    );
};
export default Navigator;
