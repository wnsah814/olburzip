import { Route, Routes } from "react-router-dom";
import About from "routes/About";
import Apply from "routes/Apply";
import Blog from "routes/Blog";
import Dance from "routes/Dance";
import Main from "routes/Main";
import Member from "routes/Member";
import Music from "routes/Music";
import Sign from "routes/Sign";
import SignIn from "routes/SignIn";
import SignUp from "routes/SignUp";

const AppRouter = ({ userObj }) => {
    return (
        <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/sign" element={<Sign />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/member" element={<Member />}></Route>
            <Route path="/apply" element={<Apply />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/music" element={<Music />}></Route>
            <Route path="/dance" element={<Dance />}></Route>
        </Routes>
    );
};
export default AppRouter;
