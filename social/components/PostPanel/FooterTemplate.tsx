import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { CommentProps } from "./Comment";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';


export interface FooterTemplateProps {
    avatarURL: string
    comments?: CommentProps[];
}


const FooterTemplate = (props: FooterTemplateProps) => {

    const [newComment, setNewComment] = useState<string | undefined>();
    const [comments, setComments] = useState<CommentProps[] | undefined>();

    useEffect(() => {
        setNewComment('');
        setComments(props.comments);
    }, [])

    const addComment = (): void => {
        if (comments === undefined){
            setComments([{
                postId: 2,
                avatarURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjpPCSmbEz9MbdmDRHnq0A-r1IgQ2JecU5dA&usqp=CAU',
                commentAuthorNickname: 'Gepsonka',
                content: newComment!,
                createdAt: new Date(),
                commentId: 12,
                authorId: 1
            }]); // to be changed later
        } else {
            const newComments: CommentProps[] = comments!.concat({
                postId: 2,
                avatarURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjpPCSmbEz9MbdmDRHnq0A-r1IgQ2JecU5dA&usqp=CAU',
                commentAuthorNickname: 'Gepsonka',
                content: newComment!,
                createdAt: new Date(),
                commentId: 12,
                authorId: 1
            }); // to be changed later

            setComments(newComments);
        }

        setNewComment('');
        
    }

    return (
        <div className="border-top-1 border-400 pt-3">
            {
                props.comments === undefined ? null :
                    props.comments!.map(comment => (
                        <Comment key={comment.commentId} postId={comment.postId} avatarURL={comment.avatarURL} commentAuthorNickname={comment.commentAuthorNickname} content={comment.content} createdAt={comment.createdAt} commentId={comment.commentId} authorId={comment.authorId} />
                    ))

            }
            <div className="border-top-1 border-300 pt-3">
                <div className="flex w-full p-fluid mb-2">
                    <Avatar className="mr-1" image={props.avatarURL} />
                    <InputTextarea autoResize value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                </div>
                <div className="flex w-full justify-content-end">
                    <Button label="Comment" onClick={() => addComment()} className="p-button-outlined p-button-sm" disabled={newComment === ''} />
                </div>
            </div>

        </div>
    )
}


export default FooterTemplate