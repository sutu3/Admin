import React from 'react'
import Minidash from './minidash'
import { Outlet } from 'react-router-dom'
const index = () => {
  return (
    <div className='h-full w-full m-auto flex justify-center'>
      <div className='flex justify-center w-full'><Minidash/></div>
      {/* <div><Outlet/></div> */}
    </div>
  )
}

export default index
