import React from "react";
import styles from "../login/Login.module.css";
export default function Login({ close }) {
    const closeOnEscapeKey = (target) => {
        if (target.code === "Escape") {
            close();
            return;
        }
        return;
    };
    const closeOnBackdropClick = (event) => {
        const backDropElement = document.getElementById("backDrop");
        if (event.target.className === backDropElement.className) {
            close();
            return;
        }
        return;
    };
    return (
        <div onKeyDown={closeOnEscapeKey}>
            <div
                id="backDrop"
                className={styles.modal}
                onClick={closeOnBackdropClick}
            >
                <div className={styles["modal-content"]}>
                    <span className={styles["close"]} onClick={close}>
                        &times;
                    </span>
                    <h2>Login</h2>
                    <form>
                        <label>
                            Username:
                            <input
                                placeholder="Type your username"
                                autoFocus
                                type="text"
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                placeholder="Type your password"
                                type="password"
                            />
                        </label>
                        <br />
                        <button type="button">Login</button>
                        <span className={styles["register-redirection"]}>
                            <div>
                                Don't have registration?{" "}
                                <a href="/#">Register</a>
                            </div>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}
