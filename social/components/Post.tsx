import React, { Context, createContext, useReducer } from "react";
import { useRouter } from "next/router";
import { Panel } from 'primereact/panel';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import Link from "next/link";
import { PostProps } from "../interfaces/interafces"
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Card } from "primereact/card";

export interface PostComment {
    userId: number,
    avatarUrl: string,
    content: string,
    createdAt: Date
}

export interface PostReducerState {
    comments: PostComment[],
    createCommentContent: string,
}


const initialState: PostReducerState = {
    comments: [],
    createCommentContent: ''
}

enum PostActionsKind {
    UPDATE_NEW_COMMENT = 'UPDATE_NEW_COMMENT',
    CREATE_NEW_COMMENT_BLOCK = 'CREATE_NEW_COMMENT_BLOCK'
}

interface PostAction {
    type: PostActionsKind,
    payload: string |  PostComment
}


const reducer = (state: PostReducerState, action: PostAction) => {
    const {type, payload} = action;
    switch (type){
        case PostActionsKind.UPDATE_NEW_COMMENT:
            return {
                comments: [
                    ...state.comments
                ],
                createCommentContent: payload
            }

        case PostActionsKind.CREATE_NEW_COMMENT_BLOCK:
            return {
                comments: [
                    ...state.comments,
                    payload
                ],
                createCommentContent: state.createCommentContent
            }
    }
}


const PostContext = createContext<PostReducerState | null>(null);

const Post = (props: PostProps) => {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, {
        comments: [],
        createCommentContent: ''
    });

    const providerValue = {
        commentsBlocks: state!.comments,
        addCommentBlock:  (commentBlock: PostComment) => {
            dispatch({type: PostActionsKind.CREATE_NEW_COMMENT_BLOCK, commentBlock});
        },

        updateComment: (commentContent: string) => {
            dispatch({type: PostActionsKind.UPDATE_NEW_COMMENT, commentContent});
        }
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
                <Avatar className="mr-3" size="large" image="https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png" />
                <h3 className="inline mr-2">Haaland janos</h3>
                <small className="align-self-center flex-grow-1">Created: 2022. 12. 23. 10:00</small>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-secondary p-button-outlined align-self-center" aria-label="Bookmark"  />
            </div>
        )
    }


    const footerTemplate = () => {

        return (
            <div></div>
        )
    }

    

    return (
        <PostContext.Provider value={providerValue}>
            <Card header={headerTemplate}>
                <div>
                    <h2>Title</h2>
                    <p>DKASMLDKMSLM</p>
                </div>
                <div>
                    <Button icon="pi pi-heart" className="p-button-danger p-button-rounded" />
                </div>
            </Card>
        </PostContext.Provider>
    )
}


export default Post;