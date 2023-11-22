const baseUrl = "http://localhost:3030/jsonstore/pictures";

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();
    const categories = Object.values(result);
    return categories;
};
