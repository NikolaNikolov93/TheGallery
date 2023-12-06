import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../../services/authService";

import Path from "../../paths";

import usePeristedState from "../../hooks/usePersistedState";
import formValidator from "../../utils/formValidator";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [hasError, setError] = useState(false);
    const navigate = useNavigate();

    const errorCleanup = () => {
        setError(false);
        setErrorMsg("");
    };

    /**Authentication state */
    const [auth, setAuth] = usePeristedState("auth", {});

    /** Lifted state for the Login From */
    const [showLogin, setShowLogin] =
        usePeristedState(
            false
        ); /** usePersistedState is custom hook for persisting the state in the localStorage */
    const closeLoginModal = () => {
        setShowLogin(false);
        errorCleanup();
    };
    const openLoginModal = () => {
        setShowLogin(true);
    };

    const loginSubmitHandler = async (values) => {
        const validationResult = formValidator(values);
        console.log(validationResult);
        if (!validationResult.isValid) {
            setError(true);
            setErrorMsg(validationResult.errorMessage);
            throw new Error(validationResult.errorMessage);
        }
        const response = await authService.login(values.email, values.password);

        if (response["code"]) {
            setError(true);
            setErrorMsg(response.message);
            return;
        } else if (response["accessToken"]) {
            setAuth(response);
            localStorage.setItem("accessToken", response.accessToken);
            closeLoginModal();
        }
    };

    /** Lifted state for the Register From */
    const [showRegister, setShowRegister] = useState(false);
    const closeRegisterModal = () => {
        setShowRegister(false);
        errorCleanup();
    };
    const openRegisterModal = () => {
        setShowRegister(true);
    };
    const registerSubmitHandler = async (values) => {
        const validationResult = formValidator(values);
        console.log(validationResult);
        if (!validationResult.isValid) {
            setError(true);
            setErrorMsg(validationResult.errorMessage);
            throw new Error(validationResult.errorMessage);
        }
        const response = await authService.register(
            values.email,
            values.password,
            values.username
        );
        if (response["code"]) {
            setError(true);
            setErrorMsg(response.message);
            return;
        } else if (response["accessToken"]) {
            setAuth(response);
            localStorage.setItem("accessToken", response.accessToken);
            closeRegisterModal();
        }
    };

    /**Logout handler */
    const logoutHandler = async (token) => {
        await authService.logout(token);
        setAuth({});
        localStorage.removeItem("accessToken");
        navigate(Path.home);
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
        hasError,
        errorMsg,
        errorCleanup,
        username: auth.username,
        email: auth.email,
        isAuthenticated: !!auth.accessToken,
        userId: auth._id,
        token: auth.accessToken,
    };
    return (
        <AuthContext.Provider value={authenticationContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
