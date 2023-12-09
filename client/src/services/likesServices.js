const baseUrl = "http://localhost:3030/data/likes";

export const getAllPictureLikes = async (id) => {
    const query = new URLSearchParams({
        where: `pictureId="${id}"`,
    });

    const response = await fetch(`${baseUrl}?${query}`);
    const result = await response.json();
    return Object.values(result);
};

export const addLike = async (pictureId, userID, username, token) => {
    const body = {
        pictureId,
        userID,
        username,
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

export const removeLike = async (likeID, token) => {
    const settings = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token,
        },
    };
    const response = await fetch(`${baseUrl}/${likeID}`, settings);
    const result = await response.json();
    return result;
};

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();
    return Object.values(result);
};
