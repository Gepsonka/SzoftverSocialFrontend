import axios, { AxiosError } from "axios"
import { LoginResponse } from "../interfaces/interafces";
import { deleteInvalidToken, setAuthToken } from "./JWTService";
import { LoginError } from "./ErroService";


export interface AuthServiceInterface{
    loginUser(username:string, password: string): Promise<any>;
    logoutUser(token: string): Promise<any>;
}


class AuthService implements AuthServiceInterface{
    public async loginUser(username: string, password: string): Promise<any> {
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
    
    public async logoutUser(token: string): Promise<any> {
        deleteInvalidToken();
    }   
}


export const authService = new AuthService();
