const baseUrl = "http://localhost:3030/data/pictures";

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();
    const pictures = Object.values(result);
    return pictures;
};

export const create = async (values, token) => {
    const body = {
        headline: values.headline,
        description: values.description,
        url: values.url,
        category: values.category,
    };
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token,
        },
        body: JSON.stringify(body),
    };

    const response = await fetch(baseUrl, settings);
    const result = await response.json();
    return result;
};
