import React from "react";
import { NextPage } from "next";
import Navbar from "../components/Navbar";
import { Image } from 'primereact/image';
import { useState } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import Post from "../components/Post";



const Profile: NextPage = () => {
    const [firstName, setFirstName] = useState('Kadcdcdlanyos');
    const [lastName, setLastName] = useState('Jozsef');
    const [dateJoined, setDateJoined] = useState(new Date().toISOString().slice(0, 10));

    const [tabIndex, setTabIndex] = useState(0);

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
                <div className="sm:col-10 md:col-4 lg:col-4 justify-content-center">
                    <div className="w-full sm:col-11 md:col-3 lg:col-3 p-4 lg:mr-5 md:mr-5 sm:mb-5 xs:mb-5 border-round-md bg-blue-200">
                        <div className="flex w-full justify-content-center">
                            <Image alt="profile pic" width="200" src="data:image/jpeg;base64,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" preview />
                        </div>
                        <h2 className="text-center">{firstName} {lastName}</h2>
                        <small className="text-600">Joined at {dateJoined}</small>
                    </div>
                </div>
                <div className="sm:col-10 md:col-8 lg:col-8">
                    <TabView activeIndex={tabIndex} onTabChange={(e) => setTabIndex(e.index)}>
                        <TabPanel  header="User posts" leftIcon="pi pi-fw pi-send">
                            <Post avatarURI={'https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png'} authorNickname={'csoki'} createdAt={new Date()} title="asdad" content={""} imageURIs={undefined} isLikedByUser={false} comments={[]} />
                        </TabPanel>
                        <TabPanel header="Create post" leftIcon="pi pi-fw pi-plus">

                        </TabPanel>
                        <TabPanel header="Liked post" leftIcon="pi pi-fw pi-heart">

                        </TabPanel>
                        <TabPanel header="Update profile" leftIcon="pi pi-fw pi-user">

                        </TabPanel>
                    </TabView>
                </div>

            </div>
        </div>
    )
}

export default Profile;