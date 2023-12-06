import styles from "../../components/edit/Edit.module.css";
import * as pictureServices from "../../services/pictureServices";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/authContext";
import { useNavigate, useParams } from "react-router-dom";
import CategoriesContext from "../contexts/categoriesContext";
import useForm from "../../hooks/useFrom";
import Path from "../../paths";
import formValidator from "../../utils/formValidator";

export default function Edit() {
    const [errorMsg, setErrorMsg] = useState("");
    const [hasError, setError] = useState(false);
    const { pictureId } = useParams();
    const { token } = useContext(AuthContext);
    const { categories } = useContext(CategoriesContext);
    const [pictureData, setPictureData] = useState({
        headline: "",
        url: "",
        category: "",
        description: "",
    });
    const navigate = useNavigate();
    const errorCleanup = () => {
        setError(false);
        setErrorMsg("");
    };

    useEffect(() => {
        pictureServices.getOne(pictureId).then((result) => {
            setPictureData(result);
        });
    }, [pictureId]);
    const editPictureSubmitHandler = async (values) => {
        const validationResult = formValidator(values);
        if (!validationResult.isValid) {
            setError(true);
            setErrorMsg(validationResult.errorMessage);
            throw new Error(validationResult.errorMessage);
        }

        await pictureServices.edit(values, pictureId, token);
        navigate(Path[values.category.toLowerCase().replace(" ", "-")]);
    };
    const { values, onChange, onSubmit } = useForm(
        editPictureSubmitHandler,
        pictureData,
        errorCleanup
    );
    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["container-content"]}>
                    <h2>Edit Image</h2>

                    {hasError && (
                        <>
                            <p className={styles["errorMsg"]}>{errorMsg}</p>
                        </>
                    )}
                    <form onSubmit={onSubmit}>
                        <label htmlFor="headline">Headline</label>
                        <input
                            required
                            autoFocus
                            placeholder="Type headline for your picture"
                            type="text"
                            id="headline"
                            name="headline"
                            onChange={onChange}
                            value={values.headline}
                        />
                        <label htmlFor="URL">URL</label>
                        <input
                            required
                            placeholder="Type URL for your picture"
                            type="url"
                            id="url"
                            name="url"
                            onChange={onChange}
                            value={values.url}
                        />

                        <div>
                            <label>Select Category</label>
                            <select
                                required
                                className="categorySelector"
                                name="category"
                                value={values.category}
                                onChange={onChange}
                            >
                                <option>Select category...</option>
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
                            required
                            placeholder="Type short picture description"
                            type="description"
                            id="description"
                            name="description"
                            onChange={onChange}
                            value={values.description}
                        />

                        <button
                            type="submit"
                            className={styles["submitButton"]}
                        >
                            Edit Picture
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
