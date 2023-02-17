import useSWR from "swr";

let MusicIdx = 0;

export function useMusicIndex() {
    const { data, mutate, isLoading } = useSWR("musicIndex", () => {
        return MusicIdx;
    });

    return {
        musicIndex: data,
        isLoading,
        setMusicIndex: (value: number) => {
            MusicIdx = value;
            return mutate();
        },
    };
}
