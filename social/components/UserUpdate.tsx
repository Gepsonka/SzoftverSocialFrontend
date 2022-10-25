import { InputText } from "primereact/inputtext";
import React, { useState } from "react";




const UserUpdate = () => {
    const [username, setUsername] = useState<string>('');
    const [firstName, setFisrtName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


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
                </div>
            </div>
            
        </div> 
    )

}


export default UserUpdate;