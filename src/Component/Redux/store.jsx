import {configureStore} from '@reduxjs/toolkit'
import ProductSlice from './ProductSlice'
const store=configureStore({
    reducer:{
       product:ProductSlice.reducer,
    }
})
export default store