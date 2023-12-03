import styles from "../../components/pictureWrapper/PictureWrapper.module.css";
import { useEffect, useState } from "react";
import * as likeServices from "../../services/likesServices";
export default function PictureWrapper({
    pictureId,
    url,
    headline,
    owner,
    currentUser,
    token,
    username,
}) {
    const [isClicked, setIsClicked] = useState(false);
    const [likes, setLikes] = useState([]);
    useEffect(() => {
        likeServices
            .getAllPictureLikes(pictureId)
            .then((pictureLikes) =>
                pictureLikes.find((like) => like._ownerId === currentUser)
            )
            .then((isLiked) => setIsClicked(!!isLiked));
    });

    useEffect(() => {
        likeServices
            .getAllPictureLikes(pictureId)
            .then((likes) => setLikes(likes))
            .catch((err) => console.log(err));
    }, []);
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
                        <button
                            className={styles["detailsButton"]}
                            onClick={() => console.log(pictureId)}
                        >
                            Details
                        </button>
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
                                <button
                                    className={styles["editButton"]}
                                    onClick={() => console.log(pictureId)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={styles["deleteButton"]}
                                    onClick={() => console.log(pictureId)}
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
