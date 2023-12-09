import { Link } from "react-router-dom";
import styles from "../../components/pagination/Pagination.module.css";

export default function Pagination({
    picsPerPage,
    totalPics,
    paginate,
    currentPage,
}) {
    const pageNumbers = [];
    /**Setup the number of pages depending on the total amount of pictures in the category */
    for (let i = 1; i <= Math.ceil(totalPics / picsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={styles["pagination"]}>
                {pageNumbers.map((number) => (
                    <li key={number} className={styles["page-item"]}>
                        <Link
                            onClick={() => {
                                paginate(number);
                            }}
                            /**If the currentPage given as prop form the components is same as
                             * the one currently rendered marks the class as active in order to see
                             * on which page we are currently
                             */
                            className={
                                styles[
                                    `${
                                        currentPage == number
                                            ? "active"
                                            : "page-link"
                                    }`
                                ]
                            }
                            href="!#"
                            id={`${number}`}
                        >
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
