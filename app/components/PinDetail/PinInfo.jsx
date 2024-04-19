import React from 'react'
import UserTag from '../UserTag'

function PinInfo({pinDetail}) {
  const user={
    name:pinDetail.userName,
    email:pinDetail.email,
    image:pinDetail.userImage
  }
  return (
    <div >
      <h2 className='text-[30px] font-bold mb-10 text-black'>{pinDetail.title}</h2>
      <h2 className='mt-8 text-black font-semibold'>Description: {pinDetail.desc}</h2>
      <h2 className='mt-8 mb-8 text-black 
       rounded-full transition-all font-semibold'>Category: {pinDetail.category}</h2>
       <UserTag user={user} />
    </div>
  )
}

export default PinInfo