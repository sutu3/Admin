import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const url = "http://26.232.136.42:8080/api";
const SaleSlice = createSlice({
  name: "sale",
  initialState: {
    sale: [],
  },
  reducers: {
    addSale: (state, action) => {
      state.sale.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SaleFetch.fulfilled, (state, action) => {
      console.log(action.payload);
      state.sale = action.payload;
    });
  },
});
//Thằng này lên giá khuyến mãi cho các product đã chọn
export const CreateItemSale = createAsyncThunk(
  "sale/CreateItemSale",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/sale/createSaleDiscountMulti?idDiscount=${payload.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({saleID:payload.list}),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create purchase item")}`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//Thằng này tạo 1 đợt sale
export const CreateDiscount = createAsyncThunk(
  "sale/CreateDiscount",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/sale/creatDiscount`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(
          `${new Error(error.message || "Failed to create purchase item")}`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const SaleFetch = createAsyncThunk("sale/SaleFetch", async () => {
  const res = await fetch(`${url}/sale/getDiscount`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
});
export const CreateSale = (payload) => {
  return async function (dispatch, getState) {
    try {
        console.log(payload)
     const idDiscount= await dispatch(
        CreateDiscount({
          title: payload.title,
          percent: payload.percent,
          date_start: payload.date_start,
          date_end: payload.date_end,
        })
      );
      await dispatch(CreateItemSale({
        id:idDiscount.payload,
        list:payload.list.map((el)=>el.id),
      }))
    } catch (error) {
      toast.error(`Create Product Fall ${error}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
};
export default SaleSlice;
