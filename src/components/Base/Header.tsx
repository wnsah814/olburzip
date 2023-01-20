import styles from "@/styles/Header.module.css";
import Image from "next/image";

import Link from "next/link";
import Navigator from "../Navigator";

export default function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link href="/">
                    <Image
                        width={64}
                        height={64}
                        src={"/assets/img/logo.svg"}
                        id={styles.headerImg}
                        alt="logo"
                    />
                </Link>
            </div>
            <div className={styles.navi}>
                <Navigator />
            </div>
        </div>
    );
}
