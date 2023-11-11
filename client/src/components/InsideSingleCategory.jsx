import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./InsideSingleCategory.module.css";
import * as categoriesServices from "../services/categoriesServices";
import NotFound from "./NotFound";
export default function InsideSingleCategory() {
    const categoryDefinition = useParams();
    const [categories, setCategoreis] = useState([]);
    useEffect(() => {
        categoriesServices
            .getAll()
            .then((categories) => setCategoreis(categories))
            .catch((err) => console.log(err));
    }, []);
    let mappedCategories = categories.map((category) =>
        category.description.toLowerCase().replace(" ", "-")
    );
    for (const key in mappedCategories) {
        if (mappedCategories[key] === categoryDefinition.category) {
            /** checks if the URL param exist in the currently available categories */
            /* and rovides a custom route guard to prevent making request to unexisting categories */
            return (
                <div className={styles.container}>
                    <h1>{`Hello to ${categoryDefinition.category}!`}</h1>
                </div>
            );
        }
    }

    return <NotFound />;
}
