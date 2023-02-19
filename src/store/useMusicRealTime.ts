import useSWR from "swr";

let musicRealTime = "0.00";

export function useMusicRealTime() {
    const { data, mutate } = useSWR("musicRealTime", () => {
        return musicRealTime;
    });

    return {
        musicRealTime: data,
        setMusicRealTime: (time: string) => {
            musicRealTime = time;
            mutate();
        },
    };
}
