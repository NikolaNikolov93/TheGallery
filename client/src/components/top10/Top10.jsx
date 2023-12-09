import styles from ".././top10/Top10.module.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import * as pictureServices from "../../services/pictureServices";
import * as likesServices from "../../services/likesServices";

export default function Top10() {
    const [pictures, setPictures] = useState([]);
    const [likes, setLikes] = useState([]);

    /** Setup for top10 page */
    useEffect(() => {
        pictureServices.getAll().then((result) => setPictures(result));
        likesServices.getAll().then((result) => setLikes(result));
    }, []);

    /**This is the final array that will hold the newly created picture object with likes ammount */
    const picutresWithLikes = [];

    /** the first loop loops thru the pictures, the second loops thru the likes and if the like is connected
     * to the picture pushes like id to the ammount like property
     */
    for (let i = 0; i < pictures.length; i++) {
        /** Empty object that will collect the current picture data */
        let pic = {};
        pic["amountLikes"] = [];
        pic["picId"] = pictures[i]._id;
        pic["headline"] = pictures[i].headline;
        pic["url"] = pictures[i].url;
        pic["category"] = pictures[i].category;

        for (let m = 0; m < likes.length; m++) {
            /**Pushes all likes that match the pictureId to the array */
            if (pictures[i]._id === likes[m].pictureId) {
                pic["amountLikes"].push(likes[m]._id);
            }
        }
        /** Pushes the newly created picutre object with all the likes to the array */
        picutresWithLikes.push(pic);
    }
    /** sorting by ammount of likes function for the array */
    function compareByLikes(a, b) {
        return b.amountLikes.length - a.amountLikes.length;
    }
    /**Sorted arrya that will be rendered on top10page */
    const sorted = picutresWithLikes.sort(compareByLikes).slice(0, 10);

    return (
        <>
            <div className={styles["container"]}>
                {sorted.map((picture, index) => (
                    <div
                        key={picture.picId}
                        className={
                            /**Sets the first element from the array as the most liked picutre
                             * by adding different class
                             */
                            index === 0
                                ? styles["wrapper-first-place"]
                                : styles["wrapper"]
                        }
                        /**Onclick on the image --> relocate to the current picutre details page */
                    >
                        <Link
                            to={`/${picture.category}/${picture.picId}/details`}
                        >
                            <div
                                className={styles["img"]}
                                style={{
                                    backgroundImage: `url(${picture.url})`,
                                }}
                            ></div>
                        </Link>
                        <p>{`This post is number ${index + 1} on the list!`}</p>
                        <p>{`Headline: ${picture["headline"]}`}</p>
                        <p>Likes: {picture.amountLikes.length}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
