import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url='http://26.232.136.42:8080/api'
const statisticalSlice=createSlice({
    name:'statistical',
    initialState:{
        statistical:[],
        gender:[],
        type:[],
    },
    reducers:{
       
    },
    extraReducers:(builder)=>
        builder
    .addCase(statisticalFetch.fulfilled, (state, action) => {
        state.statistical=action.payload
    })
    .addCase(statisticalGenderFetch.fulfilled, (state, action) => {
        state.gender=action.payload
    })
    .addCase(statisticalTypeFetch.fulfilled, (state, action) => {
      state.type=action.payload
    })
 });
export const Fetchstatistical = () => {
  return async function check(dispatch, getState) {
    await dispatch(statisticalFetch());
    await dispatch(statisticalGenderFetch());
    await dispatch(statisticalTypeFetch());
  };
};
 export const statisticalFetch=createAsyncThunk("statistical/statisticalFetch",
    async ()=>{
        const res= await fetch(`${url}/statistic/selling`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
    }
 )
 export const statisticalGenderFetch=createAsyncThunk("statistical/statisticalGenderFetch",
    async ()=>{
        const res= await fetch(`${url}/statistic/getrevenuebyTypeGender`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
    }
 )
 export const statisticalTypeFetch=createAsyncThunk("statistical/statisticalTypeFetch",
    async ()=>{
        const res= await fetch(`${url}/statistic/getrevenuebyTypeProduct`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
    }
 )
 export default statisticalSlice;
