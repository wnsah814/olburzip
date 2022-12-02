import "asset/css/style.css";
import Header from "components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Contents from "components/Contents";
import Footer from "components/Footer";

function App() {
    return (
        <Router>
            <Header />
            <Contents />
            <Footer />
        </Router>
    );
}

export default App;
