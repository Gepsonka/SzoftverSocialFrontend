import axios from "axios"


export const refreshToken = async (token: string) => {
    
}

export const setAuthToken = (token: string) => {
    if (token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}