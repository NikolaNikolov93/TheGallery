const baseUrl = "http://localhost:3030/data/pictures";

export const getAllPicturesOfSelectedCategory = async (category) => {
    const query = new URLSearchParams({
        where: `category="${category}"`,
    });
    const response = await fetch(`${baseUrl}?${query}`);
    const result = await response.json();
    const pictures = Object.values(result);
    return pictures;
};

export const getOne = async (pictureId) => {
    try {
        const response = await fetch(`${baseUrl}/${pictureId}`);
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

export const create = async (values, token) => {
    const body = {
        username: values.username,
        headline: values.headline,
        description: values.description,
        url: values.url,
        category: values.category.toLowerCase().replace(" ", "-"),
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
