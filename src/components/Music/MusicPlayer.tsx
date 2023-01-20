const MusicPlayer = ({ curSong }: { curSong: string }) => {
    return (
        <div className={"player"}>
            <audio
                autoPlay
                className={"audio"}
                controls
                src={`http://sjmskm.cafe24.com/urbur_songs/${curSong}.mp3`}
            ></audio>
            <style jsx>
                {`
                    .player {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 3.375rem;
                        background-color: #f4f4f4;
                    }

                    .audio {
                        width: 100%;
                        /* height: 100%; */
                        border-radius: 0;
                    }
                `}
            </style>
        </div>
    );
};
export default MusicPlayer;
