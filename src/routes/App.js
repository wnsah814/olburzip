import "asset/css/style.css";
import Header from "components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Contents from "components/Contents";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { auth, dbService } from "fbase";
import { doc, getDoc } from "firebase/firestore";
// import { updateProfile } from "firebase/auth";

function App() {
    const [userObj, setUserObj] = useState(null);

    const setUser = async (user) => {
        const docSnap = await getDoc(doc(dbService, "users", user.uid));
        const level = docSnap?.data()?.userLevel;
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
                // if (user.displayName === null) {
                // const idx = user.email.indexOf("@");
                // const userName = user.email.substring(0, idx);
                // updateProfile(user, {
                //     displayName: userName,
                // });
                // }
                // console.log(user);
            } else {
                setUserObj(null);
            }
        });
    }, []);
    return (
        <Router>
            <Header userObj={userObj} isSignedIn={Boolean(userObj)} />
            <Contents userObj={userObj} />
            <Footer />
        </Router>
    );
}

export default App;
