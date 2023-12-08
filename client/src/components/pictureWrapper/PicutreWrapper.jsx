import styles from "../../components/pictureWrapper/PictureWrapper.module.css";

import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import * as likeServices from "../../services/likesServices";

export default function PictureWrapper({
    category,
    pictureId,
    url,
    headline,
    owner,
    currentUser,
    token,
    username,
    deletePicutre,
}) {
    const navigate = useNavigate();
    /** Like button state --> On it's state depends the button funcionality and style.(remove or add like) */
    const [isClicked, setIsClicked] = useState(false);

    /** Likes tate is used to visualize the current ammount of likes */
    const [likes, setLikes] = useState([]);

    /** This is used to check if the current image is alredy liked by the user and sets the state  */
    useEffect(() => {
        likeServices
            .getAllPictureLikes(pictureId)
            .then((pictureLikes) =>
                pictureLikes.find((like) => like._ownerId === currentUser)
            )
            .then((isLiked) => setIsClicked(!!isLiked));
    });

    /**Sets current amount of likes */
    useEffect(() => {
        likeServices
            .getAllPictureLikes(pictureId)
            .then((likes) => setLikes(likes))
            .catch((err) => console.log(err));
    }, []);

    /** Filters the likes array to find the like of the current user. It's used to remove the like from the database */
    const userLike = likes.filter((like) => like._ownerId === currentUser);

    const likeButtonClickHandler = async (userLike) => {
        if (isClicked) {
            const deletedLike = await likeServices.removeLike(
                userLike[0]._id,
                token
            );
            setLikes((state) =>
                state.filter((like) => like._id != userLike[0]._id)
            );
        } else {
            const newLike = await likeServices.addLike(
                pictureId,
                currentUser,
                username,
                token
            );
            setLikes((state) => [...state, newLike]);
        }
    };

    const isOwner = owner === currentUser;
    const isLoggedIn = !!currentUser;
    return (
        <div
            className={styles[`${isLoggedIn ? "wrapper" : "wrapperLoggedOut"}`]}
        >
            <div
                className={styles["img"]}
                style={{ backgroundImage: `url(${url})` }}
            >
                {isLoggedIn && <></>}
            </div>
            {isLoggedIn && (
                <>
                    <div className={styles["buttonsWrapper"]}>
                        <Link to={`/${category}/${pictureId}/details`}>
                            <button className={styles["detailsButton"]}>
                                Details
                            </button>
                        </Link>

                        {!isOwner && (
                            <>
                                {isClicked ? (
                                    <button
                                        onClick={() =>
                                            likeButtonClickHandler(userLike)
                                        }
                                        className={styles[`likeButtonLiked`]}
                                    >
                                        Liked
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            likeButtonClickHandler(userLike)
                                        }
                                        className={styles[`likeButton`]}
                                    >
                                        Like
                                    </button>
                                )}
                            </>
                        )}

                        {isOwner && (
                            <>
                                <Link to={`/${category}/${pictureId}/edit`}>
                                    <button
                                        className={styles["editButton"]}
                                        // onClick={() => console.log(pictureId)}
                                    >
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    className={styles["deleteButton"]}
                                    onClick={() =>
                                        deletePicutre(pictureId, token)
                                    }
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}
            <p className={styles["headline"]}>{headline}</p>
            <p className={styles["likesCounter"]}>{`Likes: ${likes.length}`}</p>
        </div>
    );
}
