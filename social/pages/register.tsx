import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import Link from 'next/link'


const Register: NextPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(undefined);

    const [usernameIsEmpty, setUsernameIsEmpty] = useState(false);
    const [emailIsEmpty, setEmailIsEmpty] = useState(false);
    const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);
    const [passwordAgainIsEmpty, setPasswordAgainIsEmpty] = useState(false);
    const [firstNameIsEmpty, setFirstNameIsEmpty] = useState(false);
    const [lastNameIsEmpty, setLastNameIsEmpty] = useState(false);
    const [dateOfBirthIsEmpty, setDateOfBirthIsEmpty] = useState(false);

    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [usernameIsTaken, setUsernameIsTaken] = useState(false);
    const [passowrdsAreMatching, setPasswordsAreMatching] = useState(true);
    const [emailIsTaken, setEmailIsTaken] = useState(false);

    const [isUsernameTakenLoading, setIsUsernameTakenLoading] = useState(false);
    const [isEmailTakenLoading, setIsEmailTakenLoading] = useState(false);

    useEffect(() => {
        if (password !== passwordAgain){
            setPasswordsAreMatching(false);
        } else {
            setPasswordsAreMatching(true);
        }
    }, [passwordAgain])


    const register = async () => {
        setIsRegisterLoading(true);
        let anyEmpty = false;
        
        if (username === ''){
            setUsernameIsEmpty(true);
            anyEmpty = true;
        }

        if (email === ''){
            setEmailIsEmpty(true);
            anyEmpty = true;
        }

        if (password === ''){ 
            setPasswordIsEmpty(true);
            anyEmpty = true;
        }

        if (passwordAgain === ''){
            setPasswordAgainIsEmpty(true);
            anyEmpty = true;
        }

        if (firstName === ''){
            setFirstNameIsEmpty(true);
            anyEmpty = true;
        }

        if (lastName === ''){
            setLastNameIsEmpty(true);
            anyEmpty = true;
        }

        if (dateOfBirth === undefined){
            setDateOfBirthIsEmpty(true);
            anyEmpty = true;
        }

        if (anyEmpty){
            setIsRegisterLoading(false);
            return;
        }

        setIsRegisterLoading(false);
        // TODO: request implementation
    }

    const checkUsernameIsTaken = async () => {
        // TODO: implementation
    }

    const checkEmailIsTaken = async () => {
        // TODO: implementation
    }

    return (
        <div className='grid justify-content-center h-screen align-content-center auth-bg'>
            <Card className='col-4 md:col-4 sm:col-10 text-center'>  
                <h2 className='mb-5 mt-1' >Create your account</h2>
                <div className='p-fluid'>
                <div className="field mb-5">
                    <span className={`p-float-label p-input-icon-left`}>
                        <i className="pi pi-dot" />
                        <InputText className={`${firstNameIsEmpty ? 'p-invalid' : ''}`} id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <label htmlFor="firstName">First Name*</label>
                    </span>
                </div>
                <div className="field mb-5">
                    <span className={`p-float-label p-input-icon-left`}>
                        <i className="pi pi-dot" />
                        <InputText className={`${lastNameIsEmpty ? 'p-invalid' : ''}`} id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <label htmlFor="lastName">Last Name*</label>
                    </span>
                </div>
                <div className="field mb-5">
                    <span className="p-float-label">
                        <Calendar id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.value)} showIcon />
                        <label htmlFor="dateOfBirth">Date of Birth*</label>
                    </span>
                </div>
                <div className="field mb-5">
                    <span className={`p-float-label p-input-icon-left ${isUsernameTakenLoading ? 'p-input-icon-right' : ''}`}>
                        {isUsernameTakenLoading && <i className="pi pi-spin pi-spinner" />}
                        <i className="pi pi-search" />
                        <InputText className={` ${usernameIsEmpty || usernameIsTaken ? 'p-invalid' : ''}`} id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Username*</label>
                    </span>
                </div>
                <div className="field mb-5">
                    <span className={`p-float-label p-input-icon-left ${isEmailTakenLoading ? 'p-input-icon-right' : ''}`}>
                        {isEmailTakenLoading && <i className="pi pi-spin pi-spinner" />}
                        <i className="pi pi-dot" />
                        <InputText className={`${emailIsEmpty || emailIsTaken ? 'p-invalid' : ''}`} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="emial">Email*</label>
                    </span>
                </div>
                <div className="field mb-5">
                    <span className="p-float-label p-input-icon-left mb-2">
                        <i className="pi pi-key" />
                        <Password id='password' className={`${passwordIsEmpty ? 'p-invalid' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask  feedback={true} />
                        <label htmlFor="password">Password*</label>
                    </span>
                </div>
                <div className="field mb-5">
                    <span className="p-float-label p-input-icon-left mb-2">
                        <i className="pi pi-key" />
                        <Password id='passwordAgain' className={`${passwordAgainIsEmpty || !passowrdsAreMatching ? 'p-invalid' : ''}`} value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} toggleMask  feedback={false} />
                        <label htmlFor="passwordAgain">Password Again*</label>
                    </span>
                    { !passowrdsAreMatching && <small id="username2-help" style={{textAlign: 'left'}} className="p-error block">Passwords are not matching!</small>}
                </div>
                </div>
                <Button className='mb-4' label='Register' onClick={() => {register()}} loading={isRegisterLoading} />
                <p style={{textAlign: 'left'}}>Or if you already registered <Link href={'/login'}><Button label="login here" className="p-button-link inline p-0" /></Link>.</p>
            </Card>
    </div>
    )
}

export default Register;