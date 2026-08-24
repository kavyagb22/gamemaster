'use client'
import Image from "next/image";
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

// BACKEND REQUIREMENTS:
// getUser (to check if user is logged in/expired)

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<string|null>('test')
  useEffect(()=>{
    async function checkUser(){
      if (user == null){
        router.push('/signin')
      } else{
        router.push('/main')
      }

    }
    checkUser()
  },[])
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans">
     Home redirect page
    </div>
  );
}
