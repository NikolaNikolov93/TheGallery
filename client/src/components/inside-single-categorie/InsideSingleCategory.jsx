import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./InsideSingleCategory.module.css";
import * as categoriesServices from "../../services/categoriesServices";
import * as pictureServices from "../../services/pictureServices";
import NotFound from "../notFound/NotFound";
import PictureWrapper from "../pictureWrapper/PicutreWrapper";
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

    const [pictures, setPictures] = useState([]);
    useEffect(() => {
        pictureServices
            .getAll()
            .then((pictures) => setPictures(pictures))
            .catch((err) => console.log(err));
    }, []);

    /** filters the pictures by category */
    let filteredPictures = pictures.filter(
        (picture) =>
            picture.category.toLowerCase().replace("-", " ") ===
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
                            <PictureWrapper
                                key={picture._id}
                                description={picture.description}
                                url={picture.url}
                            />
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
