import { useContext, useState } from "react";
import styles from ".././createPicture/CreatePicture.module.css";
import AuthContext from "../contexts/authContext";
import useForm from "../../hooks/useFrom";
import * as pictureServices from "../../services/pictureServices";

export default function CreatePicture() {
    const CreatePicutreFormKeys = {
        Headline: "headline",
        URL: "url",
        Description: "description",
        Category: "category",
    };
    const createPictureSubmitHandler = (values) => {
        pictureServices.create(values, token);
        console.log(values);
    };
    const { categories, token } = useContext(AuthContext);
    /**Selected option state */
    const [selectedOption, setSelectedOption] = useState("NATURE");
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    /**Form Handler */
    const { values, onChange, onSubmit } = useForm(createPictureSubmitHandler, {
        [CreatePicutreFormKeys.Headline]: "",
        [CreatePicutreFormKeys.URL]: "",
        [CreatePicutreFormKeys.Description]: "",
        [CreatePicutreFormKeys.Category]: selectedOption,
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
                                name="category"
                                value={values[CreatePicutreFormKeys.Category]}
                                onChange={onChange}
                            >
                                {categories.map((category) => (
                                    <option key={category._id}>
                                        {category.description}
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
