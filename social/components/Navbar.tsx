import React, { useEffect, useState } from "react";
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
import { Image } from 'primereact/image';



const Navbar = ({firstName, lastName}: NavBarProps) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('token') !== null);
    }, [])
    
    

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
                label: 'Posts',
                icon: 'pi pi-fw pi-send',
            }
        ]
    }

    const logoutUser = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    const end = isLoggedIn ? <div><Button label="Logout" className="p-button-outlined p-button-sm" onClick={() => logoutUser()} /></div> : <div><Button className="p-button-outlined mr-2  p-button-sm" label="Login" onClick={() => {router.push('/login')}} /><Button className="p-button-outlined  p-button-sm" label="Register" onClick={() => router.push('/register')} /></div>

    return (
        <div>
            <Menubar start={<Image height="40" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c0840e59-db43-4681-ae7b-31a04dc4bc55/d7eqdvw-4e97ac92-e4b9-4498-9655-e4d612eb478b.png/v1/fill/w_1600,h_900,strp/random_logo_by_criticl_d7eqdvw-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvYzA4NDBlNTktZGI0My00NjgxLWFlN2ItMzFhMDRkYzRiYzU1XC9kN2VxZHZ3LTRlOTdhYzkyLWU0YjktNDQ5OC05NjU1LWU0ZDYxMmViNDc4Yi5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.X991O1jF5lTNZbbEoHEfoo6nlHEihBMHMIm5-uBCXcU"/>} model={items} end={end} />
        </div>
    )
}

export default Navbar;