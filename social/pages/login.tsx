import React, { useEffect, useState, useTransition } from 'react';
import type { NextPage } from 'next'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import Link from 'next/link'
import { authService } from '../services/AuthService';
import { useRouter } from 'next/router'
import { isTokenExists } from '../services/JWTService';

const Login: NextPage = () => {
  
  const router = useRouter();

  useEffect(() => {
    if (isTokenExists()) {
      router.push('/profile');
    }
  }, [])
  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const [badPasswordOrUsername, setBadPasswordOrUsername] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    
    if (username === '' && password === ''){
      setUsernameIsValid(false);
      setPasswordIsValid(false);
      return;
    } else if (username === '') {
      setUsernameIsValid(false);
      return;
    } else if (password === '') {
      setPasswordIsValid(false);
      return;
    }
    // TODO: implement login with jwt
    setIsLoading(true)
    try {
      let res = await authService.loginUser(username, password);

      router.push('/profile');
    } catch (e) {
      setUsernameIsValid(false);
      setPasswordIsValid(false);
      setBadPasswordOrUsername(true);
      console.log(e)
    }
    setIsLoading(false);
  }

  return (
    <div className='grid justify-content-center align-content-center auth-bg auth-body'>
      <Card className='col-4 md:col-4 sm:col-10 text-center'>  
        <h2 className='mb-5 mt-1' >Login</h2>
        <div className="field mb-5">
          <span className="p-float-label p-fluid">
            <InputText className={`${!usernameIsValid ? 'p-invalid' : ''}`} id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="username">Username</label>
          </span>
        </div>
        <div className="field md-5">
          <span className="p-float-label p-fluid mb-2">
            <Password id='password' className={`${!passwordIsValid ? 'p-invalid' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask  feedback={false} />
            <label htmlFor="password">Password</label>
          </span>
        </div>
        { badPasswordOrUsername && <small style={{textAlign:'left'}} className="p-error block mb-3">Wrong usename or password.</small>}
        <Button label='Login' onClick={() => {login()}} loading={isLoading} />
        <p style={{textAlign: 'left'}}>Or if don&apos;t have account <Link href={'/register'}><Button label="register here" className="p-button-link inline p-0" /></Link>.</p>
      </Card>
    </div>
    
  )
}

export default Login
