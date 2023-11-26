import styles from "../../components/pictureWrapper/PictureWrapper.module.css";
import { useState } from "react";
export default function PictureWrapper({ url, description }) {
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
        <div className={styles.wrapper}>
            <div
                className={styles.img}
                style={{ backgroundImage: `url(${url})` }}
            >
                <button className={styles.detailsButton}>Details</button>
                <p className={styles.headline}>{description}</p>
            </div>
            <div className={styles.buttonsWrapper}>
                <button
                    onClick={() => handleClick()}
                    className={styles[`likeButton${isClicked && "Liked"}`]}
                >
                    Like
                </button>
                <button className={styles.wrapperButton}>Edit</button>
                <button className={styles.wrapperButton}>Delete</button>
            </div>
            <div className={styles.likesCounter}>{likes}</div>
        </div>
    );
}
