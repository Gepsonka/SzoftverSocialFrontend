import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { useState } from "react";




const UserUpdate = () => {
    // TODO: update states to current date of the user
    const [username, setUsername] = useState<string>('');
    const [firstName, setFisrtName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const footer = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{lineHeight: '1.5'}}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

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
                    <div className="mt-5 p-fluid">
                        <span className="p-float-label">
                        <Password value={password} onChange={(e) => setPassword(e.target.value)} footer={footer} />                            <label htmlFor="firstName">Password</label>
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
                    <Button icon="pi pi-upload" label="Submit" aria-label="Submit"  />
                </div>
                
            </div>
            
        </div> 
    )

}


export default UserUpdate;