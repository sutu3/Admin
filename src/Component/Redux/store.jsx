import {configureStore} from '@reduxjs/toolkit'
import ProductSlice from './ProductSlice.jsx'
import Purchar from '../Redux/PurchaseSlice'
const store=configureStore({
    reducer:{
       product:ProductSlice.reducer,
       purchase:Purchar.reducer
    }
})
export default store