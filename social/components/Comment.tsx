import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { FC, useRef, useState } from "react";


export interface CommentProps {
    postId: number;
    commentId: number;
    authorId: number;
    avatarURL: string;
    commentAuthorNickname: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
}

// TODO: If the comment is the users add actions dropdown where the user can modifiy
// or delete the comment

export const Comment: FC<CommentProps> = (props: CommentProps) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [content, setContent] = useState(props.content);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const toast = useRef(null);

    const updateComment = () => {
        setContent(editedContent);
        setEditedContent('');
        setIsEditing(false);
        // TODO: set updated date too
        // @ts-ignore
        toast.current.show({severity: 'success', summary: 'Comment updated', detail: 'Comment successfully updated!', life: 3000})
    }

    

    const commentDeleteConfirm = () => {
        confirmDialog({
            message: 'Are you sure you want to delete the comment?',
            header: 'Delete Comment',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => {
                setIsDeleted(true);
                // @ts-ignore
                toast.current.show({severity:'info', summary: 'Comment Deleted', detail:'Comment was successfully deleted!', life: 3000})
            },
            reject: () => {

            }
        });
    }

    


    return (
        <div>
            <div className={`${isDeleted ? 'hidden' : 'flex'} flex-column mb-3 p-3 pt-2 w-full border-solid border-cyan-500 border-round-lg bg-cyan-100 `}>
                <div className="flex align-content-end">
                    <Avatar image={props.avatarURL} className="mr-2 mt-auto" />
                    <h3 className="m-0 mt-auto mr-2">{props.commentAuthorNickname}</h3>
                    <small className="mt-auto flex-grow-1">{props.updatedAt === undefined ? `Created: ${props.createdAt.toUTCString()}` : `Edited: ${props.updatedAt.toUTCString()}`}</small>
                    { !isEditing && <Button onClick={commentDeleteConfirm} icon="pi pi-trash" className="p-button-rounded p-button-sm p-button-text p-button-secondary" />}
                    <Button onClick={() => setIsEditing(!isEditing)} icon="pi pi-pencil" className="ml-1 p-button-rounded p-button-sm p-button-text" />
                </div>
                <div className="mt-2 p-fluid">
                    {
                        isEditing ?
                        <div>
                            <InputText className="mb-2" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                        </div>
                        :
                        <p className="pl-5">{content}</p>
                    }
                </div>
                <div>
                    {isEditing && <Button onClick={() => updateComment()} icon="pi pi-angle-double-up" label="Update Comment" className="p-button-sm p-button-info" />}
                </div>
            </div>
            <Toast ref={toast}/>
        </div>
    )
}


export default Comment;