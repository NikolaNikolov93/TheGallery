import styles from "../../components/pictureWrapper/PictureWrapper.module.css";
export default function PictureWrapper({ url, description }) {
    return (
        <div className={styles.wrapper}>
            <div
                className={styles.img}
                style={{ backgroundImage: `url(${url})` }}
            >
                <p>{description}</p>
            </div>
        </div>
    );
}
