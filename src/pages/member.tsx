import PageTitle from "@/components/Common/PageTitle";
import styles from "@/styles/Member.module.css";

export default function Member() {
    const people = [
        {
            name: "이규근",
            image: "/assets/img/1.png",
            level: "회장",
            desc: "어리버리 화이팅",
            phone: "010-2259-8146",
            email: "example@gmail.com",
        },
        {
            name: "신채영",
            image: "/assets/img/2.png",
            level: "부회장",
            desc: "어리버리 화이팅",
            phone: "010-3570-6970",
            email: "example@gmail.com",
        },
        {
            name: "김승우",
            image: "/assets/img/3.png",
            level: "와꾸대장",
            desc: "와꾸와꾸",
            phone: "010-7588-7804",
            email: "example@gmail.com",
        },
        {
            name: "성준모",
            image: "/assets/img/4.png",
            level: "총무",
            desc: "개발..개발..개발..",
            phone: "010-2731-4120",
            email: "sjmskm@gmail.com",
        },
    ];
    return (
        <>
            <div>
                <PageTitle title={"운영진"} />
            </div>
            <div className={styles.cards}>
                {people.map((v, i) => (
                    <div key={i} className={styles.card}>
                        <div className={styles.dot}></div>
                        <div className={styles.img}>
                            <img
                                className={styles.profile_img}
                                src={v.image}
                                alt="profile_img"
                            ></img>
                        </div>
                        <div className={styles.name}>{v.name}</div>
                        <div className={styles.level}>{v.level}</div>
                        <div className={styles.desc}>{v.desc}</div>
                        <div className={styles.contact}>
                            <div className={styles.icon}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                </svg>
                                <span>{v.phone}</span>
                            </div>
                            <div className={styles.icon}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                </svg>
                                <span>{v.email}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
