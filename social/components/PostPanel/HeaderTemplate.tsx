import { Avatar } from "primereact/avatar";
import React, { useContext } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";
import { PostContext } from "../Post";

export interface HeaderTemplateProps {
    avatarURI: string;
    authorNickname: string;
    createdAt: Date;
    updatedAt?: Date;

}


const HeaderTemplate = (props: HeaderTemplateProps) => {
    const postContext = useContext(PostContext);

    return (
        <div className="flex p-3 border-solid border-primary bg-indigo-100 border-round-top">
            <Avatar className="mr-3" size="large" image={props.avatarURI as string} />
            <h3 className="inline mr-2">{props.authorNickname}</h3>
            <small className="align-self-center flex-grow-1">{props.updatedAt === undefined ? `Created: ${props.createdAt.toUTCString()}` : `Edited: ${props.updatedAt.toUTCString()}`}</small>
            { !postContext.isEditing && <Button onClick={postContext.postDeleteConfirm} icon="pi pi-trash" className="p-button-rounded p-button-outlined p-button-sm p-button-secondary align-self-center" />}
            <Button icon="pi pi-pencil" className="ml-2 p-button-rounded p-button-secondary p-button-outlined align-self-center" aria-label="Bookmark" onClick={() => postContext.setIsEditing(!postContext.isEditing)}  />
        </div>
    )
}


export default HeaderTemplate;

