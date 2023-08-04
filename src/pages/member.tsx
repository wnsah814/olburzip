import Seo from "@/components/Base/Seo";
import PageTitle from "@/components/Common/PageTitle";
import styles from "@/styles/Member.module.css";

export default function Member() {
  const people = [
    {
      name: "이규근",
      image: "/assets/img/1.png",
      level: "회장",
      desc: "안녕하세요, 파인애플 피자를 좋아하는 이규근입니다. 세상 모두가 파인애플 피자를 즐기는 그 날까지 잘 부탁드립니다.",
      phone: "010-2259-8146",
      email: "kyukun333@gmail.com",
      instagram: "iam._.9root",
    },
    {
      name: "신채영",
      image: "/assets/img/2.png",
      level: "부회장",
      desc: "저도 제가 23년까지도 임원진을 해먹을거라곤 생각 못했거든요.. 어리버리 통통~",
      phone: "010-3570-6970",
      email: "scy0723@hanyang.ac.kr",
      instagram: "cxaos37__",
    },
    {
      name: "김승우",
      image: "/assets/img/3.png",
      level: "와꾸대장",
      desc: "어리버리 와쿠와쿠",
      phone: "010-7588-7804",
      email: "swk24@hanyang.ac.kr",
      instagram: "justswkk24",
    },
    {
      name: "성준모",
      image: "/assets/img/4.png",
      level: "총무",
      desc: "화요일 어리버리, 수요일 공강 let's go",
      phone: "010-2731-4120",
      email: "sjmskm@gmail.com",
      instagram: "j__mo814",
    },
  ];
  return (
    <>
      <Seo title="Member" />

      <div>
        <PageTitle title={"운영진"} />
      </div>
      <div className={styles.cards}>
        {people.map((v: any, i: number) => (
          <div
            key={i}
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay={`${i * 50}`}
            data-aos-offset="0"
            className={styles.card}
          >
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
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
                <span>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`https://www.instagram.com/${v.instagram}`}
                  >
                    {v.instagram}
                  </a>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
