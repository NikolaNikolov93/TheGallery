import styles from "../../components/edit/Edit.module.css";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import CategoriesContext from "../contexts/categoriesContext";
import useForm from "../../hooks/useFrom";

export default function Edit() {
    const { username, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const EditPictureFormKeys = {
        Headline: "headline",
        URL: "url",
        Description: "description",
        Category: "category",
    };
    const editPictureSubmitHandler = async (values) => {
        console.log(values);

        // try {
        //     const result = await pictureServices.update(values, token);
        //     if (result) {
        //         const navigateTo = values.category
        //             .toLowerCase()
        //             .replace(" ", "-");
        //         switch (navigateTo) {
        //             case "nature":
        //                 navigate(Path.nature);
        //                 break;
        //             case "love":
        //                 navigate(Path.love);
        //                 break;
        //             case "art":
        //                 navigate(Path.art);
        //                 break;
        //             case "animals":
        //                 navigate(Path.animals);
        //                 break;
        //             case "sports":
        //                 navigate(Path.sports);
        //                 break;
        //             case "animation":
        //                 navigate(Path.animation);
        //                 break;
        //             case "digital":
        //                 navigate(Path.digital);
        //                 break;
        //             case "home-interior":
        //                 navigate(Path["home-interior"]);
        //                 break;
        //             case "adventure":
        //                 navigate(Path.adventure);
        //                 break;
        //             case "architecture":
        //                 navigate(Path.architecture);
        //                 break;
        //             case "astrophotography":
        //                 navigate(Path.astrophotography);
        //                 break;
        //             case "fashion":
        //                 navigate(Path.fashion);
        //                 break;
        //         }
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };
    const { categories } = useContext(CategoriesContext);
    const { values, onChange, onSubmit } = useForm(editPictureSubmitHandler, {
        [editPictureSubmitHandler.Headline]: "",
        [editPictureSubmitHandler.URL]: "",
        [editPictureSubmitHandler.Description]: "",
        [editPictureSubmitHandler.Category]: "NATURE",
    });
    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["container-content"]}>
                    <h2>Add Image</h2>
                    <form onSubmit={onSubmit}>
                        <label htmlFor="headline">Headline</label>
                        <input
                            autoFocus
                            placeholder="Type headline for your picture"
                            type="text"
                            id="headline"
                            name="headline"
                            onChange={onChange}
                            value={values[EditPictureFormKeys.Headline]}
                        />
                        <label htmlFor="URL">URL</label>
                        <input
                            placeholder="Type URL for your picture"
                            type="url"
                            id="url"
                            name="url"
                            onChange={onChange}
                            value={values[editPictureSubmitHandler.URL]}
                        />

                        <div>
                            <label>Select Category</label>
                            <select
                                className="categorySelector"
                                name="category"
                                value={
                                    values[editPictureSubmitHandler.Category]
                                }
                                onChange={onChange}
                            >
                                {categories.map((category) => (
                                    <option key={category._id}>
                                        {category.description
                                            .toUpperCase()
                                            .replace("-", " ")}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <label htmlFor="description">Picture Description</label>
                        <textarea
                            placeholder="Type short picture description"
                            type="description"
                            id="description"
                            name="description"
                            onChange={onChange}
                            value={values[editPictureSubmitHandler.Description]}
                        />

                        <button
                            type="submit"
                            className={styles["submitButton"]}
                        >
                            Submit Picture
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
