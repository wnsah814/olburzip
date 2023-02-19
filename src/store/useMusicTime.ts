import useSWR from "swr";

let musicTime = 0;
let musicToggle = true;

export function useMusicTime() {
    const { data, mutate } = useSWR("musicTimeObj", () => {
        return {
            musicTime,
            musicToggle,
        };
    });

    return {
        musicTimeObj: data,
        setMusicTime: (time: number) => {
            musicTime = time;
            mutate();
        },
        toggleMusic: () => {
            musicToggle = !musicToggle;
            mutate();
        },
    };
}
