import { Routes, Route } from "react-router-dom";

import Categories from "./components/categories/Categories";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import InsideSingleCategory from "./components/inside-single-categorie/InsideSingleCategory";
import NotFound from "./components/notFound/NotFound";
import { useState } from "react";

function App() {
    const [auth, setAuth] = useState({});
    const loginSubmitHandler = (values) => {
        console.log(values);
    };
    return (
        <>
            <Header loginSubmitHandler={loginSubmitHandler} />
            <main className="main">
                <Routes>
                    <Route path="/" element={<Categories />} />
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
