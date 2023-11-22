import React from "react";
import styles from "./Register.module.css";
export default function Register({ closeRegisterModal, openLoginModal }) {
    const relocate = () => {
        closeRegisterModal();
        openLoginModal();
    };
    const closeOnEscapeKey = (target) => {
        if (target.code === "Escape") {
            closeRegisterModal();
            return;
        }
        return;
    };
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
                <h2>Register</h2>
                <form>
                    <label htmlFor="username">Username:</label>
                    <input
                        autoFocus
                        placeholder="Type your username"
                        type="text"
                        id="username"
                        name="username"
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        placeholder="Type your email"
                        type="email"
                        id="email"
                        name="email"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        placeholder="Type your password"
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                    <label htmlFor="repeat-password">Repeat password:</label>
                    <input
                        placeholder="Repeat password"
                        type="repeat-password"
                        id="repeat-password"
                        name="repeat-password"
                        required
                    />

                    <button type="submit">Register</button>
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
