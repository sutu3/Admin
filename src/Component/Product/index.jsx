import React from 'react'
import Tabs from './Tabs'
import { faFileImport, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import MiniNav from '../MiniNav/index.jsx'
const data = [
  {
    content: "List Product",
    link: '',
    icon: faFileImport,
  },
  {
    content: "Add Product",
    link: 'Add',
    icon: faFileImport,
  },
  {
    content: "Update Product",
    link: "Update",
    icon: faPenToSquare,
  },
  {
    content: "Import Product",
    link: "Import",
    icon: faUpload,
  },
];
const index = () => {
  return (
    <div className='h-full w-full m-auto mt-0 flex justify-center'>
      <div className='flex justify-center w-full'><MiniNav data={data}/></div>
      {/* <div><Outlet/></div> */}
    </div>
  )
}

export default index
