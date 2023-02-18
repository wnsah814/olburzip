import { auth, dbService } from "@/api/fbase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Footer from "./Base/Footer";
import Header from "./Base/Header";

import { User } from "firebase/auth";
import { useUser } from "@/store/useUser";

type LayoutProps = {
    children: React.ReactNode;
};

interface UserObj {
    isSignedIn: boolean;
    isAd?: boolean;
}

export interface CommonProp {
    userObj: UserObj;
    isSignedIn?: boolean;
}

export default function Layout({ children }: LayoutProps) {
    const [redo, setRedo] = useState<boolean>(false);
    const { mutate } = useUser();

    const setUser = async (user: User) => {
        const docSnap = await getDoc(doc(dbService, "users", user.uid));
        const level = docSnap?.data()?.userLevel;
        if (level === undefined) {
            setRedo((prev) => !prev);
            return;
        }
        if (level > 1) {
            mutate({ isSignedIn: true, isAd: true, ...user });
        } else {
            mutate({ isSignedIn: true, isAd: false, ...user });
        }
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                mutate({ isSignedIn: false });
            }
        });
    }, [redo]);
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
            <style jsx>
                {`
                    div {
                        width: 100vw;
                        min-height: calc(100vh - var(--footer-height));
                        padding: var(--container-padding);
                        background-color: var(--color-white);
                    }

                    @media screen and (max-width: 480px) {
                        div {
                            padding: 1rem;
                        }
                    }
                `}
            </style>
        </>
    );
}
