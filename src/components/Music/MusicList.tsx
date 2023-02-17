import { tracks } from "@/store/tracks";
import { useMusicIndex } from "@/store/useMusicIndex";

const MusicList = () => {
    const { setMusicIndex } = useMusicIndex();

    return (
        <>
            <div className="media-list">
                {/* <div className="honeycomb">OMG</div> */}
                <div className="honeycombs">
                    <div onClick={() => setMusicIndex(0)} className="honeycomb">
                        {tracks[0].title}
                    </div>
                    <div onClick={() => setMusicIndex(1)} className="honeycomb">
                        {tracks[1].title}
                    </div>
                </div>
                <div className="honeycombs">
                    <div onClick={() => setMusicIndex(2)} className="honeycomb">
                        {tracks[2].title}
                    </div>
                    <div onClick={() => setMusicIndex(3)} className="honeycomb">
                        {tracks[3].title}
                    </div>
                    <div onClick={() => setMusicIndex(4)} className="honeycomb">
                        {tracks[4].title}
                    </div>
                </div>
                <div className="honeycombs">
                    <div onClick={() => setMusicIndex(5)} className="honeycomb">
                        {tracks[5].title}
                    </div>
                    <div onClick={() => setMusicIndex(6)} className="honeycomb">
                        {tracks[6].title}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .media-list {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    flex-wrap: wrap;
                }

                .honeycombs {
                    display: flex;
                    flex-direction: row;
                }

                .honeycomb {
                    outline: none;
                    cursor: pointer;
                    margin: 30px 8px 8px 0;
                    width: 104px;
                    height: 60px;
                    background-color: var(--color-yellow);
                    border-color: var(--color-yellow);
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .honeycomb:before {
                    content: " ";
                    width: 0;
                    height: 0;
                    border-bottom: 30px solid;
                    border-color: inherit;
                    border-left: 52px solid transparent;
                    border-right: 52px solid transparent;
                    position: absolute;
                    top: -30px;
                    left: 0;
                }

                .honeycomb:after {
                    content: "";
                    width: 0;
                    position: absolute;
                    bottom: -30px;
                    left: 0;
                    border-top: 30px solid;
                    border-color: inherit;
                    border-left: 52px solid transparent;
                    border-right: 52px solid transparent;
                    filter: drop-shadow(0 3px 1px var(--color-brown));
                }
            `}</style>
        </>
    );
};

export default MusicList;
