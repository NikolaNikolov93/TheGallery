import { Link } from "react-router-dom";
import styles from "../../components/pagination/Pagination.module.css";
export default function Pagination({
    picsPerPage,
    totalPics,
    paginate,
    currentPage,
}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPics / picsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={styles["pagination"]}>
                {pageNumbers.map((number) => (
                    <li key={number} className={styles["page-item"]}>
                        <Link
                            onClick={(e) => {
                                paginate(number, e);
                            }}
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
