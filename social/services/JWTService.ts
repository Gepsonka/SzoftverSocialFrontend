import axios from "axios"


export const refreshToken = async (expiredtToken: string) => {
    try {
        let res = await axios.post(`${process.env.BACKEND_HOST}/refresh-token`);
        setDefaultToken(res.data.refreshedToken);
    } catch (e) {
        deleteInvalidToken();
    }
}

export const setAuthToken = (token: string) => {
    if (token){
        setDefaultToken(token);
    } else {
        deleteInvalidToken();
    }
}


export const deleteInvalidToken = () => {
    delete axios.defaults.headers.common["Authorization"];
}

export const setDefaultToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const isTokenExists = (): boolean => {
    if (axios.defaults.headers.common['Authorization'] === undefined || axios.defaults.headers.common['Authorization'] === ''){
        return false;
    }

    return true;
}