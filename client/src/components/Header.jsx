import styles from "./Header.module.css";
export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.ulStyles}>
                    <li className={styles.logoImageLiItem}>
                        <a href="/#">
                            <div className={styles.logoImage}></div>
                        </a>
                    </li>
                    <li className={styles.liStyles}>
                        <a className={styles.navLinks} href="#">
                            Home
                        </a>
                    </li>
                    <li className={styles.liStyles}>
                        <a className={styles.navLinks} href="#">
                            Gallery
                        </a>
                    </li>
                    <li className={styles.liStyles}>
                        <a className={styles.navLinks} href="#">
                            Creators
                        </a>
                    </li>
                    <li className={styles.liStyles}>
                        <a className={styles.navLinks} href="#">
                            Login
                        </a>
                    </li>
                    <li className={styles.liStyles}>
                        <a className={styles.navLinks} href="#">
                            Register
                        </a>
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
