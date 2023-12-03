import styles from "./SingleCategory.module.css";
import { Link } from "react-router-dom";
const baseUrl = "http://localhost:5173";

export default function SingleCategory({ url, description }) {
    const hrefLink = `${baseUrl}/${description
        .toLowerCase()
        .replace(/ /g, "-")}`;
    // const mappedCategories = categoriesRef.map((cat) =>
    //     cat.description.toLowerCase().replace(" ", "-")
    // );
    // if (!mappedCategories.includes(description)) {
    //     console.log("OH NO !");
    // }
    return (
        <Link className={styles.linkContainer} to={hrefLink}>
            <div
                className={styles.galleryImage}
                style={{ backgroundImage: `url(${url})` }}
                ata-bkg-img={url}
            >
                <p>{description.toUpperCase().replace("-", " ")}</p>
            </div>
        </Link>
    );
}
