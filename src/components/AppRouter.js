import { Route, Routes } from "react-router-dom";
import About from "routes/About";
import Apply from "routes/Apply";
import Blog from "routes/Blog";
import Dance from "routes/Dance";
import Main from "routes/Main";
import Member from "routes/Member";
import Music from "routes/Music";

const AppRouter = ({ userObj }) => {
    return (
        <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route
                path="/member"
                element={<Member userObj={userObj} />}
            ></Route>
            <Route path="/apply" element={<Apply />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/music" element={<Music />}></Route>
            <Route path="/dance" element={<Dance />}></Route>
        </Routes>
    );
};
export default AppRouter;
