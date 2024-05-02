
"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { HiSearch,HiBell,HiChat } from "react-icons/hi";
import app from './../Shared/firebaseConfig'
import { useRouter } from 'next/navigation';

function Header() {
  const { data: session } = useSession(); 
  const router=useRouter();
  const db = getFirestore(app);

  useEffect(()=>{
    saveUserInfo();
  },[session])

  const saveUserInfo=async()=>{
    if(session?.user)
    {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image
      });
    }
  }

  const onCreateClick=()=>{
    if(session)
    {
      router.push('/pin-builder')
    }
    else{
      signIn()
    }
  }

  
  return (
    <div className='flex flex-row'>
    <div className='flex justify-start
     gap-3 md:gap-2 p-2 bg-[#2d3032] w-full relative z-1 backdrop:blur'>
        <Image src={require('./logo.png')} alt='logo' className="rounded-full cursor-pointer ml-6" width={60} height={60} onClick={()=>router.push('/')}/> 
        <div className='ml-6 mt-2 flex justify-center gap-10'>
        <button className='text-white p-2 px-6 rounded-full font-semibold bg-black
         text-[16px] border border-[#9651DB] border-2
          hidden md:block hover:bg-[#9651DB] hover:text-black transition-colors duration-300'
           onClick={()=>router.push('/')}>Home</button>
        <button className=' p-2 px-6 text-white font-semibold bg-black
         rounded-full text-[16px] border border-[#9651DB] border-2 hover:bg-[#9651DB] hover:text-black transition-colors duration-300' 
         onClick={()=>onCreateClick()}>Create</button>
         <button className=' p-2 px-6 text-white font-semibold
         rounded-full text-[16px] bg-black border border-[#9651DB] border-2 hover:bg-[#9651DB] hover:text-black transition-colors duration-300' 
         onClick={()=>onExhibition()}>Exhibition</button></div>
        </div> 
        
        <div className='bg-[#2d3032]'>
           {session?.user?  
      <Image src={session.user.image} 
       onClick={()=>router.push('/'+session.user.email)}
      alt='user-image' width={60} height={60}
        className='mr-4 mt-3 hover:bg-[#9651DB] p-1
        rounded-full cursor-pointer'/>:
        

        <button className='font-semibold p-2 px-4 rounded-full mt-5 bg-black border border-[#9651DB] border-2 hover:bg-[#9651DB] hover:text-black transition-colors duration-300'
         onClick={() => signIn()}>Login</button>}
         </div>
         </div>
  )
}

export default Header
