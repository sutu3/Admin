import './App.css'
import Date from "./Component/Date/index"
import Navbar from "./Component/Navbar/index.jsx"
import {Outlet} from "react-router-dom"
const App=()=> {

  return (
    <div className='w-screen h-full justify-start items-start flex flex-row p-0 m-0'>
     <div className='w-[18%] h-screen bg-[#f7f9fb] flex border-r-2 border-slate-300  fixed'><Navbar/></div>
     <div className='w-full h-full mt-10 ml-80'><Outlet/></div>
    </div>
  )
}

export default App
