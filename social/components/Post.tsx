import React, { Context, createContext, useReducer, useState } from "react";
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
    const [newComment, setNewComment] = useState<string>('');
    const [isLikedByUser, setIsLikedByUser] = useState<boolean>(props.isLikedByUser);
    

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
                <Avatar className="mr-3" size="large" image="https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png" />
                <h3 className="inline mr-2">Haaland janos</h3>
                <small className="align-self-center flex-grow-1">Created: 2022. 12. 23. 10:00</small>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-secondary p-button-outlined align-self-center" aria-label="Bookmark"  />
            </div>
        )
    }

    const footerTemplate = () => {

        return (
            <div className="border-top-1 border-400 pt-3 ">
                <div>
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
        <PostContext.Provider value={{newComment, setNewComment}}>
            <Card header={headerTemplate} footer={footerTemplate}>
                <div>
                    <h2>Title</h2>
                    <p>DKASMLDKMSLM</p>
                </div>
                <div>
                    <Button onClick={() => setIsLikedByUser(!isLikedByUser)} icon={`pi ${isLikedByUser ?  'pi-heart-fill': 'pi-heart'}`} className="p-button-outlined p-button-danger p-button-rounded" />
                </div>
                
            </Card>
        </PostContext.Provider>
    )
}


export default Post;