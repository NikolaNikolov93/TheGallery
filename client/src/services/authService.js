const baseUrl = "http://localhost:3030/users";

export const login = async (email, password) => {
    const body = { email, password };
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };
    const response = await fetch(`${baseUrl}/login`, settings);
    const result = await response.json();
    return result;
};
