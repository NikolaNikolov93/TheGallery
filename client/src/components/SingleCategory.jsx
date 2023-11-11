import styles from "./SingleCategory.module.css";
import { Link } from "react-router-dom";
const baseUrl = "http://localhost:5173/categories";

export default function SingleCategory({ url, description, categoriesRef }) {
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
        <div className={styles.galleryImage}>
            <Link to={hrefLink}>
                <img className={styles.image} src={url} />
                <p>{description}</p>
            </Link>
        </div>
    );
}
