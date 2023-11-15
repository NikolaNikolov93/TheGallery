import { Routes, Route } from "react-router-dom";

import Categories from "./components/categories/Categories";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Register from "./components/register/Register";
import InsideSingleCategory from "./components/inside-single-categorie/InsideSingleCategory";
import NotFound from "./components/notFound/NotFound";
import Login from "./components/login/Login";

function App() {
    return (
        <>
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/" element={<Categories />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
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
