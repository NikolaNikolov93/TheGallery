import { Routes, Route, useNavigate } from "react-router-dom";
import Categories from "./components/categories/Categories";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import InsideSingleCategory from "./components/inside-single-categorie/InsideSingleCategory";
import NotFound from "./components/notFound/NotFound";
import { useState, useEffect } from "react";
import { AuthProvider } from "./components/contexts/authContext";
import CategoriesContext from "./components/contexts/categoriesContext";
import Top10 from "./components/top10/top10";
import CreatePicture from "./components/createPicture/CreatePicture";
import * as categoriesServices from "./services/categoriesServices";

function App() {
    const [categories, setCategoreis] = useState([]);
    useEffect(() => {
        categoriesServices
            .getAll()
            .then((categories) => setCategoreis(categories))
            .catch((err) => console.log(err));
    }, []);

    /**Categoreis values object  */
    const categoriesContextData = {
        categories,
    };

    return (
        <>
            <AuthProvider>
                <CategoriesContext.Provider value={categoriesContextData}>
                    <Header />
                    <main className="main">
                        <Routes>
                            <Route path="/" element={<Categories />} />
                            <Route path="/top10" element={<Top10 />} />
                            <Route
                                path="/create-image"
                                element={<CreatePicture />}
                            />
                            <Route
                                path="/:category"
                                element={<InsideSingleCategory />}
                            />
                            <Route path="*" Component={NotFound} />
                        </Routes>
                    </main>
                    <Footer />
                </CategoriesContext.Provider>
            </AuthProvider>
        </>
    );
}

export default App;
