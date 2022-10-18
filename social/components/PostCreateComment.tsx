import { Avatar } from "primereact/avatar";
import React, { FC } from "react";

export interface PostCreateCommentProps {
    avatarUrl: string;
}

export const PostCreateComment: FC<PostCreateCommentProps> = ({avatarUrl}: PostCreateCommentProps) => {

    return (
        <div className="flex w-full">
            <Avatar image="https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png" size="large" />
            
        </div>
    )
}