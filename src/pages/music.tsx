import MusicList from "@/components/Music/MusicList";
import MusicPlayer from "@/components/Music/MusicPlayer";
import { useState } from "react";

export default function Music() {
    const [curSong, setCurSong] = useState<string>("");
    return (
        <>
            <MusicList setCurSong={setCurSong} />
            <MusicPlayer curSong={curSong} />
        </>
    );
}
