import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Card } from 'primereact/card';
import Navbar from '../components/Navbar';


const Home: NextPage = () => {
  return (
    <div>
      <Navbar isLoggedIn={false} firstName={"csoki"} lastName={"janos"}/>
    </div>
  )
}

export default Home
