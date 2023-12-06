import { useContext, useMemo, useState } from "react";
import styles from ".././createPicture/CreatePicture.module.css";
import AuthContext from "../contexts/authContext";
import useForm from "../../hooks/useFrom";
import * as pictureServices from "../../services/pictureServices";
import CategoriesContext from "../contexts/categoriesContext";
import { useNavigate } from "react-router-dom";
import Path from "../../paths";
import formValidator from "../../utils/formValidator";

export default function CreatePicture() {
    const [errorMsg, setErrorMsg] = useState("");
    const [hasError, setError] = useState(false);
    const { username } = useContext(AuthContext);
    const navigate = useNavigate();
    const CreatePicutreFormKeys = {
        Headline: "headline",
        URL: "url",
        Description: "description",
        Category: "category",
    };
    const createPictureSubmitHandler = async (values) => {
        const validationResult = formValidator(values);
        if (!validationResult.isValid) {
            setError(true);
            setErrorMsg(validationResult.errorMessage);
            throw new Error(validationResult.errorMessage);
        }
        const finalValues = { ...values, username: username };
        try {
            const result = await pictureServices.create(finalValues, token);
            if (result) {
                const navigateTo = values.category
                    .toLowerCase()
                    .replace(" ", "-");
                navigate(Path[navigateTo]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { token } = useContext(AuthContext);
    const { categories } = useContext(CategoriesContext);
    const initialValues = useMemo(
        () => ({
            [CreatePicutreFormKeys.Headline]: "",
            [CreatePicutreFormKeys.URL]: "",
            [CreatePicutreFormKeys.Description]: "",
            [CreatePicutreFormKeys.Category]: "NATURE",
        }),
        []
    );
    const { values, onChange, onSubmit } = useForm(
        createPictureSubmitHandler,
        initialValues
    );

    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["container-content"]}>
                    <h2>Add Image</h2>
                    {hasError && (
                        <>
                            <p className={styles["errorMsg"]}>{errorMsg}</p>
                        </>
                    )}
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
