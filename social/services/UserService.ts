import axios from "axios";


export interface UserCreationRequestInteface {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    dateOfBirth: Date;
}

/// Patch method, for user service on the backend
export interface UserPartiallyUpdateRequestInteface {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    password?: string;
    dateOfBirth?: Date;
}

class UserService{
    
    public static async getUser(userId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public static async createUser(newUserAttr: UserCreationRequestInteface): Promise<any> {
        try {
            let res = await axios.post(`${process.env.NEXT_PUBLIC_FLASK_BACKEND}/register`, newUserAttr);
            return res.data;
        } catch (e:any) {
            return e.response.data;
        }
    }
    
    public static async updateUser(userId: string, updatedAttr: UserCreationRequestInteface): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public static async partiallyUpdateUser(userId: string, updateAttr: UserPartiallyUpdateRequestInteface): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public static async deleteUser(userId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public static async checkUsernameExists(username: string): Promise<any>{
        try {
            let res = await axios.post(`${process.env.NEXT_PUBLIC_FLASK_BACKEND}/is-username-exists`, {"username": username});
            return res.data.isTaken;
        } catch (e: any) {
            return e.response.data;
        }
    }

    public static async checkEmailExists(email: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
}