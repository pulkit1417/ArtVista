import app from '@/app/Shared/firebaseConfig'
import React from 'react'
import PinItem from './PinItem'

function PinList({ listOfPins }) {
  return (
    <div className='px-2 md:px-5 columns-2 md:columns-3 lg:columns-4 xl:columns-5  space-y-6 mx-auto min-h-screen bg-[#2d3032] '>
      {listOfPins.map((pin, index) => (
        <PinItem key={index} pin={pin} />
      ))}
    </div>
  )
}

export default PinList  