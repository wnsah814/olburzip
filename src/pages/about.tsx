import PageTitle from "@/components/Common/PageTitle";
import YouTubePlayer from "@/components/Common/YoutubePlayer";
import { NextPage } from "next";
import styles from "@/styles/About.module.css";
import Link from "next/link";
import Button from "@/components/Common/Button";
import Seo from "@/components/Base/Seo";

const About: NextPage = () => {
    return (
        <>
            <Seo title="About" />
            <div className={styles.container}>
                <PageTitle title={"어리버리란?"} />
                <div
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="200"
                    data-aos-offset="0"
                >
                    <p>
                        공대에서 여러 학부들이 운영하는 율동패 중
                        컴퓨터소프트웨어학부 동아리로 율동을 배우고 공연을
                        준비합니다.
                    </p>
                    <p>
                        새준단(공대판), 공학인의 밤, 축제, 컴소인의 밤 등의 여러
                        행사에서 공연을 준비해요.
                    </p>
                    <p>함께 공연을 준비하다보면 추억은 덤이랍니다~</p>
                </div>

                <br />
                <div
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="400"
                    data-aos-offset="0"
                >
                    <ul className={styles.ul}>
                        <li>율동이 부담스럽다고요?🤔</li>
                        <li>
                            ➡️누구나 배울 수 있는 쉬운 동작과 중독성 있는 노래로
                            부담없이 즐길 수 있는 대학생 버전 율동입니다!
                        </li>
                        <li>율동만 하나고요?🤔</li>
                        <li>
                            ➡️ 원한다면 다른 춤 공연도 준비합니다! 케이팝 무대도
                            많이 했었으니 마음껏 끼를 뽐내주세요!
                        </li>
                        <li>어려울 것 같다고요?🤔</li>
                        <li>
                            ➡️몸치? 박치? 오히려 인재입니다. 지금 신청하시죠.
                        </li>
                    </ul>
                </div>
                <br />

                <div
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="600"
                    data-aos-offset="0"
                >
                    <p>든든한 선후배 관계를 찾는다면 여기예요 여기!</p>
                    <p>
                        코로나로 인한 공백기도 채워줄 수 있는 선배들도 친구처럼
                        지낼 수 있어요!
                    </p>
                    <p>잇빗을 돌아다니면 인사하느라 힘이든다니까요?</p>
                </div>

                <br />

                <div
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="800"
                    data-aos-offset="0"
                >
                    <ul>
                        <li>
                            ☑️ 유머 넘치는 최강 인싸 선배들과 함께 즐겁고 흥
                            넘치는 대학생활을 만들고 싶다면!
                        </li>
                        <li>☑️ 공연을 해보는 추억을 쌓고 싶다면!</li>
                        <li>☑️ 내 흥을 발산하고 싶다면!</li>
                        <li>☑️ 흥이 없지만 느껴보고 싶다면!</li>
                    </ul>
                </div>

                <div
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="850"
                    data-aos-offset="0"
                >
                    <Button>
                        <Link href={"/apply"}>지원하러 GOGO</Link>
                    </Button>
                </div>
                {/* <div className={styles.logoContainer}>
                    <img
                        className={styles.logo}
                        src="/assets/img/logo/yellow_2.png"
                        alt="URBUR"
                    />
                </div> */}
                <div
                    data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                >
                    <h3>ULLE JAN 1호 (홍보 잡지)</h3>
                    <div className={styles.imgs}>
                        <img
                            className={`${styles.img34} ${styles.img}`}
                            src="/assets/img/ULLE/ULLE_2023JAN-1.png"
                            alt="ULLE-2023JAN"
                        />
                        <img
                            className={`${styles.img34} ${styles.img}`}
                            src="/assets/img/ULLE/ULLE_2023JAN-2.png"
                            alt="ULLE-2023JAN"
                        />
                        <img
                            className={`${styles.img34} ${styles.img}`}
                            src="/assets/img/ULLE/ULLE_2023JAN-3.png"
                            alt="ULLE-2023JAN"
                        />
                        <img
                            className={`${styles.img34} ${styles.img}`}
                            src="/assets/img/ULLE/ULLE_2023JAN-4.png"
                            alt="ULLE-2023JAN"
                        />
                        <img
                            className={`${styles.img34} ${styles.img}`}
                            src="/assets/img/ULLE/ULLE_2023JAN-5.png"
                            alt="ULLE-2023JAN"
                        />
                        <img
                            className={`${styles.img34} ${styles.img}`}
                            src="/assets/img/ULLE/ULLE_2023JAN-6.png"
                            alt="ULLE-2023JAN"
                        />
                        <img
                            className={`${styles.img34} ${styles.img}`}
                            src="/assets/img/ULLE/ULLE_2023JAN-7.png"
                            alt="ULLE-2023JAN"
                        />
                        <img
                            className={`${styles.img34} ${styles.img}`}
                            src="/assets/img/ULLE/ULLE_2023JAN-8.png"
                            alt="ULLE-2023JAN"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <PageTitle title={"화요일이 기대되는 회합"} />
                <div data-aos="fade-in">
                    <p>매주 화요일 18시부터 20시까지 율동 연습을 합니다</p>
                    <p>회합 이후에는 뒤풀이도 있어요!</p>
                    <p>
                        시험 몇주전에는 슬프게도 회합이 없답니다🥲 공부할 땐
                        하는 사람들이거든요🔥
                    </p>
                </div>

                <div
                    data-aos="fade-in"
                    className={`${styles.imgs} ${styles.img}`}
                >
                    <img
                        className={`${styles.img43} ${styles.img}`}
                        src="/assets/img/about/enl1.jpg"
                        alt="뒤풀이사진"
                    />
                    <img
                        className={`${styles.img43} ${styles.img}`}
                        src="/assets/img/about/enl2.jpg"
                        alt="뒤풀이사진"
                    />
                </div>

                <div data-aos="fade-in">
                    <p>종강파티도 진행했답니다! 무려 횟집 (얼벌 클라스)</p>
                </div>

                <div
                    data-aos="fade-in"
                    className={`${styles.imgs} ${styles.img}`}
                >
                    <img
                        className={`${styles.img43} ${styles.img}`}
                        src="/assets/img/about/jonggang.jpg"
                        alt="종강파티"
                    />
                    <img
                        className={`${styles.img43} ${styles.img}`}
                        src="/assets/img/about/rawfish.jpg"
                        alt="회"
                    />
                </div>
            </div>

            <div className={styles.container}>
                <PageTitle title={"대학생활의 꽃, MT"} />
                <div data-aos="fade-in">
                    <h3>봄 엠티</h3>
                    <p>고기도 먹구 술게임도 배우고 낭만 그 자체... </p>
                    <div className={styles.imgs}>
                        <img
                            className={`${styles.img43} ${styles.img}`}
                            src="/assets/img/about/spring_mt.jpg"
                            alt="spring_mt"
                        />
                        <img
                            className={`${styles.img34} ${styles.img}`}
                            src="/assets/img/about/spring_night.jpg"
                            alt="spring_mt"
                        />
                    </div>
                </div>

                <div data-aos="fade-in">
                    <h3>가을 엠티</h3>

                    <p>
                        파티룸! 노래도 부르고 당구도 치고 여러가지 놀이를
                        즐겼죠.. 아 또 가고 싶다
                    </p>
                    <div className={`${styles.imgs} ${styles.img}`}>
                        <img
                            className={`${styles.img43} ${styles.img}`}
                            src="/assets/img/about/afecto.jpg"
                            alt="afecto"
                        />
                        <img
                            className={`${styles.img43} ${styles.img}`}
                            src="/assets/img/about/uriburi.jpg"
                            alt="uriburi"
                        />
                        <img
                            className={`${styles.img43} ${styles.img}`}
                            src="/assets/img/about/fall_mt.jpg"
                            alt="fall_mt"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <PageTitle title={"우리의 꿈찾기, 공학인의 밤"} />
                <div data-aos="fade-in">
                    <p>
                        22년 5월 24일에는 공학인의 밤 행사에 참여해 그동안
                        연습한 율동을 선보였습니다!
                    </p>
                    <p>
                        율동으로는 꿈찾기, 날자를 준비했고, 얼탄소년단(UTS)의
                        DNA 무대도 진행되었어요
                    </p>
                </div>
                <div data-aos="fade-in" className={styles.videos}>
                    <iframe
                        className={styles.video}
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/ZpZkFe9YHJ4"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        frameBorder={0}
                    ></iframe>
                    <iframe
                        className={styles.video}
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/c_GW-Oe6BKM"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        frameBorder={0}
                    ></iframe>
                    <iframe
                        className={styles.video}
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/WzK95HBXVeI"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        frameBorder={0}
                    ></iframe>
                </div>
            </div>

            <div className={styles.container}>
                <PageTitle title={"그 외에는 ??"} />
                <div data-aos="fade-in">
                    <p>
                        얼벌은 동아리 회합때만이 아니라 이외의 시간에도 만나서
                        놀아요. 진짜 모두가 찐친.
                    </p>
                </div>

                <div data-aos="fade-in">
                    <h3>서울숲</h3>
                    <p>
                        초반의 어색함이 남아 있을 때 날씨가 너무좋아서 같이
                        산책을 다녀왔어요.
                    </p>
                    <p>
                        카드놀이 하다보니 시간 삭제 🥲 사진도 많이 많이 찍고
                        너무 기억에 남아요
                    </p>
                    <p>이번에는 어디도 간다했더라? (롯데월드)</p>
                    <div className={styles.imgs}>
                        <img
                            className={`${styles.img34} ${styles.img}`}
                            src="/assets/img/about/forest1.jpg"
                            alt="forest"
                        />
                        <img
                            className={`${styles.img11} ${styles.img}`}
                            src="/assets/img/about/forest2.jpg"
                            alt="forest"
                        />
                    </div>
                </div>
                <div data-aos="fade-in">
                    <h3>컴소인의 밤</h3>
                    <p>
                        코로나로 인해 하지못한 컴소인의 밤이 이번년도에
                        부활한다해요!
                    </p>
                    <p>2학기에도 식지 않는 열정을 보여줍시다!</p>
                    <br />
                    <p>
                        이렇게 보니.. 지원하지 않으면 손해겠는데요? 신청좀 하고
                        올게요
                    </p>
                    <Button>
                        <Link href={"/apply"}>지금 당장 지원하기!</Link>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default About;
