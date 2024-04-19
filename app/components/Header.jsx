
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
    <div className='flex justify-between 
     gap-3 md:gap-2 items-center p-2 fixed w-full z-1 backdrop:blur'>
        <Image src={require('./logo.png')} alt='logo' className="rounded-full" width={60} height={60} onClick={()=>router.push('/')}/>
        <button className='text-white p-2 px-6 rounded-full font-semibold bg-black
         text-[16px] border border-[#9651DB] border-2
          hidden md:block hover:bg-[#9651DB] hover:text-black transition-colors duration-300'
           onClick={()=>router.push('/')}>Home</button>
        <button className=' p-2 px-6 text-white font-semibold bg-black
         rounded-full text-[16px] border border-[#9651DB] border-2 hover:bg-[#9651DB] hover:text-black transition-colors duration-300' 
         onClick={()=>onCreateClick()}>Create</button>
         <button className=' p-2 px-6 text-white font-semibold
         rounded-full text-[16px] bg-black border border-[#9651DB] border-2 hover:bg-[#9651DB] hover:text-black transition-colors duration-300' 
         onClick={()=>onExhibition()}>Exhibition</button>
        <div className='bg-[#D2D3D3] p-3 px-2 text-black
         gap-3 items-center rounded-full w-3/6 h-12 hidden md:flex border border-[#9651DB] border-4'>
          
        <HiSearch className='text-[34px] 
        text-black bg-[#D2D3D3] rounded'/>
        <input type="text" placeholder='Search'
        className='bg-[#D2D3D3] outline-none w-full text-[22px] text-black ' />
        </div>
        {/* <HiSearch className='text-[25px] 
        text-gray-500 md:hidden'/> */}
        {/* <HiBell className='text-[25px] md:text-[60px] text-gray-500 cursor-pointer'/> */}
        {/* <HiChat className='text-[25px] md:text-[60px] text-gray-500 cursor-pointer'/> */}
      {session?.user?  
      <Image src={session.user.image} 
       onClick={()=>router.push('/'+session.user.email)}
      alt='user-image' width={60} height={60}
        className='hover:bg-[#9651DB] p-1
        rounded-full cursor-pointer'/>:

        <button className='font-semibold p-2 px-4 rounded-full text-black'
         onClick={() => signIn()}>Login</button>}



    </div>
  )
}

export default Header
