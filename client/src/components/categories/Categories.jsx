import styles from "./Categories.module.css";
import CategoriesContext from "../contexts/categoriesContext";

import { useContext, useEffect, useState } from "react";

import DividerCategoryLine from "../divider/DividerCategoryLine";
import SingleCategory from "../single-category/SingleCategory";

export default function Categories() {
    const { categories } = useContext(CategoriesContext);

    // Filter by categoeries setup
    const [value, setValue] = useState("");
    const [filteredCategories, setFilteredCategories] = useState([]);

    /** UseEffect is triggered each time there is a change in the search bar which rerenders the element
     * and filter only the elements which include the text from the search bar
     */
    useEffect(() => {
        setFilteredCategories(categories);
    }, [categories]);

    /**Search bar  Onchange handler */
    const onChangeHandler = (e) => {
        const text = e.target.value.trim();
        if (text === "") {
            setValue(e.target.value);
            setFilteredCategories(categories);

            return;
        } else {
            setValue(text);
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
            {filteredCategories.length <= 0 ? (
                <h1 className={styles["missing-category"]}>
                    There are no categories matching your search!
                </h1>
            ) : (
                <section className={styles.categoriesContainer}>
                    {filteredCategories.map((category, index) => (
                        <SingleCategory
                            key={category._id}
                            url={category.url}
                            description={category.description}
                        />
                    ))}
                </section>
            )}
        </>
    );
}
