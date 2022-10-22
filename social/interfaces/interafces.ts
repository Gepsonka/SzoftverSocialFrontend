


export type NavBarProps = {
    isLoggedIn: boolean;
    firstName: string | null;
    lastName: string | null;
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

export interface PostComment {
    postID: number;
    avatarURI: string;
    createdAt: Date;
    content: string;
    isUserAuthor: boolean;
}

