import React from "react";
import { Menubar } from 'primereact/menubar';
import { Button, MenuItem } from "primereact";
import Link from 'next/link';
import { NavBarProps } from "../interfaces/interafces";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';



const Navbar = ({isLoggedIn}: NavBarProps) => {
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

    return (
        <div>
            <Menubar model={items} />
        </div>
    )
}

export default Navbar;