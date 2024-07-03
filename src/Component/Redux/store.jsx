import {configureStore} from '@reduxjs/toolkit'
import ProductSlice from './ProductSlice.jsx'
import Purchar from '../Redux/PurchaseSlice'
import CustumerSlice from './CustummerSlice.jsx'
import OrderSlice from './OrderSlice.jsx'
const store=configureStore({
    reducer:{
       product:ProductSlice.reducer,
       purchase:Purchar.reducer,
       custumer:CustumerSlice.reducer,
       order:OrderSlice.reducer
    }
})
export default store