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
}) {
    const isOwner = owner === currentUser;
    const isLoggedIn = !!currentUser;

    const [isClicked, setIsClicked] = useState(false);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        likeServices
            .getAll()
            .then((likes) =>
                likes
                    ? likes.filter((like) => like.pictureId === pictureId)
                    : []
            )
            .then((likes) => setLikes(likes.length))
            .catch((err) => console.log(err));
    }, []);

    const likeButtonClickHandler = async () => {
        if (isClicked) {
            setLikes(likes - 1);
            console.log(pictureId);
            setIsClicked(false);
        } else {
            await likeServices.addLike(pictureId, currentUser, token);
            setLikes((state) => state + 1);
            setIsClicked(true);
        }
    };

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
                                        onClick={() => likeButtonClickHandler()}
                                        className={styles[`likeButtonLiked`]}
                                    >
                                        Liked
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => likeButtonClickHandler()}
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
            <p className={styles["likesCounter"]}>{`Likes: ${likes}`}</p>
        </div>
    );
}
