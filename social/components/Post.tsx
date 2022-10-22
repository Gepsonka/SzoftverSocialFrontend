import React, { Context, createContext, useReducer, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import Link from "next/link";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import Comment from "./PostPanel/Comment";
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import HeaderTemplate from "./PostPanel/HeaderTemplate";
import FooterTemplate from "./PostPanel/FooterTemplate";
import { CommentProps } from "./PostPanel/Comment";





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


export interface PostComment {
    userId: number,
    avatarUrl: string,
    content: string,
    createdAt: Date
}

type PostContextType = {
    newComment: string | null,
    setNewComment: React.Dispatch<React.SetStateAction<string>>,
    isEditing: boolean,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
    postDeleteConfirm: any,
}


const iUserContextState: PostContextType = {
    newComment: '',
    setNewComment: () => {},
    isEditing: false,
    setIsEditing: () => {},
    postDeleteConfirm: () => {}
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

    const[avatarURL, setAvatarURL] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjpPCSmbEz9MbdmDRHnq0A-r1IgQ2JecU5dA&usqp=CAU');

    const [testComments, setTestComments] = useState<CommentProps[]>([
        {
            postId: 1,
            commentId: 1,
            authorId: 1,
            avatarURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU',
            commentAuthorNickname: "Kuki",
            content: 'just a new comment',
            createdAt: new Date()
        },
        {
            postId: 1,
            commentId: 1,
            authorId: 1,
            avatarURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU',
            commentAuthorNickname: "Kuki",
            content: 'just a new comment',
            createdAt: new Date()
        },
        {
            postId: 1,
            commentId: 1,
            authorId: 1,
            avatarURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU',
            commentAuthorNickname: "Kuki",
            content: 'just a new comment',
            createdAt: new Date()
        },
        {
            postId: 1,
            commentId: 1,
            authorId: 1,
            avatarURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU',
            commentAuthorNickname: "Kuki",
            content: 'just a new asdasda',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            postId: 1,
            commentId: 1,
            authorId: 1,
            avatarURL: 'https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1',
            commentAuthorNickname: "Kuki",
            content: 'just a new comment',
            createdAt: new Date()
        },
    ])

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
    // TODO: create liking call to backend

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog key={'PostDialog'} />
            <div className={postIsDeleted ? 'hidden' : ''}>
                <PostContext.Provider value={{newComment, setNewComment, isEditing, setIsEditing, postDeleteConfirm}}>
                    
                    {
                    isEditing ? 
                        <Card header={<HeaderTemplate avatarURI={props.avatarURI} authorNickname={props.authorNickname} createdAt={props.createdAt} updatedAt={props.updatedAt} />} footer={<FooterTemplate avatarURL={avatarURL} comments={testComments} />}>
                            <div className="p-fluid">
                                <InputText value={editedTitle} className="mb-3" onChange={(e) => setEditedTitle(e.target.value)} placeholder="Title" />
                                <InputTextarea  className="mb-2" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} rows={3} />
                            </div>
                            <div>
                                <Button disabled={editedContent === '' || editedTitle === ''} className="p-button-info" label="Update" icon="pi pi-angle-double-up" onClick={() => submitEdit()} />
                            </div>
                        </Card>
                        :
                        <Card header={<HeaderTemplate avatarURI={props.avatarURI} authorNickname={props.authorNickname} createdAt={props.createdAt} updatedAt={props.updatedAt} />} footer={<FooterTemplate avatarURL={avatarURL} comments={testComments} />}>
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