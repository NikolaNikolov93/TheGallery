import styles from "../../components/edit/Edit.module.css";
import * as pictureServices from "../../services/pictureServices";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/authContext";
import { useNavigate, useParams } from "react-router-dom";
import CategoriesContext from "../contexts/categoriesContext";
import useForm from "../../hooks/useFrom";
import Path from "../../paths";

export default function Edit() {
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

    useEffect(() => {
        pictureServices.getOne(pictureId).then((result) => {
            setPictureData(result);
        });
    }, [pictureId]);
    const editPictureSubmitHandler = async (values) => {
        await pictureServices.edit(values, pictureId, token);
        navigate(Path[values.category]);
    };
    const { values, onChange, onSubmit } = useForm(
        editPictureSubmitHandler,
        pictureData
    );
    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["container-content"]}>
                    <h2>Edit Image</h2>
                    <form onSubmit={onSubmit}>
                        <label htmlFor="headline">Headline</label>
                        <input
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
