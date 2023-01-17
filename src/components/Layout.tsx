import { auth, dbService } from "@/api/fbase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Footer from "./Base/Footer";
import Header from "./Base/Header";

import { FC } from "react";
import { User } from "firebase/auth";

type LayoutProps = {
    children: React.ReactNode;
};

interface UserObj {
    isAd?: boolean;
    user?: User | "unsigned";
}

export interface CommonProp {
    userObj?: UserObj;
    isSignedIn?: boolean;
}

export default function Layout({ children }: LayoutProps) {
    const [userObj, setUserObj] = useState<UserObj>({ user: "unsigned" });
    const [redo, setRedo] = useState<boolean>(false);

    const setUser = async (user: User) => {
        const docSnap = await getDoc(doc(dbService, "users", user.uid));
        const level = docSnap?.data()?.userLevel;
        if (level === undefined) {
            setRedo((prev) => !prev);
            return;
        }
        if (level !== "일반") {
            setUserObj({ isAd: true, ...user });
        } else {
            setUserObj({ isAd: false, ...user });
        }
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUserObj({ user: "unsigned" });
            }
        });
    }, [redo]);
    return (
        <>
            <Header userObj={userObj} />
            <div>{children}</div>
            <Footer />
            <style jsx>
                {`
                    div {
                        width: 100vw;
                        min-height: calc(100vh - 4rem);
                        padding: 2rem;
                    }

                    @media screen and (width < 480px) {
                        .container {
                            padding: 1rem 0.5rem;
                        }
                    }
                `}
            </style>
        </>
    );
}
