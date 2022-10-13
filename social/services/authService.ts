import axios, { AxiosError } from "axios"
import { LoginResponse } from "../interfaces/interafces";
import { deleteInvalidToken, setAuthToken } from "./JWTService";
import { LoginError } from "./erroService";



export const loginUser = async (username: string, password: string) => {
    try {
        console.log(`${process.env.NEXT_PUBLIC_FLASK_BACKEND}/login`)
        let res = await axios.post(`${process.env.NEXT_PUBLIC_FLASK_BACKEND}/login`, {
            username: username,
            password: password
        });

        setAuthToken(res.data.token);
    } catch (e: any) {
        if (e.request.status === 401){
            throw new LoginError("Bad username or password");
        }
    }
}



export const logoutUser = async (token: string) => {
    deleteInvalidToken();
}

