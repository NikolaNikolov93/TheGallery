import styles from "./Header.module.css";
import { Link } from "react-router-dom";
export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.ulStyles}>
                    <li className={styles.liStyles}>
                        <Link to="/">
                            <div className={styles.logoImage}></div>
                        </Link>
                    </li>
                    <li className={styles.liStyles}>
                        <Link className={styles.navLinks} to="/">
                            Home
                        </Link>
                    </li>
                    <li className={styles.liStyles}>
                        <a className={styles.navLinks} href="#">
                            Creators
                        </a>
                    </li>
                    <li className={styles.liStyles}>
                        <a className={styles.navLinks} href="#">
                            Add Picture
                        </a>
                    </li>
                    <li className={styles.liStyles}>
                        <a className={styles.navLinks} href="#">
                            Login
                        </a>
                    </li>

                    <li className={styles.liStyles}>
                        <Link className={styles.navLinks} to="/register">
                            Register
                        </Link>
                    </li>
                    <li className={styles.liStyles}>
                        <a className={styles.navLinks} href="#">
                            Logout
                        </a>
                    </li>
                </ul>
            </nav>
            <div className={styles.logo}>The Gallery</div>
        </header>
    );
}
