const baseUrl = "http://localhost:3030/data/likes";

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();
    return result;
};

export const addLike = async (pictureId, userID, token) => {
    const body = {
        pictureId,
        userID,
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
