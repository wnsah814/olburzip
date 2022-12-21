import styles from "./Navigator.module.css";
import { Link } from "react-router-dom";

import menuImg from "asset/img/menu.png";
import { useEffect, useState } from "react";

const Navigator = () => {
    const [opened, setOpened] = useState(false);
    const toggleMenu = (e) => {
        setOpened((prev) => !prev);
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
            <div onClick={toggleMenu} className={styles.mobieNavigation}>
                <button className={styles.mobileNavBtn}>
                    <svg
                        className={styles.mobileOpenBtn}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                        />
                    </svg>
                </button>
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
            </div>
        </>
    );
};
export default Navigator;
