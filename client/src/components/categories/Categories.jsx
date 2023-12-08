import styles from "./Categories.module.css";
import { useContext, useEffect, useState } from "react";

import DividerCategoryLine from "../divider/DividerCategoryLine";
import SingleCategory from "../single-category/SingleCategory";

import CategoriesContext from "../contexts/categoriesContext";

export default function Categories() {
    const { categories } = useContext(CategoriesContext);
    const [value, setValue] = useState("");
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        setFilteredCategories(categories);
    }, [categories]);

    const onChangeHandler = (e) => {
        const text = e.target.value.trim();
        if (text === "") {
            setValue(e.target.value);
            setFilteredCategories(categories);
            return;
        } else {
            setValue(text);
            console.log(text);

            let newArr = [];
            categories.forEach((category) => {
                if (category.description.includes(text)) {
                    newArr.push(category);
                }
            });
            setFilteredCategories(newArr);
        }
    };

    return (
        <>
            <DividerCategoryLine />
            <div className={styles["search-container"]}>
                <p>Search by category</p>
                <input
                    onChange={(e) => onChangeHandler(e)}
                    autoFocus
                    type="text"
                    placeholder="Search..."
                    value={value}
                />
            </div>

            <section className={styles.categoriesContainer}>
                {filteredCategories.map((category, index) => (
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
