import React, { useEffect, useState, useTransition } from 'react';
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

    const [usernameIsIncorrect, setUsernameIsIncorrect] = useState(false);
    const [emailIsEmpty, setEmailIsEmpty] = useState(false);
    const [passwordIsIncorrect, setPasswordIsIncorrect] = useState(false);
    const [passwordAgainIsEmpty, setPasswordAgainIsEmpty] = useState(false);
    const [firstNameIsEmpty, setFirstNameIsEmpty] = useState(false);
    const [lastNameIsEmpty, setLastNameIsEmpty] = useState(false);
    const [dateOfBirthIsEmpty, setDateOfBirthIsEmpty] = useState(false);

    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [usernameIsTaken, setUsernameIsTaken] = useState(false);
    const [passowrdsAreMatching, setPasswordsAreMatching] = useState(true);
    const [emailIsTaken, setEmailIsTaken] = useState(false);

    const [isUsernameLongEnough, setIsUsernameLongEnough] = useState(true);

    // password rules states
    const [isPasswordLenghtMinSix, setIsPasswordLenghtMinSix] = useState(true);
    const [isPasswordContainingLetter, setIsPasswordContainingLetter] = useState(true);
    const [isPasswordContainingNumber, setIsPasswordContainingNumber] = useState(true);

    const [isUsernameTakenLoading, startIsUsernameTakenLoading] = useTransition();
    const [isEmailTakenLoading, startIsEmailTakenLoading] = useTransition();

    const [isEmailValid, setIsEmailValid] = useState(true);


    const passwordCheck = () => {
        if (password.length === 0){
            setPasswordIsIncorrect(false);
            setIsPasswordLenghtMinSix(true);
            setIsPasswordContainingLetter(true);
            setIsPasswordContainingNumber(true);
            return;
        }

        if (password.length <= 6){
            setIsPasswordLenghtMinSix(false);
            setPasswordIsIncorrect(true);
        } else {
            setIsPasswordLenghtMinSix(true);
        }

        let regExpLetters = /[a-zA-Z]/g;

        if (!regExpLetters.test(password)){
            setIsPasswordContainingLetter(false);
            setPasswordIsIncorrect(true);
        } else {
            setIsPasswordContainingLetter(true);
        }

        let regExpNumerical = /[0-9]/g;

        if (!regExpNumerical.test(password)){
            setIsPasswordContainingNumber(false);
            setPasswordIsIncorrect(true);
        } else {
            setIsPasswordContainingNumber(true);
        }

        if (isPasswordContainingLetter && isPasswordContainingNumber && isPasswordLenghtMinSix){
            setPasswordIsIncorrect(false);
        }
    }

    const usernameCheck = () => {
        // when the username is empty we do not want to check
        if (username.length === 0){
            setIsUsernameLongEnough(true);
            setUsernameIsIncorrect(false);
            return;
        }

        if (username.length <= 8){
            setIsUsernameLongEnough(false);
            setUsernameIsIncorrect(true);
        } else {
            setIsUsernameLongEnough(true);
            setUsernameIsIncorrect(false);
        }
    }
    
    useEffect(() => {
        usernameCheck();
    }, [username])

    useEffect(() => {
        // check if username is already taken
    }, [username])

    useEffect(() => {
        passwordCheck();
        if (passwordAgain !== password){
            setPasswordsAreMatching(false);
        } else {
            setPasswordsAreMatching(true);
        }

    }, [password])

    useEffect(() => {
        if (password !== passwordAgain){
            setPasswordsAreMatching(false);
        } else {
            setPasswordsAreMatching(true);
        }
    }, [passwordAgain])

    useEffect(() => {
        if (email.length === 0){
            setIsEmailValid(true);
            return;
        } else {
            setEmailIsEmpty(false);
        }

        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
        if (!emailRegex.test(email)){
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
        }
    }, [email])

    useEffect(() => {
        // check if email is already taken
    }, [email])


    const register = async () => {
        setIsRegisterLoading(true);
        let anyEmpty = false;
        
        if (username === ''){
            setUsernameIsIncorrect(true);
            setIsUsernameLongEnough(false);
            anyEmpty = true;
        }

        if (email === ''){
            setEmailIsEmpty(true);
            setIsEmailValid(false);
            anyEmpty = true;
        } else {
            setEmailIsEmpty(false);
        }

        if (password === ''){ 
            setPasswordIsIncorrect(true);
            setIsPasswordLenghtMinSix(false);
            setIsPasswordContainingNumber(false);
            setIsPasswordLenghtMinSix(false);
            anyEmpty = true;
        }

        if (passwordAgain === ''){
            setPasswordAgainIsEmpty(true);
            anyEmpty = true;
        } else {
            setPasswordAgainIsEmpty(false);
        }

        if (passwordAgain !== password){
            setPasswordsAreMatching(false);
            anyEmpty = true;
        } else {
            setPasswordsAreMatching(true);
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

        if (usernameIsIncorrect) {
            anyEmpty =  true;
        }

        if (passwordIsIncorrect){
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
        <div className='relative grid justify-content-center align-content-center auth-bg auth-body py-6'>
            <Card className='col-4 md:col-4 sm:col-10 text-center'>  
                <h2 className='mb-5 mt-1' >Create your account</h2>
                <div className='p-fluid'>
                <div className="field mb-5">
                    <span className={`p-float-label p-input-icon-left`}>
                        <i className="pi pi-users" />
                        <InputText className={`${firstNameIsEmpty ? 'p-invalid' : ''}`} id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <label htmlFor="firstName">First Name*</label>
                    </span>
                </div>
                <div className="field mb-5">
                    <span className={`p-float-label p-input-icon-left`}>
                        <i className="pi pi-users" />
                        <InputText className={`${lastNameIsEmpty ? 'p-invalid' : ''}`} id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <label htmlFor="lastName">Last Name*</label>
                    </span>
                </div>
                <div className="field mb-5">
                    <span className="p-float-label">
                        <Calendar className={`${dateOfBirthIsEmpty ? 'p-invalid' : ''}`} id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.value)} showIcon />
                        <label htmlFor="dateOfBirth">Date of Birth*</label>
                    </span>
                </div>
                <div className="field mb-5">
                    <span className={`p-float-label p-input-icon-left ${isUsernameTakenLoading ? 'p-input-icon-right' : ''}`}>
                        {isUsernameTakenLoading && <i className="pi pi-spin pi-spinner" />}
                        <i className="pi pi-user" />
                        <InputText className={` ${usernameIsIncorrect || usernameIsTaken ? 'p-invalid' : ''}`} id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Username*</label>
                    </span>
                    { usernameIsTaken && <small id="username" style={{textAlign:'left'}} className="p-error block">Username is already taken.</small>}
                    { !isUsernameLongEnough && <small id="username" style={{textAlign:'left'}} className="p-error block">Username must be at least 8 characters long.</small> }
                </div>
                <div className="field mb-5">
                    <span className={`p-float-label p-input-icon-left ${isEmailTakenLoading ? 'p-input-icon-right' : ''}`}>
                        {isEmailTakenLoading && <i className="pi pi-spin pi-spinner" />}
                        <i className="pi pi-at" />
                        <InputText className={`${emailIsEmpty || emailIsTaken || !isEmailValid ? 'p-invalid' : ''}`} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="emial">Email*</label>
                    </span>
                    { !isEmailValid && <small id="password" style={{textAlign:'left'}} className="p-error block">Email is not valid.</small>}
                </div>
                <div className="field mb-5">
                    <span className="p-float-label mb-2">
                        <Password id='password' className={`${passwordIsIncorrect ? 'p-invalid' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask  feedback={true} />
                        <label htmlFor="password">Password*</label>
                    </span>
                    { !isPasswordContainingLetter && <small id="password" style={{textAlign:'left'}} className="p-error block">Password must contain at least one letter.</small>}
                    { !isPasswordContainingNumber && <small id="password" style={{textAlign:'left'}} className="p-error block">Password must contain at least one number.</small>}
                    { !isPasswordLenghtMinSix && <small id="password" style={{textAlign:'left'}} className="p-error block">Password must be at least 6 characters long.</small>}

                </div>
                <div className="field mb-5">
                    <span className="p-float-label mb-2">
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