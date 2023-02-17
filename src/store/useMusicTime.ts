import useSWR from "swr";

let MusicTime = 0.0;

export function useMusicTime() {
    const { data, mutate } = useSWR("musicTime", () => {
        return MusicTime;
    });

    return {
        musicTime: data,
        setMusicTime: (value: number) => {
            MusicTime = value;
            return mutate();
        },
    };
}
