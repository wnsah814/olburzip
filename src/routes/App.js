import "asset/css/style.css";
import Header from "components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Contents from "components/Contents";

function App() {
    return (
        <Router>
            <Header />
            <Contents />
        </Router>
    );
}

export default App;
