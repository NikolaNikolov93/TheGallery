import styles from "../login/Login.module.css";

import React, { useContext, useMemo } from "react";

import AuthContext from "../contexts/authContext";

import useForm from "../../hooks/useFrom";

const LoginFromKeys = {
    Email: "email",
    Password: "password",
};

export default function Login() {
    /**States and eror handling are managed in authContext */
    const {
        loginSubmitHandler,
        closeLoginModal,
        openRegisterModal,
        hasError,
        errorMsg,
        errorCleanup,
    } = useContext(AuthContext);

    /**useMemo is used to avoid infinite loops in the components
     * With this initial values setup we refer to the same object instead of making new one
     */
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

    /**Callback function for relocation*/
    const relocate = () => {
        closeLoginModal();
        openRegisterModal();
    };

    /**Callback function for closing the modal on Escape keyboard button click */
    const closeOnEscapeKey = (target) => {
        if (target.code === "Escape") {
            closeLoginModal();
            return;
        }
        return;
    };

    /**Callback function for closing the modal onClick outside the form */
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
                    <p className={styles["formHeadline"]}>Login</p>
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
