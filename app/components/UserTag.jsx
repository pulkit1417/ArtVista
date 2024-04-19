"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';

function UserTag({user}) {
    //const {data:session}=useSession();
  return (
    <div className=''>
       {user?
       <div className='flex gap-3 
       items-center'>
       <Image src={user.image} 
       alt='userImage'
       width={30}
       height={30}
       className='rounded-full'/>
       <div>
        <h4 className='text-[12px] font-medium text-black'>{user.name}</h4>
        </div>
       </div>
       :null}
    </div>
  )
}

export default UserTag
