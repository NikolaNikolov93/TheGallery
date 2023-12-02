import styles from "./Categories.module.css";
import DividerCategoryLine from "../divider/DividerCategoryLine";
import SingleCategory from "../single-category/SingleCategory";
import { useContext } from "react";
import CategoriesContext from "../contexts/categoriesContext";

export default function Categories() {
    const { categories } = useContext(CategoriesContext);
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
