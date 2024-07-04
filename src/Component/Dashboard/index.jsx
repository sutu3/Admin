import React from 'react'
import Minidash from './minidash'
import { Outlet } from 'react-router-dom'
const index = () => {
  return (
    <div className='h-full w-full m-auto flex justify-center' aria-labelledby="submit-label">
      <div className='flex justify-center w-full' aria-labelledby="submit-label"><Minidash/></div>
      {/* <div><Outlet/></div> */}
    </div>
  )
}

export default index
