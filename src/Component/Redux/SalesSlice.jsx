import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url='http://26.232.136.42:8080/api'
const SaleSlice=createSlice({
    name:'sale',
    initialState:{
        sale:[]
    },
    reducers:{
        addSale:(state,action)=>{
            state.sale.push(action.payload)
        }
    },
    extraReducers:(builder)=> {
        builder
       .addCase(SaleFetch.fulfilled,(state,action)=>{
        console.log(action.payload)
            state.sale=action.payload
       })
    }
    
})
export const SaleFetch=createAsyncThunk("sale/SaleFetch",
    async () => {
        const res = await fetch(`${url}/sale/getDiscount`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        return data;
    })
export default SaleSlice;