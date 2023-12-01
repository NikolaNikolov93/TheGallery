import styles from "./Categories.module.css";
import DividerCategoryLine from "../divider/DividerCategoryLine";
import SingleCategory from "../single-category/SingleCategory";
import { useContext, useEffect, useState } from "react";
import * as categoriesServices from "../../services/categoriesServices";
import AuthContext from "../contexts/authContext";

export default function Categories() {
    const { categories } = useContext(AuthContext);
    // const [categories, setCategoreis] = useState([]);
    // useEffect(() => {
    //     categoriesServices
    //         .getAll()
    //         .then((categories) => setCategoreis(categories))
    //         .catch((err) => console.log(err));
    // }, []);
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
