const baseUrl = "http://localhost:3030/data/categories";

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();
    const categories = Object.values(result);
    return categories;
};
