import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Card } from 'primereact/card';
import Navbar from '../components/Navbar';
import { axiosInstance } from '../services/axios';
import Post from '../components/Post';


const Home: NextPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axiosInstance.get('/post/get-all-posts')
        setPosts(res.data)
      } catch (e) {

      }
    }

    getPosts();
  }, [])

  return (
    <div>
      <Navbar isLoggedIn={false} firstName={"csoki"} lastName={"janos"}/>
      <div className='flex w-screen justify-content-center'>
        <div className='grid'>
          <div className='md:col-12 sm:col-12 p-4 '>
            {posts.map((value: any, index: number) => {
              return <Post key={index} postId={value.id} avatarURI={''} authorNickname={value.user_rel.username} createdAt={value.created_at} title={value.title} content={value.content} />
            })}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home
