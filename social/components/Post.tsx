import React from "react";
import { useRouter } from "next/router";
import { Panel } from 'primereact/panel';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import Link from "next/link";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';


const Post = () => {
    const router = useRouter();

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

    return (
        <Panel headerTemplate={headerTemplate}>
            
        </Panel>
    )
}


export default Post;