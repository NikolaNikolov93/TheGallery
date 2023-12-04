import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./components/contexts/authContext";
import { CategoriesProvider } from "./components/contexts/categoriesContext";

import Categories from "./components/categories/Categories";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import InsideSingleCategory from "./components/inside-single-categorie/InsideSingleCategory";
import NotFound from "./components/notFound/NotFound";
import Top10 from "./components/top10/top10";
import CreatePicture from "./components/createPicture/CreatePicture";

function App() {
    return (
        <>
            <AuthProvider>
                <CategoriesProvider>
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
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </CategoriesProvider>
            </AuthProvider>
        </>
    );
}

export default App;
