import Image from 'next/image';
import React from 'react'
import { signOut,useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

function UserInfo({userInfo}) {
    console.log(userInfo);
    const router=useRouter();
    const {data:session}=useSession()
    const onLogoutClick=()=>{
      signOut();
      router.push("/")
    }
  return (
    <div className='flex flex-col items-center bg-[#2d3032]'>
        <Image src={userInfo.userImage}
        alt='userImage'
        width={100}
        height={100}
        className='rounded-full mt-28 bg-[#2d3032]'/>
        <h2 className='text-[30px]
        font-semibold'>{userInfo.userName}</h2>
        <h2 className='text-gray-400'>{userInfo.email}</h2>
        <div className='flex gap-4 mt-2'>
        <button className='bg-black
         p-2 px-3 font-semibold mb-5 rounded-full border border-[#9651DB] border-2 hover:bg-[#9651DB] hover:text-black transition-colors duration-300  '>Share</button>
        {session?.user.email== userInfo.email? <button className='bg-black
         p-2 px-3 font-semibold mb-5 rounded-full border border-[#9651DB] border-2 hover:bg-[#9651DB] hover:text-black transition-colors duration-300'
         onClick={()=>onLogoutClick()}>Logout</button>:null}
      </div>
    </div>
  )
}

export default UserInfo