import { createContext } from "react";
import { useEffect, useState } from "react";

import * as categoriesServices from "../../services/categoriesServices";

const CategoriesContext = createContext();
CategoriesContext.displayName = "CategoriesContext";

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategoreis] = useState([]);
    useEffect(() => {
        categoriesServices
            .getAll()
            .then((categories) => setCategoreis(categories))
            .catch((err) => console.log(err));
    }, []);

    /**Categoreis values object  */
    const categoriesContextData = {
        categories,
    };

    return (
        <CategoriesContext.Provider value={categoriesContextData}>
            {children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesContext;
