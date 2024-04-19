import React from 'react'
import UserTag from '../UserTag'

function PinInfo({pinDetail}) {
  const user={
    name:pinDetail.userName,
    email:pinDetail.email,
    image:pinDetail.userImage
  }
  return (
    <div>
      <h2 className='text-[30px] font-bold mb-10 text-black'>{pinDetail.title}</h2>
      <UserTag user={user} />
      <h2 className='mt-10'>{pinDetail.desc}</h2>
      <button className='p-2 text-white px-5 text-[23px]
      mt-10 rounded-full bg-black  transition-all'
      onClick={()=>window.open(pinDetail.link)}>Open Url</button>
    </div>
  )
}

export default PinInfo