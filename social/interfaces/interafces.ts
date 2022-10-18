


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
    avatarURI: string;
    createdAt: Date;
    content: string;
}

export interface PostProps {
    avatarURI: string | null;
    authorNickname: string;
    createdAt: Date;
    title: string;
    content: string;
    imageURIs: string[] | null;
    likedByUser: boolean;
    comments: PostComment[];
}
