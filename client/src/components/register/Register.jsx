import React, { useContext, useMemo } from "react";
import styles from "./Register.module.css";
import AuthContext from "../contexts/authContext";
import useForm from "../../hooks/useFrom";
export default function Register() {
    const RegisterFormKeys = {
        Email: "email",
        Password: "password",
        Repass: "repeat-password",
        Username: "username",
    };

    /**States and error handling are managed by authContext */
    const {
        openLoginModal,
        closeRegisterModal,
        registerSubmitHandler,
        hasError,
        errorMsg,
        errorCleanup,
    } = useContext(AuthContext);

    /**useMemo is used to avoid infinite loops in the component
     * by refereing to the same object in memory instead of making new one
     */
    const initialValues = useMemo(
        () => ({
            [RegisterFormKeys.Email]: "",
            [RegisterFormKeys.Username]: "",
            [RegisterFormKeys.Password]: "",
            [RegisterFormKeys.Repass]: "",
        }),
        []
    );

    /**Custom form handler */
    const { values, onChange, onSubmit } = useForm(
        registerSubmitHandler,
        initialValues,
        errorCleanup
    );

    /**Callback function for relocating  */
    const relocate = () => {
        closeRegisterModal();
        openLoginModal();
    };

    /**Callback function for closing the modal on Escabe kyeboard button click */
    const closeOnEscapeKey = (target) => {
        if (target.code === "Escape") {
            closeRegisterModal();
            return;
        }
        return;
    };

    /**Callback function for closing the modal onClick outside of the form */
    const closeOnBackdropClick = (event) => {
        const backDropElement = document.getElementById("registerBackDrop");
        if (event.target.className === backDropElement.className) {
            closeRegisterModal();
            return;
        }
        return;
    };
    return (
        <div
            onClick={closeOnBackdropClick}
            onKeyDown={closeOnEscapeKey}
            id="registerBackDrop"
            className={styles["modal"]}
        >
            <div className={styles["modal-content"]}>
                <span className={styles["close"]} onClick={closeRegisterModal}>
                    &times;
                </span>
                <p className={styles["formHeadline"]}>Register</p>
                {hasError && (
                    <>
                        <p className={styles["errorMsg"]}>{errorMsg}</p>
                    </>
                )}
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        required
                        autoFocus
                        placeholder="Type your username"
                        type="text"
                        id="username"
                        name="username"
                        onChange={onChange}
                        value={values[RegisterFormKeys.Username]}
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        required
                        placeholder="Type your email"
                        type="email"
                        id="email"
                        name="email"
                        onChange={onChange}
                        value={values[RegisterFormKeys.Email]}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        autoComplete="off"
                        required
                        placeholder="Type your password"
                        type="password"
                        id="password"
                        name="password"
                        onChange={onChange}
                        value={values[RegisterFormKeys.Password]}
                    />
                    <label htmlFor="repeat-password">Repeat password:</label>
                    <input
                        autoComplete="off"
                        required
                        placeholder="Repeat password"
                        type="password"
                        id="repeat-password"
                        name="repeat-password"
                        onChange={onChange}
                        value={values[RegisterFormKeys.Repass]}
                    />

                    <button type="submit" className={styles.registerButton}>
                        Register
                    </button>
                    <span className={styles["login-redirection"]}>
                        <div>
                            Already have registration?{" "}
                            <a onClick={relocate} href="/#">
                                Login
                            </a>
                        </div>
                    </span>
                </form>
            </div>
        </div>
    );
}
