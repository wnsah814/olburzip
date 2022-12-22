import "asset/css/style.css";
import Header from "components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Contents from "components/Contents";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { auth } from "fbase";
// import { updateProfile } from "firebase/auth";

function App() {
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user);
                // if (user.displayName === null) {
                // const idx = user.email.indexOf("@");
                // const userName = user.email.substring(0, idx);
                // updateProfile(user, {
                //     displayName: userName,
                // });
                // }
                console.log(user);
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
