import styles from "./SingleCategory.module.css";
export default function SingeCategory({ url, description }) {
    return (
        <div className={styles.galleryImage}>
            <img src={url} />
            <p>{description}</p>
        </div>
    );
}
