import useForm from "../../hooks/useFrom";
import React, { useContext, useMemo } from "react";
import styles from "../login/Login.module.css";
import AuthContext from "../contexts/authContext";

const LoginFromKeys = {
    Email: "email",
    Password: "password",
};

export default function Login() {
    const {
        loginSubmitHandler,
        closeLoginModal,
        openRegisterModal,
        hasError,
        errorMsg,
        errorCleanup,
    } = useContext(AuthContext);
    const initialValues = useMemo(
        () => ({
            [LoginFromKeys.Email]: "",
            [LoginFromKeys.Password]: "",
        }),
        []
    );
    const { values, onChange, onSubmit } = useForm(
        loginSubmitHandler,
        initialValues,
        errorCleanup
    );
    const relocate = () => {
        closeLoginModal();
        openRegisterModal();
    };
    const closeOnEscapeKey = (target) => {
        if (target.code === "Escape") {
            closeLoginModal();
            return;
        }
        return;
    };
    const closeOnBackdropClick = (event) => {
        const backDropElement = document.getElementById("loginBackDrop");
        if (event.target.className === backDropElement.className) {
            closeLoginModal();
            return;
        }
        return;
    };
    return (
        <div onKeyDown={closeOnEscapeKey}>
            <div
                id="loginBackDrop"
                className={styles.modal}
                onClick={closeOnBackdropClick}
            >
                <div className={styles["modal-content"]}>
                    <span className={styles["close"]} onClick={closeLoginModal}>
                        &times;
                    </span>
                    <h2>Login</h2>
                    {hasError && (
                        <>
                            <p className={styles["errorMsg"]}>{errorMsg}</p>
                        </>
                    )}
                    <form onSubmit={onSubmit}>
                        <label>
                            Email:
                            <input
                                required
                                placeholder="Type your email"
                                autoFocus
                                type="text"
                                id="email"
                                name={LoginFromKeys.Email}
                                onChange={onChange}
                                value={values[LoginFromKeys.Email]}
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                autoComplete="off"
                                required
                                placeholder="Type your password"
                                type="password"
                                id="password"
                                name={LoginFromKeys.Password}
                                onChange={onChange}
                                value={values[LoginFromKeys.Password]}
                            />
                        </label>
                        <br />
                        <button type="submit" className={styles.loginButton}>
                            Login
                        </button>
                        <span className={styles["register-redirection"]}>
                            <div>
                                Don't have registration?{" "}
                                <a onClick={relocate} href="/#">
                                    Register
                                </a>
                            </div>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}
