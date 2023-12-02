import { Routes, Route, useNavigate } from "react-router-dom";
import * as authService from "./services/authService";
import Categories from "./components/categories/Categories";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import InsideSingleCategory from "./components/inside-single-categorie/InsideSingleCategory";
import NotFound from "./components/notFound/NotFound";
import { useState, useEffect } from "react";
import AuthContext from "./components/contexts/authContext";
import CategoriesContext from "./components/contexts/categoriesContext";
import Path from "./paths";
import Top10 from "./components/top10/top10";
import CreatePicture from "./components/createPicture/CreatePicture";
import * as categoriesServices from "./services/categoriesServices";

function App() {
    const navigate = useNavigate();
    const [categories, setCategoreis] = useState([]);
    useEffect(() => {
        categoriesServices
            .getAll()
            .then((categories) => setCategoreis(categories))
            .catch((err) => console.log(err));
    }, []);

    /**Authentication state */
    const [auth, setAuth] = useState(() => {
        localStorage.removeItem("accessToken");
        return {};
    });

    /** Lifted state for the Login From */
    const [showLogin, setShowLogin] = useState(false);
    const closeLoginModal = () => {
        setShowLogin(false);
    };
    const openLoginModal = () => {
        setShowLogin(true);
    };

    const loginSubmitHandler = async (values) => {
        const result = await authService.login(values.email, values.password);
        setAuth(result);
        localStorage.setItem("accessToken", result.accessToken);
        navigate(Path.Home);
        closeLoginModal();
    };

    /** Lifted state for the Register From */
    const [showRegister, setShowRegister] = useState(false);
    const closeRegisterModal = () => {
        setShowRegister(false);
    };
    const openRegisterModal = () => {
        setShowRegister(true);
    };
    const registerSubmitHandler = async (values) => {
        const result = await authService.register(
            values.email,
            values.password,
            values.username
        );
        setAuth(result);
        localStorage.setItem("accessToken", result.accessToken);
        navigate(Path.Home);
        closeRegisterModal();
    };

    /**Logout handler */
    const logoutHandler = async (token) => {
        await authService.logout(token);
        setAuth({});
        localStorage.removeItem("accessToken");
        navigate(Path.Home);
    };

    /**Authentication values object */
    const authenticationContextData = {
        loginSubmitHandler,
        closeLoginModal,
        openLoginModal,
        showLogin,
        closeRegisterModal,
        openRegisterModal,
        showRegister,
        registerSubmitHandler,
        logoutHandler,
        username: auth.username,
        email: auth.email,
        isAuthenticated: !!auth.accessToken,
        token: auth.accessToken,
    };
    /**Categoreis values object  */
    const categoriesContextData = {
        categories,
    };

    return (
        <>
            <CategoriesContext.Provider value={categoriesContextData}>
                <AuthContext.Provider value={authenticationContextData}>
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
                </AuthContext.Provider>
            </CategoriesContext.Provider>
        </>
    );
}

export default App;
