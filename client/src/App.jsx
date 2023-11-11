import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import InsideSingleCategory from "./components/InsideSingleCategory";
import NotFound from "./components/NotFound";

function App() {
    return (
        <>
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/" element={<Categories />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/:category"
                        element={<InsideSingleCategory />}
                    />
                    <Route path="*" Component={NotFound} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
