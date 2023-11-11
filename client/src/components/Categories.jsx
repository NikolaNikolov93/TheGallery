import styles from "./Categories.module.css";
import DividerCategoryLine from "./DividerCategoryLine";
import SingleCategory from "./SingleCategory";
import { useEffect, useState, useRef } from "react";
import * as categoriesServices from "../services/categoriesServices";

export default function Categories() {
    const [categories, setCategoreis] = useState([]);
    useEffect(() => {
        categoriesServices
            .getAll()
            .then((categories) => setCategoreis(categories))
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <DividerCategoryLine />
            <section className={styles.categoriesContainer}>
                {categories.map((category) => (
                    <SingleCategory
                        key={category._id}
                        url={category.url}
                        description={category.description}
                    />
                ))}
            </section>
        </>
    );
}
