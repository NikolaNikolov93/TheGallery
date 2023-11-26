import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/TheGalleryLogo.png";
import React, { useState } from "react";
import Login from "../login/Login";
import Register from "../register/Register";

export default function Header({ loginSubmitHandler }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <>
            {showLogin && (
                <Login
                    loginSubmitHandler={loginSubmitHandler}
                    closeLoginModal={() => setShowLogin(false)}
                    openRegisterModal={() => setShowRegister(true)}
                />
            )}
            {showRegister && (
                <Register
                    closeRegisterModal={() => setShowRegister(false)}
                    openLoginModal={() => setShowLogin(true)}
                />
            )}

            <header>
                <div className={styles.headerContent}>
                    <div className={styles.headerInner}>
                        <Link to="/">
                            <div className={styles.logoWrapper}>
                                <img className={styles.logoImg} src={logo} />
                            </div>
                        </Link>
                        <nav>
                            <ul>
                                <li>
                                    <Link className={styles.navLinks} to="/">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={styles.navLinks}
                                        to="creators"
                                    >
                                        Creators
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={styles.navLinks}
                                        onClick={() => setShowLogin(true)}
                                        to="/#"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={styles.navLinks}
                                        to="/create-image"
                                    >
                                        Add Image
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={styles.navLinks}
                                        onClick={() => setShowRegister(true)}
                                        to="/#"
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={styles.navLinks}
                                        to="/logout"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className={styles.userMessage}>
                            <span>Welcome, </span>
                            <Link className={styles.navLinks} to="/#">
                                user!
                            </Link>
                        </div>
                    </div>
                </div>
                <section className="container top">
                    <div className={styles.content}>
                        <div className="textSection">
                            <p>The Gallery</p>
                        </div>
                    </div>
                </section>
            </header>
        </>
    );
}
