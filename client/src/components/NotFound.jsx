import React from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.h1NotFound}>404 - Not Found</h1>
            <p className={styles.h1P}>
                Oops! We are missing this type of art...
            </p>
            {/* You can add additional content or links here */}
        </div>
    );
};

export default NotFound;
