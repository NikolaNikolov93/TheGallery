import { useContext } from "react";
import styles from ".././createPicture/CreatePicture.module.css";
import AuthContext from "../contexts/authContext";

export default function CreatePicture() {
    const { categories } = useContext(AuthContext);
    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["container-content"]}>
                    <h2>Add Image</h2>
                    <form>
                        <label htmlFor="headline">Headline</label>
                        <input
                            autoFocus
                            placeholder="Type headline for your picture"
                            type="text"
                            id="headline"
                            name="headline"
                            // value={values[RegisterFormKeys.Username]}
                        />
                        <label htmlFor="URL">URL</label>
                        <input
                            placeholder="Type URL for your picture"
                            type="url"
                            id="url"
                            name="url"
                            // value={values[RegisterFormKeys.Username]}
                        />

                        <div>
                            <label>Select Category</label>
                            <select>
                                {categories.map((category) => (
                                    <option key={category._id}>
                                        {category.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <label htmlFor="repeat-password">
                            Picture Description
                        </label>
                        <textarea
                            placeholder="Type short picture description"
                            type="repeat-password"
                            id="repeat-password"
                            name="repeat-password"
                            // value={values[RegisterFormKeys.Repass]}
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
