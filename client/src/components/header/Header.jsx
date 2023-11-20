import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/TheGalleryLogo.png";
import React, { useState } from "react";
import Login from "../login/Login";

export default function Header() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            {showLogin && <Login close={() => setShowLogin(false)} />}
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
                                        to="/register"
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
                            <Link className={styles.navLinks} to="/register">
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
