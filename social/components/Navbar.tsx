import React from "react";
import { Menubar } from 'primereact/menubar';
import {  MenuItem } from "primereact";
import Link from 'next/link';
import { Button } from "primereact/button";
import { NavBarProps } from "../interfaces/interafces";
import { useRouter } from "next/router";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';




const Navbar = ({isLoggedIn, firstName, lastName}: NavBarProps) => {
    const router = useRouter();

    let items: MenuItem[];

    if (isLoggedIn){
        items = [
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
            },
            {
                label: 'Posts',
                icon: 'pi pi-fw pi-send',
                items: [
                    {
                        label: 'Fresh posts',
                        url: ''
                    },
                    {
                        label: 'Create post',
                        url: ''
                    }
                ]
            }
        ]
    } else {
        items = [
            {
                label: '',
            }
        ]
    }

    const logoutUser = () => {
        // TODO: implementation
    }

    const end = isLoggedIn ? <div><Button label="Logout" className="p-button-outlined p-button-sm" onClick={() => logoutUser()} /></div> : <div><Button className="p-button-outlined mr-2  p-button-sm" label="Login" onClick={() => {router.push('/login')}} /><Button className="p-button-outlined  p-button-sm" label="Register" onClick={() => router.push('/register')} /></div>

    return (
        <div>
            <Menubar model={items} end={end} />
        </div>
    )
}

export default Navbar;