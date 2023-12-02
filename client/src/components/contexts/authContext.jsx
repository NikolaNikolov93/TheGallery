import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import Path from "../../paths";
import usePeristedState from "../../hooks/usePersistedState";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    /**Authentication state */
    const [auth, setAuth] = usePeristedState("auth", {});

    /** Lifted state for the Login From */
    const [showLogin, setShowLogin] =
        usePeristedState(
            false
        ); /** usePersistedState is custom hook for persisting the state in the localStorage */
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
    return (
        <AuthContext.Provider value={authenticationContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
