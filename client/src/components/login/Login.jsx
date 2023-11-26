import useForm from "../../hooks/useFrom";
import React from "react";
import styles from "../login/Login.module.css";
export default function Login({ closeLoginModal, openRegisterModal }) {
    const { values, onChange, onSubmit } = useForm({
        username: "",
        password: "",
    });
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
                    <form onSubmit={onSubmit}>
                        <label>
                            Username:
                            <input
                                placeholder="Type your username"
                                autoFocus
                                type="text"
                                id="username"
                                name="username"
                                onChange={onChange}
                                value={values.username}
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                placeholder="Type your password"
                                type="password"
                                id="password"
                                name="password"
                                onChange={onChange}
                                value={values.password}
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
