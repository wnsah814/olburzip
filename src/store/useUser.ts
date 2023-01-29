import useSWR from "swr";

interface UserObj {
    isSignedIn: boolean;
    isAd?: boolean;
    level?: number;
    uid?: string;
    name?: string;
    photoUrl?: string;
}

let userObj: UserObj = {
    isSignedIn: false,
};

export function useUser() {
    const { data, mutate } = useSWR("userObj", () => {
        return userObj;
    });

    return {
        data,
        mutate: (value: UserObj) => {
            userObj = value;
            return mutate();
        },
    };
}
