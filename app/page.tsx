'use client'
import Image from "next/image";
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<string|null>(null)
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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     Home redirect page
    </div>
  );
}
