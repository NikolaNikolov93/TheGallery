import { useEffect, useState } from "react";
import * as pictureServices from "../../services/pictureServices";
import * as likesServices from "../../services/likesServices";
import styles from ".././top10/Top10.module.css";
import { Link } from "react-router-dom";

export default function Top10() {
    const [pictures, setPictures] = useState([]);
    const [likes, setLikes] = useState([]);
    /** Setup for top10 page */
    useEffect(() => {
        pictureServices.getAll().then((result) => setPictures(result));
        likesServices.getAll().then((result) => setLikes(result));
    }, []);
    /** Empty array that will collect objects of pictureID and array of like IDs associated with the picture */

    /** the first loop loops thru the pictures, the second loops thru the likes and if the like is connected
     * to the picture pushes like id to the ammount like property
     */

    const picutresWithLikes = [];

    for (let i = 0; i < pictures.length; i++) {
        let pic = {};
        pic["amountLikes"] = [];
        pic["picId"] = pictures[i]._id;
        pic["headline"] = pictures[i].headline;
        pic["url"] = pictures[i].url;
        pic["category"] = pictures[i].category;

        for (let m = 0; m < likes.length; m++) {
            if (pictures[i]._id === likes[m].pictureId) {
                pic["amountLikes"].push(likes[m]._id);
            }
        }
        /** Pushes the newly created picutre object with all the likes to the array */
        picutresWithLikes.push(pic);
    }
    /** sorting function for the array */
    function compareByLikes(a, b) {
        return b.amountLikes.length - a.amountLikes.length;
    }
    const sorted = picutresWithLikes.sort(compareByLikes);

    return (
        <>
            <div className={styles["container"]}>
                {sorted.map((picture, index) => (
                    <div
                        key={picture.picId}
                        className={
                            index === 0
                                ? styles["wrapper-first-place"]
                                : styles["wrapper"]
                        }
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
