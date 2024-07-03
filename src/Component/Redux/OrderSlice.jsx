import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url='http://26.232.136.42:8080/api'
const OrderSlice=createSlice({
    name:'order',
    initialState:{
        order:[]
    },
    reducers:{
        addOrder:(state,action)=>{
            state.order.push(action.payload)
        }
    },
    extraReducers:(builder)=> {
        builder
       .addCase(OrderFetch.fulfilled,(state,action)=>{
            state.order=action.payload
       });
    }
 
})
export const OrderFetch = createAsyncThunk(
  "order/OrderFetch",
  async () => {
    const res = await fetch(`${url}/orders`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await res.json();
    return data;
  }
);
export default OrderSlice;