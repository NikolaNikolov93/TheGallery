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

    const [pictures, setPictures] = useState([]);
    useEffect(() => {
        pictureServices
            .getAllPicturesOfSelectedCategory(categoryDefinition.category)
            .then((pictures) => setPictures(pictures))
            .catch((err) => console.log(err));
    }, []);
    /** checks if the URL param exist in the currently available categories */
    /* and provides a custom route guard to prevent making request to unexisting categories */
    const requestFilter = categories.filter(
        (category) => category.description === categoryDefinition.category
    );
    if (requestFilter.length === 0) {
        return <NotFound />;
    }

    const deleteButtonHandler = async (pictureId, token) => {
        const isConfirmed = window.confirm("Are you sure?");
        if (isConfirmed) {
            await pictureServices.remove(pictureId, token);
            setPictures((state) =>
                state.filter((picture) => picture._id != pictureId)
            );
        } else {
            console.log("User canceled");
        }
    };
    return (
        <div className={styles.container}>
            {pictures.length > 0 ? (
                pictures.map((picture) => (
                    <PictureWrapper
                        key={picture._id}
                        category={categoryDefinition.category}
                        pictureId={picture._id}
                        headline={picture.headline}
                        url={picture.url}
                        owner={picture._ownerId}
                        currentUser={userId}
                        username={username}
                        token={token}
                        deletePicutre={deleteButtonHandler}
                    />
                ))
            ) : (
                <p>There are no pictures yet!</p>
            )}
        </div>
    );
}
