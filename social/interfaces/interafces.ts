


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

export interface PostProps {
    avatarURI: string;
    authorNickname: string;
    createdAt: Date;
    updatedAt?: Date;
    title: string;
    content: string;
    imageURIs?: string[];
    isLikedByUser: boolean;
    comments: PostComment[];
}
