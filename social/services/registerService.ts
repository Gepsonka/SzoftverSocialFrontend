import axios from "axios"
import { RegisterRequest } from "../interfaces/interafces";



export const registerUser = async (data: RegisterRequest) => {
    try {
        let res = await axios.post(`${process.env.NEXT_PUBLIC_FLASK_BACKEND}/register`, data);
        return res.data;
    } catch (e:any) {
        return e.response.data;
    }
}

export const checkUsernameExists = async (username: string) => {
    try {
        let res = await axios.post(`${process.env.NEXT_PUBLIC_FLASK_BACKEND}/is-username-exists`, {"username": username});
        return res.data.isTaken;
    } catch (e: any) {
        return e.response.data;
    }
}

export const checkEmailExists = async (email: string) => {
    
}