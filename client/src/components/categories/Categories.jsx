import styles from "./Categories.module.css";
import { useContext } from "react";

import DividerCategoryLine from "../divider/DividerCategoryLine";
import SingleCategory from "../single-category/SingleCategory";

import CategoriesContext from "../contexts/categoriesContext";

export default function Categories() {
    const { categories } = useContext(CategoriesContext);

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
