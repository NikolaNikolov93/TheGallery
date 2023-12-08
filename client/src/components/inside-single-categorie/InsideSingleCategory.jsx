import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import styles from "./InsideSingleCategory.module.css";

import * as pictureServices from "../../services/pictureServices";

import NotFound from "../notFound/NotFound";
import PictureWrapper from "../pictureWrapper/PicutreWrapper";

import CategoriesContext from "../contexts/categoriesContext";
import AuthContext from "../contexts/authContext";
import Pagination from "../pagination/Pagination";

export default function InsideSingleCategory() {
    /* Setup for custom route guard */
    const categoryDefinition = useParams();
    const { categories } = useContext(CategoriesContext);
    const { userId, token, username } = useContext(AuthContext);
    //pagination setup
    const [currentPage, setCurrentPage] = useState(1);
    const [picsPerPage] = useState(4);
    //pictures fetch
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
    const indexOfLastPic = currentPage * picsPerPage;
    const indexOfFirstPic = indexOfLastPic - picsPerPage;
    const currentPics = pictures.slice(indexOfFirstPic, indexOfLastPic);
    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className={styles.container}>
                {pictures.length > 0 ? (
                    currentPics.map((picture) => (
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
                    <div className={styles["missing-content"]}>
                        <p className={styles["missing-content-msg"]}>
                            There are no pictures in this category yet!
                        </p>
                    </div>
                )}
            </div>
            <div className={styles["pagination-container"]}>
                <Pagination
                    picsPerPage={picsPerPage}
                    totalPics={pictures.length}
                    paginate={paginate}
                />
            </div>
        </>
    );
}
