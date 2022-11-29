import React, { useEffect } from "react";
import { NextPage } from "next";
import Navbar from "../components/Navbar";
import { Image } from 'primereact/image';
import { useState } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import Post from "../components/Post";
import { ConfirmDialog } from "primereact/confirmdialog";
import UserCreatePost from "../components/UserCreatePost";
import UserUpdate from "../components/UserUpdate";
import { axiosInstance } from "../services/axios";
import { useRouter } from "next/router";


const Profile: NextPage = () => {
    const router = useRouter()
    const [firstName, setFirstName] = useState('Kalanyos');
    const [lastName, setLastName] = useState('Jozsef');
    const [dateJoined, setDateJoined] = useState(new Date('20 December 2019 14:48').toISOString().slice(0, 10));
    const [posts, setPosts] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            router.push('/login')
        }
        const getProfile = async () => {
            try {
                const res = await axiosInstance.get('/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setDateJoined(new Date(res.data.created_at).toISOString().slice(0, 10))
                console.log(res.data)
            } catch (e) {
                router.push('/login');
            }
        }

        const getPosts = async () => {
            try {
                const res = await axiosInstance.get('/post/get-personal-posts')
                setPosts(res.data);
            } catch (e) {
                console.log(e)
            }
        }

        getProfile();
        getPosts();
    },[])

    const tabItems = [
        {label: 'User posts', icon: 'pi pi-fw pi-send'},
        {label: 'Create post', icon: 'pi pi-fw pi-plus'},
        {label: 'Liked posts', icon: 'pi pi-fw pi-heart'},
        {label: 'Update profile', icon: 'pi pi-fw pi-user'},
    ]


    return (
        <div>
            <Navbar isLoggedIn={true} firstName={firstName} lastName={lastName} />
            <div className="grid justify-content-center p-4">
                <div className="sm:col-12 md:col-3 lg:col-3 justify-content-center">
                    <div className="w-full sm:col-11 md:col-3 lg:col-3 p-4 lg:mr-5 md:mr-5 sm:mb-5 xs:mb-5 bg-blue-100 profile-box-shadow">
                        <div className="flex w-full justify-content-center">
                            <Image alt="profile pic" width="200" src="https://img.freepik.com/premium-photo/futuristic-avatar-neon-colors-with-headphones-helmet-cyberpunk-concept_379823-2901.jpg?w=2000" preview />
                        </div>
                        <h2 className="text-center">{firstName} {lastName}</h2>
                        <small className="text-600">Joined at {dateJoined}</small>
                    </div>
                </div>
                <div className="sm:col-12 md:col-9 lg:col-9">
                    <TabView activeIndex={tabIndex} onTabChange={(e) => setTabIndex(e.index)}>
                        <TabPanel  header="User posts" leftIcon="pi pi-fw pi-send">
                            {posts.map((value: any, index: number) => {
                                return <Post key={index} postId={value.id} avatarURI={'https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png'} authorNickname={value.user_rel.username} createdAt={new Date(value.created_at)} title={value.title} content={value.content} imageURIs={undefined}/>
                            })}
                        </TabPanel>
                        <TabPanel header="Create post" leftIcon="pi pi-fw pi-plus">
                            <UserCreatePost/>
                        </TabPanel>
                        <TabPanel header="Liked post" leftIcon="pi pi-fw pi-heart">

                        </TabPanel>
                        <TabPanel header="Update profile" leftIcon="pi pi-fw pi-user">
                            <UserUpdate/>
                        </TabPanel>
                    </TabView>
                </div>

            </div>
            <ConfirmDialog key={'PostDialog'} />
        </div>
    )
}

export default Profile;