import styles from "../../components/pictureWrapper/PictureWrapper.module.css";
export default function PictureWrapper({ url, description }) {
    return (
        <div className={styles.wrapper}>
            <div
                className={styles.img}
                style={{ backgroundImage: `url(${url})` }}
            >
                <p className={styles.headline}>{description}</p>
            </div>
            <button className={styles.button}>Like</button>
            <button className={styles.button}>Edit</button>
            <button className={styles.button}>Delete</button>
        </div>
    );
}
