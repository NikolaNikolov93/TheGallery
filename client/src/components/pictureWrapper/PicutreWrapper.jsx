import styles from "../../components/pictureWrapper/PictureWrapper.module.css";
import { useState } from "react";
export default function PictureWrapper({ url, headline, owner, currentUser }) {
    const isOwner = owner === currentUser;
    const isLoggedIn = !!currentUser;

    const [likes, setLikes] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        if (isClicked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsClicked(!isClicked);
    };

    return (
        <div
            className={styles[`${isLoggedIn ? "wrapper" : "wrapperLoggedOut"}`]}
        >
            <div
                className={styles.img}
                style={{ backgroundImage: `url(${url})` }}
            >
                {isLoggedIn && (
                    <>
                        <button className={styles.detailsButton}>
                            Details
                        </button>
                    </>
                )}

                <p className={styles.headline}>{headline}</p>
            </div>
            {isLoggedIn && (
                <>
                    <div className={styles.buttonsWrapper}>
                        {!isOwner && (
                            <>
                                {isClicked ? (
                                    <button
                                        onClick={() => handleClick()}
                                        className={styles[`likeButtonLiked`]}
                                    >
                                        Liked
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleClick()}
                                        className={styles[`likeButton`]}
                                    >
                                        Like
                                    </button>
                                )}
                            </>
                        )}

                        {isOwner && (
                            <>
                                <button className={styles.wrapperButton}>
                                    Edit
                                </button>
                                <button className={styles.wrapperButton}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}
            <div className={styles.likesCounter}>{`Likes: ${likes}`}</div>
        </div>
    );
}
