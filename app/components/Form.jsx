"use client"
import React,{useState} from 'react'
import UploadImage from './UploadImage'
import { useSession} from "next-auth/react"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import UserTag from './UserTag'
import app from '../Shared/firebaseConfig'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function Form() {
    const {data:session}=useSession();
    const [title,setTitle]=useState();
    const [desc,setDesc]=useState();
    const [category,setCategory]=useState();
    const [file,setFile]=useState();
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    const storage=getStorage(app)
    const db=getFirestore(app);
    const postId=Date.now().toString();
    const onSave=()=>{
       setLoading(true)
       uploadFile();
   

    }

    const uploadFile=()=>{
        const storageRef=ref(storage,'pinterest/'+file.name);
        uploadBytes(storageRef,file).then((snapshot)=>{
            console.log("File Uploaded")
        }).then(resp=>{
            getDownloadURL(storageRef).then(async(url)=>{
                console.log("DownloadUrl",url);
                const postData={
                    title:title,
                    desc:desc,
                    image:url,
                    category:category,
                    userName:session.user.name,
                    email:session.user.email,
                    userImage:session.user.image,
                    id:postId
                }

                await setDoc(doc(db,'pinterest-post',postId),
                postData).then(resp=>{
                    console.log("Saved")
                    setLoading(true);
                    router.push("/"+session.user.email)
                })
                
            })
        })
    }

   
   
  return (
    <div className=' bg-[#d2d3d3] p-16 rounded-2xl  shadow-[0_5px_20px_5px_rgba(0,0,0,0.3)] mt-24 border border-[#9651DB] border-4'>
        <div className='flex justify-end mb-6'>
            <button onClick={()=>onSave()}
             className='bg-[#9651db] p-2
            text-white font-semibold px-3 
            rounded-lg'>
              {loading?  <Image src="/loading-indicator.png" 
                width={30} 
                height={30} 
                alt='loading'
                className='animate-spin'  />:
                <span>Upload</span>}</button>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
           
            <UploadImage setFile={(file)=>setFile(file)} />
          
       <div className="col-span-2">
       <div className='w-[100%]'>
        <input type="text" placeholder='Add your title'
            onChange={(e)=>setTitle(e.target.value)}
        className='text-[35px] outline-none font-bold w-full text-black
        border-b-[2px] border-gray-400 placeholder-black bg-[#d2d3d3]'/>
        <h4 className='text-[12px] mb-8 w-full  text-black'>The first 40 Charaters are 
        what usually show up in feeds</h4>
        <UserTag user={session?.user} />
        <input type="text"
          onChange={(e)=>setDesc(e.target.value)}
            placeholder='Tell everyone what your pin is about' 
        className=' outline-none  w-full mt-8  text-[14px] text-black
        border-b-[2px] border-gray-400 placeholder-black bg-[#d2d3d3]'/>
          <input type="text"
          onChange={(e)=>setCategory(e.target.value)}
           placeholder='Category of your post' 
        className=' outline-none  w-full mt-[70px] text-black
        border-b-[2px] border-gray-400 placeholder-black bg-[#d2d3d3]'/>
    </div>
       </div>
        
        </div>
    </div>
  )
}

export default Form