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
