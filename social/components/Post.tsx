import React, { Context, createContext, useEffect, useReducer, useRef, useState } from "react";
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
import { axiosInstance } from "../services/axios";

const avatarURL: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjpPCSmbEz9MbdmDRHnq0A-r1IgQ2JecU5dA&usqp=CAU';

export interface PostProps {
    postId: number;
    avatarURI: string;
    authorNickname: string;
    createdAt: Date;
    updatedAt?: Date;
    title: string;
    content: string;
    imageURIs?: string[];
}


export interface PostComment {
    userId: number,
    avatarUrl: string,
    content: string,
    createdAt: Date
}

type PostContextType = {
    newComment: string | undefined,
    setNewComment?: React.Dispatch<React.SetStateAction<string | undefined>>,
    isEditing: boolean | undefined,
    setIsEditing?: React.Dispatch<React.SetStateAction<boolean | undefined>>,
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
    const [postIsDeleted, setPostIsDeleted] = useState<boolean>();
    const [isEditing, setIsEditing] = useState<boolean>();
    const [newComment, setNewComment] = useState<string>();
    const [isLikedByUser, setIsLikedByUser] = useState<boolean>();
    
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();

    const [editedTitle, setEditedTitle] = useState<string>();
    const [editedContent, setEditedContent] = useState<string>();

    const toast = useRef(null);

    useEffect(() => {
        setPostIsDeleted(false);
        setIsEditing(false);
        setNewComment('');
        setTitle(props.title);
        setContent(props.content);
        setEditedTitle('');
        setEditedContent('');

        const getPostIsLiked = async () => {
            if (localStorage.getItem('token') === null) {
                return await Promise.resolve(false);
            }

            try {
                const res = await axiosInstance.get(`/post/is-post-liked/${props.postId}`)
                setIsLikedByUser(res.data.isLiked);
            } catch (e) {
                console.log(e)
            }
        }

        getPostIsLiked();

    }, [])

    

    const submitEdit = () => {
        try{
            const res = axiosInstance.put(`/post/${props.postId}`, {
                title: title,
                content: content
            })
            setTitle(editedTitle);
            setEditedTitle('');
            setContent(editedContent);
            setEditedContent('');
            // @ts-ignore
            toast.current.show({severity: 'success', summary: 'Post updated', detail: 'Post successfully updated!', life: 3000});
            setIsEditing(false);
        } catch (e: any) {
            // @ts-ignore
            toast.current.show({severity: 'success', summary: 'Post updated failed', detail: e.response.data.msg, life: 3000});
        }
        
    }

    const postDeleteConfirm = () => {
        confirmDialog({
            message: 'Are you sure you want to delete the Post?',
            header: 'Delete Post',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    const res = await axiosInstance.delete(`/post/${props.postId}`)
                    setPostIsDeleted(true);
                    // @ts-ignore
                    toast.current.show({severity:'info', summary: 'Post Deleted', detail:'Post was successfully deleted!', life: 3000})
                } catch (e: any) {
                    // @ts-ignore
                    toast.current.show({severity:'error', summary: 'Post Delete', detail: e.response.data, life: 3000})
                }
                
            },
            reject: () => {

            }
        });
    }
    // TODO: create liking call to backend
    // TODO: Load imges, if no images do not display gallery

    const clickLike = async () => {
        if (isLikedByUser){
            try {
                const res = await axiosInstance.delete(`/post/unlike-post/${props.postId}`)
                setIsLikedByUser(false);
            } catch (e) {

            }
        } else {
            try {
                const res = await axiosInstance.post(`/post/like-post/${props.postId}`)
                setIsLikedByUser(true);
            } catch (e) {

            }
        }
        
    }

    return (
        <div>
            <Toast ref={toast} />
            
            <div className={postIsDeleted ? 'hidden' : ''}>
                <PostContext.Provider value={{newComment, setNewComment, isEditing, setIsEditing, postDeleteConfirm}}>
                    
                    {
                    isEditing ? 
                        <Card header={<HeaderTemplate avatarURI={props.avatarURI} authorNickname={props.authorNickname} createdAt={props.createdAt} updatedAt={props.updatedAt} />} footer={<FooterTemplate avatarURL={avatarURL} comments={[]} />}>
                            <div className="p-fluid">
                                <InputText value={editedTitle} className="mb-3" onChange={(e) => setEditedTitle(e.target.value)} placeholder="Title" />
                                <InputTextarea  className="mb-2" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} rows={3} />
                            </div>
                            <div>
                                <Button disabled={editedContent === '' || editedTitle === ''} className="p-button-info" label="Update" icon="pi pi-angle-double-up" onClick={() => submitEdit()} />
                            </div>
                        </Card>
                        :
                        <Card header={<HeaderTemplate avatarURI={props.avatarURI} authorNickname={props.authorNickname} createdAt={props.createdAt} updatedAt={props.updatedAt} />} footer={<FooterTemplate avatarURL={avatarURL} comments={[]} />}>
                            <div>
                                <h2>{title}</h2>
                                <p>{content}</p>
                            </div>
                            <div>
                                <Button onClick={() => clickLike()} icon={`pi ${isLikedByUser ?  'pi-heart-fill': 'pi-heart'}`} className="p-button-outlined p-button-danger p-button-rounded" />
                            </div>
                        </Card>
                    }
                </PostContext.Provider>
            </div>
        </div>
    )
}


export default Post;