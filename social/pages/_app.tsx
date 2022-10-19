import React from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';       


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp


// WHEN THE PROGRAM RESPONDS WITH REACT IS UNDEFINED CHECK THE PRIMEREACT IMPORTS!!!!
// import { Avatar } from "primereact/avatar"; ==== WORKS
// import { Avatar } from "primereact/"; ========== DOES NOT WORK!!!! 