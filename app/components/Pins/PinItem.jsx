import Image from 'next/image'
import React from 'react'
import UserTag from '../UserTag'
import { useRouter } from 'next/navigation'

function PinItem({pin}) {
  const router=useRouter();
    const user={
        name:pin?.userName,
        image:pin?.userImage,

    }
  return (
    <div className='conatiner '>
    <div className='bg-[#D2D3D3] rounded-3xl p-3 border border-[#9651DB] border-4 '>
       <div class="hover:cursor-pointer
       " onClick={()=>router.push("/pin/"+pin.id)}>
        <Image src={pin.image}
        alt={pin.title}
        width={500}
        height={500}
        className='rounded-3xl 
        cursor-pointer relative z-0'
        />
       </div>
       <div>
        <h2 className='font-semibold 
        text-[18px] mb-1 mt-2 line-clamp-2 text-black'>{pin.title}</h2>
        <UserTag user={user} /></div>
    </div>
    </div>
  )
}

export default PinItem