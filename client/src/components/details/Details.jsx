import { useEffect, useState } from "react";
import styles from "../../components/details/Details.module.css";
import { Link, useParams } from "react-router-dom";
import * as pictureServices from "../../services/pictureServices";
import NotFound from "../notFound/NotFound";
import transformTimestamp from "../../utils/transformTimestamp";

export default function Details() {
    const [pictureData, setPictureData] = useState([]);
    const { category, pictureId } = useParams();

    useEffect(() => {
        pictureServices
            .getOne(pictureId)
            .then((pictureData) => setPictureData(pictureData));
    }, []);
    const uploadedDate = transformTimestamp(pictureData._createdOn);

    return pictureData.code === 404 ? (
        <NotFound />
    ) : (
        <div className={styles.pageContainer}>
            <h1 className={styles.headline}>{pictureData.headline}</h1>
            <div className={styles.pictureDetailsContainer}>
                <img
                    src={pictureData.url}
                    alt="aurora"
                    className={styles.pictureImage}
                />

                <div className={styles.detailsSection}>
                    <p>
                        <span>Image uploaded by:</span> {pictureData.username}
                    </p>
                    <p>
                        <span>{`${pictureData.username}'s contacts:`}</span>{" "}
                        {pictureData.email}
                    </p>
                    <p>
                        <span>Uploaded on:</span> {uploadedDate}
                    </p>
                    <p>
                        <span>Category:</span>{" "}
                        <Link className={styles.link} to={`/${category}`}>
                            {pictureData.category}
                        </Link>
                    </p>
                    <p>
                        <span>Desctiption:</span> {pictureData.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
