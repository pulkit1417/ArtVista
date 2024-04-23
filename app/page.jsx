"use client"
import Image from 'next/image'

import { useSession, signIn, signOut } from "next-auth/react"
import { collection, getDocs, getFirestore, or, query, where } from 'firebase/firestore';
import app from './Shared/firebaseConfig';
import { useEffect, useState } from 'react';
import PinList from './components/Pins/PinList';
import { HiSearch,HiBell,HiChat } from "react-icons/hi";
import ConnectWalletButton from './metamask'

export default function Home() {
  const db=getFirestore(app);
  const [listOfPins,setListOfPins]=useState([]);
  const [search2,setSearch2] = useState('');

  const handleText = (event) => {
    
      setSearch2(event.target.value)
  
  }
  
  
  
  useEffect(()=>{
    getAllPins();
  },[search2])
  const getAllPins=async()=>{

    
    if (search2 == '') {
      
      setListOfPins([])
        const q=query(collection(db,
          'pinterest-post')
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
         
         
        setListOfPins((listOfPins)=>
        [...listOfPins,doc.data()]);
        });
    }else{
      setListOfPins([])
      const q=query(collection(db, 'pinterest-post'), or(where('userName', '==', search2), where('category', '==', search2)));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      setListOfPins((listOfPins)=>
      [...listOfPins,doc.data()]);
      // const q2=query(collection(db, 'pinterest-post'), where('userName', '==', search2));
      // const querySnapshot2 = await getDocs(q2);
      // querySnapshot2.forEach((doc) => {
      // setListOfPins((listOfPins)=>
      // [...listOfPins,doc.data()]);
     });
}
}

  return (
    <>
    <div className='p-3  m-0 bg-[#2d3032] '>
    <div className='bg-[#D2D3D3] p-3 px-2 text-black
         gap-3 items-center rounded-full w-2/6 h-12 hidden md:flex border border-[#9651DB] border-4 absolute top-4 left-96'>
          
        <HiSearch className='text-[34px] 
        text-black bg-[#D2D3D3] rounded'/>
      
        <input onChange={handleText} type="text" placeholder='Search'
        className='bg-[#D2D3D3] outline-none w-full text-[22px] text-black' />
        </div>  
        <ConnectWalletButton/>
      <PinList listOfPins={listOfPins} />
      </div>
    </>
  )
}
