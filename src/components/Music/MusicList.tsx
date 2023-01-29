import PageTitle from "../Common/PageTitle";
import Song from "./Song";

const MusicList = ({ setCurSong }: any) => {
    return (
        <>
            <PageTitle title="율동 노래" />
            <div className={"songs"}>
                <Song
                    setCurSong={setCurSong}
                    songTitle={"꿈찾기"}
                    songName="dream"
                />
                <Song
                    setCurSong={setCurSong}
                    songTitle={"우린 하나요"}
                    songName="allone"
                />
                <Song
                    setCurSong={setCurSong}
                    songTitle={"날개"}
                    songName="wings"
                />
                <Song
                    setCurSong={setCurSong}
                    songTitle={"새물"}
                    songName="newwater"
                />
                <Song
                    setCurSong={setCurSong}
                    songTitle={"우리 하나되어"}
                    songName="beone"
                />
                <Song
                    setCurSong={setCurSong}
                    songTitle={"날자2"}
                    songName="fly2"
                />
                <Song
                    setCurSong={setCurSong}
                    songTitle={"바로 지금이에요"}
                    songName="rightnow"
                />
            </div>
            <style jsx>
                {`
                    .category {
                        margin-bottom: 1rem;
                    }

                    .songs {
                        display: flex;
                        flex-wrap: wrap;
                    }

                    @media screen and (max-width: 480px) {
                        .wrapper {
                            padding: 2rem;
                        }
                    }
                `}
            </style>
        </>
    );
};
export default MusicList;
