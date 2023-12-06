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
    try {
        const response = await fetch(`${baseUrl}/login`, settings);
        if (response.status === "403") {
            throw new Error(`${response.message}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

export const register = async (email, password, username) => {
    const body = { email, password, username };
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };
    const response = await fetch(`${baseUrl}/register`, settings);
    const result = await response.json();
    return result;
};

export const logout = async (token) => {
    const settings = {
        headers: { "X-Authorization": token },
    };
    const response = await fetch(`${baseUrl}/logout`, settings);
};
