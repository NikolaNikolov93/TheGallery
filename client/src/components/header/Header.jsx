import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/TheGalleryLogo.png";
import React, { useContext, useState } from "react";
import Login from "../login/Login";
import Register from "../register/Register";
import AuthContext from "../contexts/authContext";

export default function Header() {
    // const [showLogin, setShowLogin] = useState(false);
    const {
        closeLoginModal,
        openLoginModal,
        showLogin,
        closeRegisterModal,
        openRegisterModal,
        showRegister,
        logoutHandler,
        isAuthenticated,
        username,
        email,
    } = useContext(AuthContext);
    // const [showRegister, setShowRegister] = useState(false);

    return (
        <>
            {showLogin && (
                <Login
                    closeLoginModal={closeLoginModal}
                    openRegisterModal={openRegisterModal}
                />
            )}
            {showRegister && (
                <Register
                    closeRegisterModal={closeRegisterModal}
                    openLoginModal={openLoginModal}
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
                                {!isAuthenticated && (
                                    <>
                                        <li>
                                            <Link
                                                className={styles.navLinks}
                                                onClick={openLoginModal}
                                                to="/#"
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className={styles.navLinks}
                                                onClick={openRegisterModal}
                                                to="/#"
                                            >
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {isAuthenticated && (
                                    <>
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
                                                onClick={logoutHandler}
                                                className={styles.navLinks}
                                                to="/#"
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                        {isAuthenticated && (
                            <>
                                <div className={styles.userMessage}>
                                    <span>Welcome, </span>
                                    <Link className={styles.navLinks} to="/#">
                                        {username}!
                                    </Link>
                                </div>
                            </>
                        )}
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
