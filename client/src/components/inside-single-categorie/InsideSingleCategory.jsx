import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import styles from "./InsideSingleCategory.module.css";

import * as pictureServices from "../../services/pictureServices";

import NotFound from "../notFound/NotFound";
import PictureWrapper from "../pictureWrapper/PicutreWrapper";

import CategoriesContext from "../contexts/categoriesContext";
import AuthContext from "../contexts/authContext";

export default function InsideSingleCategory() {
    /* Setup for custom route guard */
    const categoryDefinition = useParams();
    const { categories } = useContext(CategoriesContext);
    const { userId, token, username } = useContext(AuthContext);

    let mappedCategories = categories.map((category) =>
        category.description.toLowerCase().replace(" ", "-")
    );

    const [pictures, setPictures] = useState([]);
    useEffect(() => {
        pictureServices
            .getAllPicturesOfSelectedCategory(categoryDefinition.category)
            .then((pictures) => setPictures(pictures))
            .catch((err) => console.log(err));
    }, []);

    for (const category in mappedCategories) {
        if (mappedCategories[category] === categoryDefinition.category) {
            /** checks if the URL param exist in the currently available categories */
            /* and provides a custom route guard to prevent making request to unexisting categories */
            return (
                <div className={styles.container}>
                    {pictures.length > 0 ? (
                        pictures.map((picture) => (
                            <PictureWrapper
                                key={picture._id}
                                pictureId={picture._id}
                                headline={picture.headline}
                                url={picture.url}
                                owner={picture._ownerId}
                                currentUser={userId}
                                username={username}
                                token={token}
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
