import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://26.232.136.42:8080/api";
const PurchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    purchaseItem: [],
    item: [],
  },
  reducers: {
    addPurchase: (state, action) => {
      state.purchaseItem.push(action.payload);
    },
  },
});
//thằng này dùng để tạo product version mới khi nhập hàng
//vù mỗi item khi nhập hàng sẽ sinh ra version mới để dễ quản lý thống kê nguồn hàng sẽ đi âu
export const CreateProductVersion = createAsyncThunk(
  "purchase/CreateProductVersion",
  async (payload) => {
    const res = await fetch(`${url}/productversion/createint`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({payload}),
    });
    const data = await res.json();
    return data;
  }
);
export const CreateVariant = createAsyncThunk("purchase/CreateVariant",
    async (payload) => {
    const res = await fetch(`${url}/variant/createint`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({payload}),
    });
    const data = await res.json();
    return data;
  }
)
export const CreatePurchaseItem = () => {
  return async function Check(dispatch, getState) {
    await dispatch(
      CreateProductVersion({
        version_name: "Quần short nữ nhi phiên bản 2",
        price: "350000",
        quantity_in_stock: 50,
        product: 120,
      })
    );
  };
};
export default PurchaseSlice;
