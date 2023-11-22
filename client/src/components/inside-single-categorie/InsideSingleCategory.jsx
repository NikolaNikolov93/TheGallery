import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./InsideSingleCategory.module.css";
import * as categoriesServices from "../../services/categoriesServices";
import * as pictureServices from "../../services/pictureServices";
import NotFound from "../notFound/NotFound";
export default function InsideSingleCategory() {
    /* Setup for custom route guard */
    const categoryDefinition = useParams();
    const [categories, setCategoreis] = useState([]);
    useEffect(() => {
        categoriesServices
            .getAll()
            .then((categories) => setCategoreis(categories))
            .catch((err) => console.log(err));
    }, []);
    let mappedCategories = categories.map((category) =>
        category.description.toLowerCase().replace(" ", "-")
    );
    /** filters the pictures by category */
    const [pictures, setPictures] = useState([]);
    useEffect(() => {
        pictureServices
            .getAll()
            .then((pictures) => setPictures(pictures))
            .catch((err) => console.log(err));
    }, []);
    let filteredPictures = pictures.filter(
        (picture) =>
            picture.category ===
            categoryDefinition.category.toLowerCase().replace("-", " ")
    );
    for (const category in mappedCategories) {
        if (mappedCategories[category] === categoryDefinition.category) {
            /** checks if the URL param exist in the currently available categories */
            /* and provides a custom route guard to prevent making request to unexisting categories */
            return (
                <div className={styles.container}>
                    {filteredPictures.length > 0 ? (
                        filteredPictures.map((picture) => (
                            <p key={picture._id}>{picture.description}</p>
                        ))
                    ) : (
                        <p>There are no pictures yet!</p>
                    )}
                </div>
            );
        }
    }

    return <NotFound />;
}
