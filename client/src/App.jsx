import { Routes, Route, useNavigate } from "react-router-dom";
import * as authService from "./services/authService";
import Categories from "./components/categories/Categories";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import InsideSingleCategory from "./components/inside-single-categorie/InsideSingleCategory";
import NotFound from "./components/notFound/NotFound";
import { useState } from "react";
import AuthContext from "./components/contexts/authContext";
import Path from "./paths";

function App() {
    const navigate = useNavigate();

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

    /**Context values object */
    const contextData = {
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

    return (
        <>
            <AuthContext.Provider value={contextData}>
                <Header />
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
            </AuthContext.Provider>
        </>
    );
}

export default App;
