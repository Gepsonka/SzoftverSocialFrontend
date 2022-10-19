import { Avatar } from "primereact/avatar";
import React, { FC } from "react";


export interface CommentProps {
    postId: number;
    avatarURL: string;
    commentAuthorNickname: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
}


export const Comment: FC<CommentProps> = (props: CommentProps) => {
    return (
        <div className="flex w-full">
            <div className="flex w-full">
                <Avatar image=""/>
                <h2>{props.commentAuthorNickname}</h2>
                <small>{props.updatedAt === undefined ? `Created at ${props.createdAt.toUTCString()}` : `Edited at ${props.updatedAt.toUTCString()}`}</small>
            </div>
            
            <p>{props.content}</p>
        </div>
    )
}


export default Comment;