"use client"
import React, { useEffect, useState } from 'react'
import PinImage from './../../components/PinDetail/PinImage'
import PinInfo from './../../components/PinDetail/PinInfo'
import { deleteDoc, doc, getDoc, getFirestore } from 'firebase/firestore'
import app from '@/app/Shared/firebaseConfig'
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
function PinDetail({params}) {
  const router=useRouter();
  const db=getFirestore(app);
  const [pinDetail,setPinDetail]=useState([]);
  

  

  useEffect(()=>{
    getPinDetail();
  },[])
 const getPinDetail=async()=>{
      const docRef = doc(db, 'pinterest-post',params.pinId );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
       
        setPinDetail(docSnap.data())
      } else {
       
        console.log("No such document!");
      }
  }

  const deletePost = () => {
    const docRef = doc(db, 'pinterest-post',params.pinId );

    deleteDoc(docRef)
    .then(() => {
      router.back()
    })

  }

  return (
    <>
   {pinDetail? 
   <div className=' bg-[#2d3032] p-3 md:p-12  md:px-24 lg:px-36 min-h-screen'>
       <HiArrowSmallLeft className='text-[60px] font-bold ml-[-50px] 
       cursor-pointer bg-black rounded-full p-2 text-white border border-[#9651DB] border-2 hover:bg-[#9651DB] hover:text-black transition-colors duration-300'
       onClick={()=>router.back()}/>
      <div className='grid grid-cols-1 bg-[#D2D3D3] shadow-[0_5px_20px_5px_rgba(0,0,0,0.3)] lg:grid-cols-2 md:gap-10 
      rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16 border border-[#9651DB] border-4 hover' 
      >
        <div className='border border-[#000] border-4 rounded-3xl'>
           <PinImage pinDetail={pinDetail} />
           </div>
        <div className="">
        <PinInfo pinDetail={pinDetail}/>
        <div className='absolute right-48'>
        <button onClick={deletePost} className=' w-16 h-8 font-semibold text-[14px] rounded-lg bg-[#000] hover:cursor-pointer items-end'>DELETE</button>
        </div>
        </div>
        </div>
    </div>:null}
    </>
  )
}

export default PinDetail