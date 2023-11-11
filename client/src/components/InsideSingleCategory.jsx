import { useParams } from "react-router-dom";
import styles from "./InsideSingleCategory.module.css";
export default function InsideSingleCategory() {
    const categoryDefinition = useParams();

    // const [category, setCategory] = useState("");
    // useEffect(() => {
    //     setCategory(categoryDefinition);
    // }, [categoryDefinition]);

    return (
        <div className={styles.container}>
            <h1>{`Hello to ${categoryDefinition.category}!`}</h1>
        </div>
    );
}
