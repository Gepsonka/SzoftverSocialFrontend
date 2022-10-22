import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { CommentProps } from "./Comment";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Toast } from "primereact/toast";


export interface FooterTemplateProps {
    avatarURL: string
    comments?: CommentProps[];
}


const FooterTemplate = (props: FooterTemplateProps) => {

    const [newComment, setNewComment] = useState<string>('');
    const [comments, setComments] = useState<CommentProps[] | undefined>();

    const toast = useRef(null);

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
                createdAt: new Date('20 December 2019 14:48'),
                commentId: 12123,
                authorId: 1
            }]); // to be changed later
        } else {
            setComments([...comments, {
                postId: 2,
                avatarURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjpPCSmbEz9MbdmDRHnq0A-r1IgQ2JecU5dA&usqp=CAU',
                commentAuthorNickname: 'Gepsonka',
                content: newComment!,
                createdAt: new Date('20 December 2019 14:48'),
                commentId: 12123,
                authorId: 1
            }]);
        }
        setNewComment('');
        // @ts-ignore
        toast.current.show({severity: 'success', summary: 'Comment submitted', detail: 'Comment successfully submitted!', life: 3000})
        
    }

    return (
        <div className="border-top-1 border-400 pt-3">
            {
                comments === undefined ? null :
                    comments!.map((comment, index) => (
                        // TODO: change later the key to postID
                        <Comment key={index}  postId={comment.postId} avatarURL={comment.avatarURL} commentAuthorNickname={comment.commentAuthorNickname} content={comment.content} createdAt={comment.createdAt} commentId={comment.commentId} authorId={comment.authorId} />
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
            <Toast ref={toast}/>
        </div>
    )
}


export default FooterTemplate