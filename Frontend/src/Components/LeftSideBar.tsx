import React from 'react'

const LeftSideBar = ({onClick}) => {
    return (
        <div className='w-full h-full text-white'>

            <div className='flex flex-col'>
                <div className='bg-[#232E3E] flex justify-between p-3 '>
                    <img src="" alt="Logo" />
                    <img className='invert w-5 h-5 ' src="night-mode.png" alt="" />
                </div>
                <div className='bg-[#1F2937] flex flex-col justify-between h-[94vh]'>
                    <div className='flex flex-col gap-3 h-full text-center p-5 '>
                        <div className=' p-4 hover:bg-gray-400  rounded-full'>
                            Mark Attendance
                        </div>
                        <div className=' p-4 hover:bg-gray-400  rounded-full'>
                            View Attendance
                        </div>
                        <div className='p-4 hover:bg-gray-400  rounded-full'>
                            Create Schedule
                        </div>
                        <div className='  p-4 hover:bg-gray-400 rounded-full '>
                            View Schedule
                        </div>
                        <div className='p-4 hover:bg-gray-400 rounded-full '>
                            Attendance Summary
                        </div>
                    </div>
                    <div className='flex justify-center p-5 hover:bg-gray-400  m-3 rounded-full '>
                        Logout
                    </div>



                </div>

            </div>


        </div>
    )
}

export default LeftSideBar
