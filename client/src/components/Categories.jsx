import styles from "./Categories.module.css";
import SingleCategory from "./SingleCategory";

export default function Categories() {
    const categoriesArray = [
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/1280px-Altja_j%C3%B5gi_Lahemaal.jpg",
            description: "Nice Image!",
        },
        {
            url: "https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg?w=900&t=st=1699543904~exp=1699544504~hmac=7da7a6cad4a6c14662cd8ba8fa6344425a2dd0898ba412f66b23d3819abc6d5d",
            description: "Nice Image!",
        },
    ];
    return (
        <section className={styles.categoriesContainer}>
            {categoriesArray.map((image) => (
                <SingleCategory
                    url={image.url}
                    description={image.description}
                />
            ))}
        </section>
    );
}
