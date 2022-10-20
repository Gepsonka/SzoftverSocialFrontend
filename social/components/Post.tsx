import React, { Context, createContext, useReducer, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import Link from "next/link";
import { PostProps } from "../interfaces/interafces"
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import Comment from "./Comment";
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";


export interface PostComment {
    userId: number,
    avatarUrl: string,
    content: string,
    createdAt: Date
}

type PostContextType = {
    newComment: string | null,
    setNewComment: React.Dispatch<React.SetStateAction<string>>
}


const iUserContextState = {
    newComment: '',
    setNewComment: () => {}
}



export const PostContext = createContext<PostContextType>(iUserContextState);

const Post = (props: PostProps) => {
    const router = useRouter();
    const [postIsDeleted, setPostIsDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newComment, setNewComment] = useState<string>('');
    const [isLikedByUser, setIsLikedByUser] = useState<boolean>(props.isLikedByUser);
    
    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);

    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');

    const toast = useRef(null);

    const submitEdit = () => {
        setTitle(editedTitle);
        setEditedTitle('');
        setContent(editedContent);
        setEditedContent('');
        // @ts-ignore
        toast.current.show({severity: 'success', summary: 'Post updated', detail: 'Post successfully updated!', life: 3000});
        setIsEditing(false);
    }

    const postDeleteConfirm = () => {
        confirmDialog({
            message: 'Are you sure you want to delete the Post?',
            header: 'Delete Post',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => {
                setPostIsDeleted(true);
                // @ts-ignore
                toast.current.show({severity:'info', summary: 'Post Deleted', detail:'Post was successfully deleted!', life: 3000})
            },
            reject: () => {

            }
        });
    }

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    const headerTemplate = () => {

        return (
            <div className="flex p-3 border-solid border-primary bg-indigo-100 border-round-top">
                <Avatar className="mr-3" size="large" image={props.avatarURI as string} />
                <h3 className="inline mr-2">{props.authorNickname}</h3>
                <small className="align-self-center flex-grow-1">{props.updatedAt === undefined ? `Created: ${props.createdAt.toUTCString()}` : `Edited: ${props.updatedAt.toUTCString()}`}</small>
                { !isEditing && <Button onClick={postDeleteConfirm} icon="pi pi-trash" className="p-button-rounded p-button-outlined p-button-sm p-button-secondary align-self-center" />}
                <Button icon="pi pi-pencil" className="ml-2 p-button-rounded p-button-secondary p-button-outlined align-self-center" aria-label="Bookmark" onClick={() => setIsEditing(!isEditing)}  />
            </div>
        )
    }

    const footerTemplate = () => {

        return (
            <div className="border-top-1 border-400 pt-3">
                <Comment postId={0} avatarURL={"https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png"} commentAuthorNickname={"Csoki"} content={"agyfasz"} createdAt={new Date()} commentId={0} authorId={0} />
                <div className="border-top-1 border-300 pt-3">
                    <div className="flex w-full p-fluid mb-2">
                        <Avatar className="mr-1" image="https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png" />
                        <InputTextarea autoResize value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    </div>
                    <div className="flex w-full justify-content-end">
                        <Button label="Comment" className="p-button-outlined p-button-sm" disabled={newComment === ''} />
                    </div>
                </div>
                
            </div>
        )
    }

    // TODO: create liking call to backend

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog key={'PostDialog'} />
            <div className={postIsDeleted ? 'hidden' : ''}>
                <PostContext.Provider value={{newComment, setNewComment}}>
                    
                    {
                    isEditing ? 
                        <Card header={headerTemplate} footer={footerTemplate}>
                            <div className="p-fluid">
                                <InputText value={editedTitle} className="mb-3" onChange={(e) => setEditedTitle(e.target.value)} placeholder="Title" />
                                <InputTextarea  className="mb-2" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} rows={3} />
                            </div>
                            <div>
                                <Button disabled={editedContent === '' || editedTitle === ''} className="p-button-info" label="Update" icon="pi pi-angle-double-up" onClick={() => submitEdit()} />
                            </div>
                        </Card>
                        :
                        <Card header={headerTemplate} footer={footerTemplate}>
                            <div>
                                <h2>{title}</h2>
                                <p>{content}</p>
                            </div>
                            <div>
                                <Button onClick={() => setIsLikedByUser(!isLikedByUser)} icon={`pi ${isLikedByUser ?  'pi-heart-fill': 'pi-heart'}`} className="p-button-outlined p-button-danger p-button-rounded" />
                            </div>
                        </Card>
                    }
                </PostContext.Provider>
            </div>
        </div>
    )
}


export default Post;