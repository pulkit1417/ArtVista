"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';

function UserTag({user}) {
    //const {data:session}=useSession();
  return (
    <div className='text-black font-semibold'> 
       {user?
       <div className='flex gap-3 
       items-center'>
       <Image src={user.image} 
       alt='userImage'
       width={50}
       height={50}
       className='rounded-full'/>
       <div className='text-black'>
        <h3 className='font-medium text-black'>{user.name}</h3>
        </div>
       </div>
       :null}
    </div>
  )
}

export default UserTag
