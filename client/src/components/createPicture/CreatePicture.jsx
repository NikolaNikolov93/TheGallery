import { useContext, useState } from "react";
import styles from ".././createPicture/CreatePicture.module.css";
import AuthContext from "../contexts/authContext";
import useForm from "../../hooks/useFrom";
import * as pictureServices from "../../services/pictureServices";
import CategoriesContext from "../contexts/categoriesContext";
import { useNavigate } from "react-router-dom";
import Path from "../../paths";

export default function CreatePicture() {
    const { username } = useContext(AuthContext);
    const navigate = useNavigate();
    const CreatePicutreFormKeys = {
        Headline: "headline",
        URL: "url",
        Description: "description",
        Category: "category",
    };
    const createPictureSubmitHandler = async (values) => {
        const finalValues = { ...values, username: username };
        try {
            const result = await pictureServices.create(finalValues, token);
            if (result) {
                const navigateTo = values.category
                    .toLowerCase()
                    .replace(" ", "-");
                switch (navigateTo) {
                    case "nature":
                        navigate(Path.nature);
                        break;
                    case "love":
                        navigate(Path.love);
                        break;
                    case "art":
                        navigate(Path.art);
                        break;
                    case "animals":
                        navigate(Path.animals);
                        break;
                    case "sports":
                        navigate(Path.sports);
                        break;
                    case "animation":
                        navigate(Path.animation);
                        break;
                    case "digital":
                        navigate(Path.digital);
                        break;
                    case "home-interior":
                        navigate(Path["home-interior"]);
                        break;
                    case "adventure":
                        navigate(Path.adventure);
                        break;
                    case "architecture":
                        navigate(Path.architecture);
                        break;
                    case "astrophotography":
                        navigate(Path.astrophotography);
                        break;
                    case "fashion":
                        navigate(Path.fashion);
                        break;
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { token } = useContext(AuthContext);
    const { categories } = useContext(CategoriesContext);

    const { values, onChange, onSubmit } = useForm(createPictureSubmitHandler, {
        [CreatePicutreFormKeys.Headline]: "",
        [CreatePicutreFormKeys.URL]: "",
        [CreatePicutreFormKeys.Description]: "",
        [CreatePicutreFormKeys.Category]: "NATURE",
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
                            value={values[CreatePicutreFormKeys.Headline]}
                        />
                        <label htmlFor="URL">URL</label>
                        <input
                            placeholder="Type URL for your picture"
                            type="url"
                            id="url"
                            name="url"
                            onChange={onChange}
                            value={values[CreatePicutreFormKeys.URL]}
                        />

                        <div>
                            <label>Select Category</label>
                            <select
                                className="categorySelector"
                                name="category"
                                value={values[CreatePicutreFormKeys.Category]}
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
                            value={values[CreatePicutreFormKeys.Description]}
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
