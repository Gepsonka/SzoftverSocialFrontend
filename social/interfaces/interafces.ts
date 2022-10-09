


export type NavBarProps = {
    isLoggedIn: boolean;
}

export interface LoginResponse {
    token: string;
}


export interface RegisterRequest {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    username: string;
    email: string;
    password: string;
}