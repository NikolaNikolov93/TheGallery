import React from "react";
import styles from "../login/Login.module.css";
export default function Login() {
    return (
        <div className={styles.container}>
            <h2>Login</h2>
            <form className={styles.form}>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" />

                <button type="button">Login</button>
            </form>
        </div>
    );
}
