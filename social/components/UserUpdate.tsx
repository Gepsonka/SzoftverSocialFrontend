import axios from "axios";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from "react";
import { axiosInstance } from "../services/axios";




const UserUpdate = () => {
    // TODO: update states to current date of the user
    const [username, setUsername] = useState<string>('');
    const [firstName, setFisrtName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const toast = useRef(null);

    const updateProfile = async () => {
        let data: any = {};

        {username === '' ? null : data.username = username}
        {firstName === '' ? null : data.firstName = firstName}
        {lastName === '' ? null : data.lastName = lastName}
        {email === '' ? null : data.email = email}

        try {
            const res = await axiosInstance.put(`/user-update`, data)
            localStorage.setItem('user', res.data)
            // @ts-ignore
            toast.current.show({severity:'success', summary: 'Successful update', detail:'Your profile was updated successfully', life: 3000});
        } catch (e) {
            // @ts-ignore
            toast.current.show({severity:'error', summary: 'Update failed', detail: e.response.data.msg, life: 3000});
            console.log(e)
        }
    }

    return (
        <div className="flex w-full flex-column">
            <h1 className="text-center">Update profile</h1>
            <div className="grid">
                <div className="md:col-6 lg:col-6 sm:col-12 px-3">
                    <div className="mt-3 p-fluid">
                        <span className="p-float-label">
                            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="username">Username</label>
                        </span>
                    </div>
                    <div className="mt-5 p-fluid">
                        <span className="p-float-label">
                            <InputText id="firstName" value={firstName} onChange={(e) => setFisrtName(e.target.value)} />
                            <label htmlFor="firstName">First name</label>
                        </span>
                    </div>
                </div>
                <div className="md:col-6 lg:col-6 sm:col-12">
                    <div className="mt-3 p-fluid">
                        <span className="p-float-label">
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="email">Email</label>
                        </span>
                    </div>
                    <div className="mt-5 p-fluid">
                        <span className="p-float-label">
                            <InputText id="firstName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <label htmlFor="firstName">Last name</label>
                        </span>
                    </div>
                    <div className="mt-5 p-fluid">
                        <FileUpload chooseLabel="Choose profile pic" mode="basic" name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" accept="image/*" maxFileSize={1000000} />
                    </div>
                </div>
                <div className="flex w-full justify-content-center mt-5">
                    <Button onClick={() => updateProfile()} icon="pi pi-upload" label="Submit" aria-label="Submit"  />
                </div>
            </div>
            <Toast ref={toast} />
        </div> 
    )

}


export default UserUpdate;