import React from 'react'
import LeftSideBar from './LeftSideBar'

const H = () => {
  return (
    <div className='flex flex-row text-white'>
        <div className=' w-1/5 h-screen'>
           <LeftSideBar onClick={onClick}/> 
        </div>
        
    </div>
  )
}

export default H