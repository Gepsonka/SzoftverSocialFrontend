import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { InputTextarea } from 'primereact/inputtextarea';
import { Knob } from 'primereact/knob';


const Home: NextPage = () => {
  return (
    <div>
      <InputTextarea/>  
      <Knob value={20} />
    </div>
  )
}

export default Home
