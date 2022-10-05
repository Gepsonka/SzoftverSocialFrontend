import React, { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import Link from 'next/link'

const Login: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameIsEmpty, setUsernameIsEmpty] = useState(false);
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    setIsLoading(true);
    if (username === '' && password === ''){
      setUsernameIsEmpty(true);
      setPasswordIsEmpty(true);
      setIsLoading(false);
      return;
    } else if (username === '') {
      setUsernameIsEmpty(true);
      setIsLoading(false);
      return;
    } else if (password === '') {
      setPasswordIsEmpty(true);
      setIsLoading(false);
      return;
    }
    // TODO: implement login with jwt

    setIsLoading(false);
  }

  return (
    <div className='grid justify-content-center h-screen align-content-center auth-bg'>
      <Card className='col-4 md:col-4 sm:col-10 text-center'>  
        <h2 className='mb-5 mt-1' >Login</h2>
        <div className="field mb-5">
          <span className="p-float-label p-fluid">
            <InputText className={`${usernameIsEmpty ? 'p-invalid' : ''}`} id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="username">Username</label>
          </span>
        </div>
        <div className="field md-5">
          <span className="p-float-label p-fluid mb-2">
            <Password id='password' className={`${passwordIsEmpty ? 'p-invalid' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask  feedback={false} />
            <label htmlFor="password">Password</label>
          </span>
        </div>
        <Button label='Login' onClick={() => {login()}} loading={isLoading} />
        <p style={{textAlign: 'left'}}>Or if don't have account <Link href={'/register'}><Button label="register here" className="p-button-link inline p-0" /></Link>.</p>
      </Card>
    </div>
    
  )
}

export default Login
