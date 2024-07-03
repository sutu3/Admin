import { ToastContainer } from 'react-toastify'
import './App.css'
import Date from "./Component/Date/index"
import Navbar from "./Component/Navbar/index.jsx"
import {Outlet} from "react-router-dom"
import { FetchInfom } from './Component/Redux/ProductSlice.jsx'
import {FetchPuchaseOrder} from './Component/Redux/PurchaseSlice.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Custumer } from './Component/Redux/CustummerSlice.jsx'
import { OrderFetch } from './Component/Redux/OrderSlice.jsx'
const App=()=> {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetch=async()=>{await dispatch(FetchInfom())
      await dispatch(FetchPuchaseOrder())
      await dispatch(Custumer())
      await dispatch(OrderFetch())
    }
    fetch();
  },[])
  return (
    <div className='w-screen h-full justify-start items-start flex flex-row p-0 m-0'>
     <div className='w-[18%] h-screen bg-[#f7f9fb] flex border-r-2 border-slate-300  fixed'><Navbar/></div>
     <div className='w-full h-full mt-0 ml-[280px]'><Outlet/></div>
     <div><ToastContainer/></div>
    </div>
  )
}

export default App
