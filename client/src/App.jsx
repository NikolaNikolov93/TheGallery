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
    const [auth, setAuth] = useState({});
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
    const registerSubmitHandler = () => {
        console.log("REGISTER!!");
        closeRegisterModal();
        navigate(Path.Home);
    };
    return (
        <>
            <AuthContext.Provider
                value={{
                    loginSubmitHandler,
                    closeLoginModal,
                    openLoginModal,
                    showLogin,
                    closeRegisterModal,
                    openRegisterModal,
                    showRegister,
                    registerSubmitHandler,
                }}
            >
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
