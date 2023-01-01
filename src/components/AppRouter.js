import { Route, Routes } from "react-router-dom";
import About from "routes/About";
import Admin from "routes/Admin";
import Apply from "routes/Apply";
import Blog from "routes/Blog/Blog";
import NewBlog from "routes/Blog/NewBlog";
import Dance from "routes/Dance";
import Main from "routes/Main";
import Member from "routes/Member";
import Music from "routes/Music";
import ContentsViewer from "components/Blog/ContentsViewer";

const AppRouter = ({ userObj }) => {
    return (
        <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/admin" element={<Admin userObj={userObj} />}></Route>
            <Route
                path="/member"
                element={<Member userObj={userObj} />}
            ></Route>
            <Route path="/apply" element={<Apply />}></Route>
            <Route path="/about" element={<About />}></Route>

            <Route path="/blog" element={<Blog userObj={userObj} />}></Route>
            <Route path="/blog/new" element={<NewBlog />}></Route>
            <Route
                path="/blog/:id"
                element={<ContentsViewer userObj={userObj} />}
            ></Route>

            <Route path="/music" element={<Music />}></Route>
            <Route path="/dance" element={<Dance />}></Route>
        </Routes>
    );
};
export default AppRouter;
