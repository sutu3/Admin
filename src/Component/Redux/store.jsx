import {configureStore} from '@reduxjs/toolkit'
import ProductSlice from './ProductSlice.jsx'
import Purchar from '../Redux/PurchaseSlice'
import CustumerSlice from './CustummerSlice.jsx'
import OrderSlice from './OrderSlice.jsx'
import SaleSlice from './SalesSlice.jsx'
import statisticalSlice from './statisticalSlixe.jsx'
const store=configureStore({
    reducer:{
       product:ProductSlice.reducer,
       purchase:Purchar.reducer,
       custumer:CustumerSlice.reducer,
       order:OrderSlice.reducer,
       sale:SaleSlice.reducer,
       statistical:statisticalSlice.reducer
    }
})
export default store