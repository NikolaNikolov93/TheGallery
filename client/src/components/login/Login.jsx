import React from "react";
import styles from "../login/Login.module.css";
export default function Login({ close, backDropClick }) {
    const closeOnEscapeKey = (target) => {
        if (target.code === "Escape") {
            close();
            return;
        }
        return;
    };
    const closeOnBackdropClick = (event) => {
        if (event.target.className === "_modal_2eh81_1") {
            close();
            return;
        }
        return;
    };
    return (
        <div onKeyDown={closeOnEscapeKey}>
            <div className={styles.modal} onClick={closeOnBackdropClick}>
                <div className={styles["modal-content"]}>
                    <span className={styles["close"]} onClick={close}>
                        &times;
                    </span>
                    <h2>Login</h2>
                    <form>
                        <label>
                            Username:
                            <input type="text" />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" />
                        </label>
                        <br />
                        <button type="button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
