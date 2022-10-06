import axios from "axios"
import { loginResponse } from "../interfaces/interafces";



export const loginUser = async (username: string, password: string) => {
    try {
        let res = await axios.post(`${process.env.BACKEND_HOST}/login`, {
            username: username,
            password: password
        });

        return res.data.token
    } catch {

    }
}



export const logoutUser = async (token: string) => {

}

