import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>
                This site is designed by Nikola Nikolov to be used for training
                purposes at SoftUni &copy;.
            </p>
        </footer>
    );
}
